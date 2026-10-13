---
name: devops-runbook
description: Prepara o revisa entornos reproducibles, scripts, variables, contenedores, CI/CD, observabilidad, despliegue y rollback según el proyecto.
metadata:
  opencode/slash: "true"
---

# Entorno y runbook

## Procedimiento

1. Inspecciona el sistema operativo objetivo, runtime, archivos de bloqueo, scripts, plataforma, infraestructura y decisiones existentes. No agregues Docker, nube, CI, servicios o herramientas si no resuelven una necesidad real.
2. Comprueba compatibilidad y estado actual en documentación oficial del runtime, proveedor y herramientas antes de cambiar versiones o sintaxis. Usa versiones estables soportadas que encajen con el proyecto; explica el motivo y el impacto.
3. Documenta prerrequisitos, instalación reproducible, configuración, variables necesarias/opcionales, arranque, build, health checks, puertos, persistencia, logs y solución de problemas. Mantén `.env.example` sin secretos reales.
4. Distingue configuración local, CI y producción. Revisa permisos mínimos, exposición de secretos, backups y comportamiento ante fallo.
5. Para despliegues, presenta destino, cambios, riesgos, precondiciones y rollback. Preparar archivos no autoriza publicar, incurrir en gastos ni modificar servicios externos o producción.
6. Ejecuta solo las comprobaciones autorizadas y disponibles. Separa validación estática, build local y estado remoto.

## Salida

Entrega rutas, comandos reproducibles, variables, supuestos, estado de verificación y rollback cuando el cambio lo justifique. No inventes versiones, resultados, servicios o despliegues.
