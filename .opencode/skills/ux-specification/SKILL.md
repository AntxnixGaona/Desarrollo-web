---
name: ux-specification
description: Convierte requisitos de producto en especificaciones claras de flujo, navegación, pantallas, componentes, estados y criterios de aceptación.
metadata:
  opencode/slash: "true"
---

# Especificación UX/UI

## Procedimiento

1. Inspecciona requisitos, pantallas, arquitectura de información, componentes, tokens y recursos reales. Distingue evidencia, supuesto y decisión pendiente; no inventes investigación de usuarios.
2. Describe objetivo, punto de entrada, pasos, alternativas, salida y recuperación ante errores. Identifica pantallas, navegación, jerarquía de contenido y acciones con nombres comprensibles.
3. Especifica componentes, variantes, contenido y comportamiento; incluye estados inicial, carga, vacío, error, éxito, deshabilitado y foco cuando apliquen.
4. Para formularios, define etiquetas, ayuda, formato, validación, cuándo se muestra el error y cómo recuperarse. Para layouts, especifica comportamiento móvil/escritorio, textos largos y contenido prioritario.
5. Define accesibilidad observable con semántica, teclado, foco, nombres accesibles y alternativas al color/movimiento. Usa WCAG 2.2 AA como referencia vigente confirmando la publicación oficial más reciente aplicable; no declares conformidad sin prueba.
6. No nombres una biblioteca o API de diseño por moda. Si se requiere, verifica documentación oficial y compatibilidad; documenta valores/tokens dentro del sistema existente.
7. Guarda únicamente especificaciones Markdown dentro de `proyectos/<nombre>/docs/diseno/`; no implementes ni edites otros archivos.

## Entrega

Presenta flujo y pantallas con criterios verificables para Frontend y QA; identifica componentes y recursos reutilizados, supuestos y dependencias. Separa una propuesta de diseño de una interfaz implementada o probada.
