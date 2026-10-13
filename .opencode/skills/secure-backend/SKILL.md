---
name: secure-backend
description: Implementa o revisa seguridad del servidor, APIs, autenticación, autorización, persistencia, secretos y manejo de datos.
metadata:
  opencode/slash: "true"
---

# Seguridad de backend

## Procedimiento

1. Identifica activos, datos sensibles, límites de confianza, actores, permisos y operaciones críticas. Aplica controles proporcionales al riesgo y a la arquitectura existente.
2. Valida entradas en el servidor según esquemas explícitos; normaliza con cuidado y evita confiar en validaciones del cliente. Usa consultas parametrizadas o el ORM establecido.
3. Aplica autenticación y autorización por operación y recurso. Verifica propiedad y alcance en cada solicitud para prevenir acceso a objetos ajenos; no confundas autenticación con autorización.
4. Limita abuso según contexto: tamaño de payload, paginación, rate limits, timeouts y consumo de recursos. Protege contra inyección, SSRF, traversal y consumo inseguro de APIs cuando aplique.
5. Protege secretos y datos personales: configuración fuera del código, redacción de logs, respuestas sin trazas ni detalles internos, transporte y almacenamiento adecuados a los requisitos.
6. Diseña transacciones, restricciones e idempotencia donde importen. Las migraciones deben ser revisables y reversibles cuando sea posible; nunca ejecutar cambios destructivos en datos reales sin autorización concreta.
7. Consulta la guía oficial vigente de runtime, framework, ORM y dependencias cuando la seguridad dependa de su versión. Revisa avisos de seguridad del proveedor y el recurso oficial actual de OWASP API Security; no asumas que una versión memorizada sigue vigente.
8. En Supabase, identifica claves publishable/secret actuales y claves `anon`/`service_role` legacy. Confirma el calendario vigente de retiro y compatibilidad antes de proponer migración; las claves secret/service role son privilegiadas y omiten RLS, mientras que las publishable/anon deben estar protegidas con grants mínimos y RLS. Nunca expongas una clave privilegiada en cliente.
9. Añade o propone verificaciones que demuestren los controles sin acceder a sistemas externos ni usar datos reales fuera del alcance autorizado.

## Límites y salida

No introduzcas una dependencia de seguridad sin justificarla y comprobar mantenimiento, compatibilidad y fuente oficial. Reporta amenaza, condición, impacto, control aplicado, evidencia y limitaciones. No afirmes que el sistema es seguro en general por haber revisado unos pocos controles.


