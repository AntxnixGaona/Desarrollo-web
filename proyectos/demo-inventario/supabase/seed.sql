-- =============================================================================
-- Seed de desarrollo local para demo-inventario.
-- Datos 100% ficticios. NO usar en producción (no incluir seeds con `db push`).
-- Idempotente: las categorías usan `on conflict`; los productos se insertan
-- resolviendo `category_id` por nombre (sin ids hardcodeados) y omitiendo los
-- que ya existan.
-- =============================================================================

-- Categorías: exactamente 3.
insert into public.categories (name)
values
  ('Electrónica'),
  ('Hogar'),
  ('Deportes')
on conflict (name) do nothing;

-- Productos: exactamente 5. `category_id` se resuelve por `join` sobre el nombre.
-- `description` rellena en algunos productos y null en otro.
insert into public.products (name, description, price, stock, category_id)
select
  v.name,
  v.description,
  v.price,
  v.stock,
  c.id
from (values
  ('Auriculares Bluetooth',  'Auriculares inalámbricos con cancelación de ruido', 79.99, 25, 'Electrónica'),
  ('Teclado mecánico RGB',   'Teclado compacto con interruptores táctiles',      59.50, 12, 'Electrónica'),
  ('Cafetera de goteo',      'Cafetera de 12 tazas con jarra térmica',           34.90,  8, 'Hogar'),
  ('Set de sartenes',        'Juego de 3 sartenes antiadherentes',               45.00, 15, 'Hogar'),
  ('Balón de baloncesto',    null,                                               22.75, 40, 'Deportes')
) as v (name, description, price, stock, category_name)
join public.categories c on c.name = v.category_name
where not exists (
  select 1 from public.products p where p.name = v.name
);
