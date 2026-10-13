---
name: api-contracts
description: Diseña, documenta o revisa contratos entre frontend, backend y servicios externos; úsala antes del desarrollo paralelo o al cambiar rutas, esquemas o errores.
metadata:
  opencode/slash: "true"
---

# Contratos de API

## Procedimiento

1. Lee requisitos, rutas existentes, clientes, documentación y pruebas. Conserva el protocolo y estilo que ya use el proyecto (REST, GraphQL, RPC, eventos u otro).
2. Define por operación: método/operación, ruta o identificador, autenticación y autorización, parámetros, cuerpo, respuesta, códigos de estado, errores, paginación, filtros, idempotencia y efectos secundarios cuando correspondan.
3. Usa los tipos, nombres y convenciones del repositorio. Para cambios incompatibles, identifica consumidores, compatibilidad, migración y estrategia de versión antes de implementarlos.
4. Si hay una especificación (por ejemplo OpenAPI), actualízala junto con el contrato. Si hace falta elegir o actualizar una versión de especificación o biblioteca, confirma la versión vigente en la documentación oficial y que sea compatible con el stack; no fijes versiones por memoria.
5. Añade ejemplos mínimos válidos y casos de error relevantes. Distingue mocks de integraciones reales y datos de ejemplo de secretos.
6. Comunica las decisiones y los puntos sin resolver al Project Manager antes de que frontend y backend trabajen en paralelo.

## Revisión

Comprueba que el consumidor y el servidor coincidan en campos, nulabilidad, formatos, autenticación, errores y estados. No declares una integración funcional solo porque exista una interfaz o un mock. No alteres contratos existentes sin reportar el impacto.

## Salida

Entrega una tabla o documento con operaciones, entradas, respuestas, errores, autenticación, supuestos y compatibilidad; indica archivo fuente de verdad y qué equipos deben implementarlo.
