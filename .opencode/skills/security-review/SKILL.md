---
name: security-review
description: Revisa riesgos de seguridad en aplicaciones web, APIs, autenticación, autorización, RLS, secretos y dependencias; úsala en cambios sensibles o auditorías de seguridad.
metadata:
  opencode/slash: "true"
---

# Revisión de seguridad

## Método

1. Define alcance, objetivo, activos, datos sensibles, actores y límites de confianza. Inspecciona arquitectura, código, configuración y dependencias relevantes; no supongas un stack.
2. Prioriza autorización por recurso y tenant, autenticación/sesiones, validación de entradas, exposición de datos, secretos, configuración, abuso de recursos, logging y dependencias según la superficie real.
3. Verifica bibliotecas, runtime, APIs y advisories en fuentes oficiales actuales antes de afirmar que una versión es vulnerable o recomendada. Consulta las ediciones vigentes de OWASP u otros estándares relevantes; no dependas de números de versión memorizados.
4. En Supabase, revisa RLS, grants, roles y separación entre claves públicas y privilegiadas. La documentación vigente indica publishable keys para componentes públicos y secret keys solo para componentes confiables; secret keys omiten RLS. La documentación también informa que `anon` y `service_role` son claves legacy cuya retirada está prevista para finales de 2026. Confirma el estado actual y el plan compatible antes de recomendar una migración.
5. Distingue problemas confirmados de riesgo condicionado y de pregunta pendiente. Cita evidencia concreta en el repositorio y explica qué condición activa el riesgo.
6. Mantén la auditoría en lectura. No intentes explotar sistemas, recolectar secretos, acceder a cuentas o tocar producción. Las pruebas activas y cambios requieren autorización concreta y un objetivo autorizado.

## Informe de hallazgos

Ordena por severidad con archivo/línea, escenario de abuso, impacto, recomendación y evidencia. Indica los controles revisados y limitaciones. No afirmes que una app está completamente segura ni que cumple una certificación sin evaluación completa.

## Referencias oficiales

- Supabase API keys: https://supabase.com/docs/guides/getting-started/api-keys
- Supabase data security: https://supabase.com/docs/guides/database/secure-data
- Supabase Row Level Security: https://supabase.com/docs/guides/database/postgres/row-level-security
- OpenCode agents and permissions: https://docs.opencode.ai/docs/agents/
