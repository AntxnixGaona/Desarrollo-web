---
name: frontend-accessibility
description: Diseña, implementa o revisa interfaces web accesibles, adaptables y con estados claros; úsala para pantallas, formularios y navegación.
metadata:
  opencode/slash: "true"
---

# Interfaz accesible y estados

## Procedimiento

1. Reutiliza componentes, tokens, navegación y tecnologías del proyecto. Inspecciona dependencias y versiones antes de sugerir cambios; consulta documentación oficial si el comportamiento depende de una versión.
2. Usa HTML semántico, nombres accesibles, etiquetas asociadas, instrucciones y errores vinculados a sus controles. Mantén orden de teclado lógico, foco visible y operación completa sin ratón.
3. Define estados inicial, carga, vacío, error, éxito y deshabilitado cuando apliquen. Explica mensajes, recuperación y acciones disponibles; comunica cambios de estado a tecnologías asistivas cuando sea necesario.
4. Diseña para zoom, textos largos, reflujo y tamaños de pantalla. No ocultes funciones esenciales detrás de hover, color, gesto o movimiento; respeta preferencias de movimiento reducido.
5. Toma WCAG 2.2 nivel AA como referencia web cuando corresponda y comprueba en la fuente oficial si existe una revisión más reciente aplicable. No declares conformidad sin evaluación suficiente; el análisis visual o de código por sí solo no demuestra accesibilidad completa.
6. Si necesitas una biblioteca, verifica documentación oficial, versión estable compatible, licencia y mantenimiento. Evita añadir paquetes para capacidades nativas ya disponibles en el stack.

## Salida

Relaciona cada recomendación con una pantalla/componente y un criterio observable. Separa revisión estática de pruebas reales con teclado, lector de pantalla, navegador y viewport.
