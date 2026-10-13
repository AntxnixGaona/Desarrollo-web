# demo-inventario

Proyecto local de Supabase (CLI 2.120.0) para un catálogo de inventario de demostración:
categorías y productos con **lectura pública de solo lectura** y **escrituras restringidas**.

## Estructura

```
demo-inventario/
├─ README.md
└─ supabase/
   ├─ config.toml                              # generado por `supabase init` (project_id = demo-inventario)
   ├─ migrations/
   │  └─ 20261013160133_init_inventory.sql     # tablas, índice, RLS, políticas y grants
   └─ seed.sql                                 # datos ficticios (3 categorías, 5 productos)
```

- `supabase/migrations/20261013160133_init_inventory.sql`: crea `public.categories` y
  `public.products`, el índice `products_category_id_idx`, habilita RLS, define las políticas
  de lectura y fija los privilegios explícitos. El archivo lo generó `supabase migration new init_inventory`
  (no se inventó el nombre).
- `supabase/seed.sql`: datos **100 % ficticios** para desarrollo local. No incluye datos
  personales ni secretos y no debe ejecutarse nunca contra un proyecto remoto (`db push` no aplica seeds).

## Políticas RLS y permisos

RLS está **habilitado** en ambas tablas (`enable row level security`).

| Tabla | Rol | SELECT | INSERT/UPDATE/DELETE |
| --- | --- | --- | --- |
| `public.categories` | `anon`, `authenticated` | ✅ política `categories_select_public` (`using (true)`) | ❌ denegado por defecto |
| `public.products` | `anon`, `authenticated` | ✅ política `products_select_public` (`using (true)`) | ❌ denegado por defecto |
| `public.categories` / `public.products` | `service_role` | ✅ | ✅ (omite RLS) |
| `public.categories` / `public.products` | `postgres` (propietario) y consola SQL | ✅ | ✅ |

Motivo: **no se crean políticas de INSERT/UPDATE/DELETE**. Con RLS activo y sin política que
aplique, PostgreSQL deniega esas operaciones por defecto. Las escrituras quedan por tanto
reservadas a `service_role`, al rol propietario (`postgres`) y a la consola SQL de Studio.

Privilegios SQL explícitos y auditables que aplica la migración:

```sql
grant usage on schema public to anon, authenticated, service_role;
revoke all on table public.categories, public.products from anon, authenticated;   -- deja escritura en cero
grant select on table public.categories, public.products to anon, authenticated;   -- solo lectura
grant all    on table public.categories, public.products to service_role;          -- control total
```

Así no quedan privilegios de escritura para los roles públicos, ni a nivel de tabla ni vía políticas.

## Claves: publishable/`anon` vs secret/`service_role`

- La **lectura pública** se hace con la clave **publishable** (equivalente moderna de `anon`) desde
  el cliente. Está sujeta a RLS: solo permite `SELECT` sobre el catálogo.
- La clave **secret** (equivalente moderna de `service_role`) **omite RLS** y da control total.
  Nunca debe exponerse en el cliente, en el navegador, en el repositorio ni en variables públicas;
  úsala solo en servidores o funciones de confianza.
- Ocultar una tabla en el cliente **no** protege los datos: la protección real está en RLS y en los
  grants del servidor.
- Supabase anunció la deprecación de `anon`/`service_role` para finales de 2026; aquí se documentan
  ambas nomenclaturas. No se han rotado ni cambiado claves de ningún proyecto.

## Direcciones locales

Valores **reales confirmados** por `supabase status` con la pila local levantada:

- Studio: `http://localhost:54323`
- API (PostgREST/Auth): `http://127.0.0.1:54321` (REST en `http://127.0.0.1:54321/rest/v1`)
- Base de datos: `postgresql://postgres:postgres@127.0.0.1:54322/postgres`

`supabase start` levanta la pila y **ya aplica la migración y el seed**. `supabase db reset --local`
recrea la base local y **reaplica migraciones + `supabase/seed.sql`** sobre esa base local.

## Abrir las tablas en Studio

1. Con la pila en marcha, abre `http://localhost:54323`.
2. **Table Editor** (icono de tabla en la barra lateral izquierda).
3. En el selector de esquema elige `public`.
4. Selecciona `categories` (3 filas del seed) y luego `products` (5 filas del seed).
5. Para ver el SQL o los comentarios definidos: **Database ▸ Tables**, o usa el **SQL Editor** con
   `select * from public.products order by id;`.

## Aplicar migraciones en local

```bash
# 1) Levanta la pila local (requiere Docker Desktop o Podman en el PATH)
supabase start

# 2) Aplica todas las migraciones y luego el seed.sql
supabase db reset --local
```

⚠️ Advertencia: `supabase db reset --local` **destruye y reconstruye la base local**: borra los datos
locales existentes y vuelve a aplicar migraciones + `supabase/seed.sql`. No ejecutar
`supabase db reset --linked` ni operaciones destructivas remotas.

## Estado verificado (entorno local)

La base local **fue creada y verificada** en este entorno. Hechos reales comprobados:

- Pila local levantada con **Supabase CLI 2.120.0** sobre runtime **Docker** (Docker engine
  `ServerVersion 29.8.2`).
- `supabase start` aplicó la migración y el seed; `supabase db reset --local` se ejecutó con éxito
  (**exit code 0**), reaplicando migración + `seed.sql` sobre la base **local**.
- Verificado sobre la base local:
  - `public.categories` = **3** filas; `public.products` = **5** filas.
  - **RLS habilitado** en ambas tablas; solo existen políticas **SELECT** para `anon`/`authenticated`.
  - `anon` tiene **solo `SELECT`** (INSERT/UPDATE/DELETE denegados — comprobado como rol `anon` real:
    `ERROR: permission denied for table ...`).
  - `service_role` con **`ALL`**.
- **No hay proyecto remoto enlazado** (`linked_project: null`); todo es **local**. No se realizaron
  operaciones remotas (`link`/`push`/`db reset --linked`).
