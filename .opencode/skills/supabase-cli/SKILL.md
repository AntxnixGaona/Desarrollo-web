---
name: supabase-cli
description: Usa Supabase CLI para inicializar proyectos, desarrollar con la pila local, gestionar migraciones, generar tipos o preparar operaciones vinculadas a Supabase. Cárgala para cualquier tarea de CLI, base de datos o despliegue Supabase.
metadata:
  opencode/slash: "true"
---

# Supabase CLI

## Contexto y versión

- Comprueba `supabase --version` y `supabase <comando> --help` antes de depender de una opción. La instalación global vía Scoop usa `supabase`; una instalación npm por proyecto usa `npx supabase`.
- Revisa la documentación oficial vigente de Supabase y el `supabase/config.toml` del proyecto. La CLI cambia comandos y opciones; no memorices una opción como disponible sin verificarla.
- Ejecuta los comandos desde la raíz correcta del proyecto, donde esté o vaya a crearse `supabase/config.toml`.

## Inicialización y trabajo local

- `supabase init` crea la configuración local; por sí solo no inicia sesión ni enlaza un proyecto remoto.
- Para levantar la pila local, verifica que el runtime Docker compatible esté instalado y activo. Luego sigue la documentación actual para `supabase start`, consultar el estado y detenerla.
- Crea cambios de esquema como migraciones versionadas. Revisa migraciones existentes antes de editar. Usa `supabase migration new <nombre>` si la CLI actual lo admite y sigue las convenciones del proyecto.
- Valida migraciones sobre la base local. `supabase db reset` reconstruye la base **local** desde las migraciones y seeds, por lo que elimina los datos locales previos: verifica el destino y preserva trabajo antes de ejecutarlo.
- Si el proyecto utiliza tipos generados, regénéralos desde el esquema local o la fuente que el equipo haya acordado y comprueba los cambios resultantes.

## Proyectos remotos

- `supabase login` autentica la CLI. Nunca pidas ni escribas tokens en archivos versionados, prompts, logs o ejemplos; utiliza el mecanismo seguro indicado por Supabase.
- Para claves de proyecto, consulta la documentación vigente: Supabase recomienda publishable keys en código público y secret keys solo en servidores/funciones confiables, ya que las secret keys omiten RLS. `anon` y `service_role` son claves legacy que Supabase anunció que deprecaría para finales de 2026; confirma el calendario al preparar una migración y no cambies ni rotes claves remotas sin autorización.
- `supabase link` asocia el directorio con un proyecto remoto. Antes de cualquier operación remota, identifica el project ref y confirma explícitamente el entorno (desarrollo, staging o producción).
- Antes de `supabase db push`, revisa el estado de migraciones y usa la opción dry-run disponible en la versión instalada para presentar qué se aplicaría. La autorización para preparar una migración no autoriza aplicarla a remoto.
- No ejecutes comandos remotos ni cambies datos sin autorización específica. Nunca ejecutes `supabase db reset --linked` por iniciativa propia: restablece la base remota enlazada y borra su esquema/datos. No lo uses en producción.
- No incluyas seeds con `db push` en producción. Confirma el objetivo y la configuración antes de toda operación con efectos remotos.

## Diagnóstico

- Usa `supabase status` y `supabase <comando> --help` para comprobar estado y opciones reales.
- Distingue fallos de CLI, runtime Docker, autenticación, enlace remoto y SQL.
- No afirmes que un servicio inició, una migración se aplicó o un tipo se generó si el comando no se ejecutó y su salida no lo confirma.

## Referencias oficiales

- Guía de instalación y desarrollo local: https://supabase.com/docs/guides/local-development/cli/getting-started
- Flujo local, migraciones y remoto: https://supabase.com/docs/guides/local-development/cli-workflows
- Migraciones: https://supabase.com/docs/guides/local-development/database-migrations
- Referencia CLI: https://supabase.com/docs/reference/cli


