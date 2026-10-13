---
name: qa-test-strategy
description: Planifica y ejecuta verificaciones de una aplicación web según requisitos, cambios, riesgos y herramientas existentes, con evidencia honesta.
metadata:
  opencode/slash: "true"
---

# Estrategia de QA

## Procedimiento

1. Lee criterios de aceptación, cambio, pruebas existentes, scripts y versiones bloqueadas. Reutiliza el framework presente; no añadas otro si no es necesario.
2. Prioriza flujos críticos y límites: datos válidos/inválidos, permisos, errores, persistencia, estados de UI, integraciones y regresiones probables. Diseña cada caso con precondición, pasos, esperado y datos seguros.
3. Automatiza pruebas de comportamiento mantenibles y con aserciones útiles. Evita pruebas frágiles de implementación y duplicación. Coordina datos, entorno y archivos con el especialista y Project Manager.
4. Contrasta requisitos actuales de herramientas con documentación oficial y versiones del proyecto antes de actualizar o usar sintaxis. Para UI, considera teclado y WCAG vigente aplicable; usa navegador o lector de pantalla solo si hay herramientas disponibles.
5. Ejecuta solo comandos autorizados. Identifica entorno, datos y límites. No uses producción ni datos personales reales para checks locales.
6. Registra evidencia directamente observada. Distingue revisión estática, pruebas unitarias/integración/E2E, build y pruebas manuales en navegador. Un test creado pero no ejecutado queda pendiente.

## Informe

Para cada prueba: pasos breves, resultado esperado, resultado obtenido y estado. Incluye comandos reales, archivos, fallos y pendientes. No declares aprobación sin ejecución ni inventes capturas.
