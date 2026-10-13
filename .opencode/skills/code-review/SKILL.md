---
name: code-review
description: Revisa cambios existentes en busca de defectos concretos de lógica, seguridad, accesibilidad, contratos, rendimiento y regresiones sin editar archivos.
metadata:
  opencode/slash: "true"
---

# Revisión de código

## Procedimiento

1. Lee el objetivo, criterios de aceptación, diff y contexto mínimo necesario. Mantente en modo lectura; no edites ni ejecutes flujos de aplicación.
2. Prioriza errores demostrables y consecuencias para usuarios o datos: lógica, autorización, validación, contratos, persistencia, estados de interfaz, accesibilidad, secretos, configuración y regresiones.
3. Para afirmaciones que dependan de una biblioteca, runtime, API o estándar vigente, contrasta documentación oficial y versiones del lockfile; no marques como defecto una recomendación basada solo en una versión antigua o preferencia personal.
4. Verifica la ubicación exacta. Si no hay evidencia suficiente, presenta la cuestión como duda pendiente, no como hallazgo confirmado.
5. Evita ruido: no propongas cambios cosméticos, reescrituras ni dependencias sin impacto concreto. No repitas análisis que el diff no justifica.

## Informe

Ordena por severidad. Para cada hallazgo: título, prioridad, archivo y línea, condición que lo activa, impacto y corrección sugerida. Si no hay hallazgos relevantes, dilo y menciona alcance y limitaciones. No afirmes ejecución de pruebas ni resultados no observados.
