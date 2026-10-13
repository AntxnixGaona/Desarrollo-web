---
name: project-coordination
description: Convierte una petición de desarrollo en alcance, criterios verificables, responsables, dependencias y una secuencia eficiente de especialistas.
metadata:
  opencode/slash: "true"
---

# Coordinación del proyecto

## Procedimiento

1. Identifica proyecto, objetivo, restricciones, stack real y criterios de aceptación. Inspecciona antes de proponer tecnología; respeta decisiones ya tomadas.
2. Divide el trabajo en entregables pequeños y asigna un responsable por área/archivo. Incluye contexto, límites, dependencias y evidencia esperada en cada delegación.
3. Invoca solo especialistas necesarios. Para cambios de interfaz/backend, acuerda contrato API primero con `api-contracts`; paraleliza solo cuando las dependencias y archivos estén separados.
4. Conserva decisiones y salidas existentes. Evita duplicar tareas o pedir informes extensos. Tras cambios estables, solicita revisión y QA proporcionales al riesgo; devuelve correcciones al especialista del área.
5. Cuando una decisión dependa de librerías, versiones, APIs, estándares o servicios actuales, verifica la fuente oficial y el stack/lockfile del proyecto. Distingue alternativas de decisiones aprobadas y consulta solo si el impacto cambia alcance, arquitectura, coste o requisitos.
6. Respeta las autorizaciones ya dadas, el alcance de proyecto y las barreras de producción. Coordinar o preparar un despliegue no equivale a ejecutarlo.

## Salida

Resume objetivo, criterios, responsables, orden, dependencias y decisiones abiertas. Al concluir, informa cambios, especialistas realmente participantes, verificaciones reales y pendientes.
