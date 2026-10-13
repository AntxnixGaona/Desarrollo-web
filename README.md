# Entorno de aplicaciones web

Un equipo de OpenCode para desarrollar aplicaciones en proyectos separados.
Inicia OpenCode desde esta carpeta `agentes` y especifica el proyecto en cada petición.

## Equipo

| Agente | Modo | Responsabilidad |
| --- | --- | --- |
| project-manager | primary | Define el alcance, reparte tareas y coordina decisiones, revisión y correcciones. |
| frontend-developer | subagent | Implementa las interfaces y conecta las APIs. |
| backend-developer | subagent | Implementa servidor, APIs, autenticación y reglas de negocio. |
| database-engineer | subagent | Diseña esquemas, SQL, RLS y migraciones de base de datos. |
| security-auditor | subagent | Revisa seguridad de APIs, permisos, RLS, secretos y dependencias sin editar. |
| ui-ux-designer | subagent | Diseña flujos y especificaciones visuales que implementa Frontend. |
| devops-engineer | subagent | Prepara ejecución, construcción, infraestructura y publicación. |
| code-reviewer | subagent | Revisa cambios de frontend, backend e infraestructura sin editar. |
| qa-tester | subagent | Comprueba funciones e integraciones y crea pruebas útiles. |

Los agentes son adaptables: conservan las tecnologías del proyecto existente.
El Project Manager selecciona solo los necesarios para la tarea. Acordará los
contratos API antes de separar frontend y backend, asignará responsables por
archivo y permitirá trabajo paralelo cuando las dependencias estén resueltas.
Las correcciones vuelven al especialista responsable. La revisión y las pruebas
se centran en lo que cambió y en posibles regresiones relevantes.

## Carpetas

```text
agentes/
├── .opencode/
│   ├── agents/
│   │   ├── project-manager.md
│   │   ├── frontend-developer.md
│   │   ├── backend-developer.md
│   │   ├── database-engineer.md
│   │   ├── security-auditor.md
│   │   ├── ui-ux-designer.md
│   │   ├── devops-engineer.md
│   │   ├── code-reviewer.md
│   │   └── qa-tester.md
│   └── skills/
│       ├── api-contracts/SKILL.md
│       ├── secure-backend/SKILL.md
│       ├── frontend-accessibility/SKILL.md
│       ├── code-review/SKILL.md
│       ├── devops-runbook/SKILL.md
│       ├── project-coordination/SKILL.md
│       ├── qa-test-strategy/SKILL.md
│       ├── ux-specification/SKILL.md
│       ├── supabase-cli/SKILL.md
│       └── security-review/SKILL.md
├── opencode.json
└── proyectos/
    └── <nombre-del-proyecto>/
```

UI/UX puede guardar especificaciones Markdown en `docs/diseno/` dentro del
proyecto. QA puede escribir pruebas en los directorios y nombres autorizados.
Backend, Database Engineer y DevOps pueden editar dentro de `proyectos/` y sus instrucciones limitan
el trabajo al proyecto y al área asignados. Los agentes piden autorización para
comandos de terminal, salvo los permisos que el usuario haya concedido para
comandos concretos. Los secundarios no lanzan más agentes.

## Uso en VS Code

1. Abrir esta carpeta `agentes` en VS Code.
2. En su terminal CMD o PowerShell, ejecutar `opencode`.
3. Seleccionar Project Manager y un modelo disponible; los secundarios heredan
   ese modelo porque ninguno fija uno distinto.
4. Indicar `proyectos/<nombre>` y explicar requisitos, alcance y tecnologías
   existentes. Si falta una decisión importante, el Project Manager la consultará.

Ejemplo de petición:

```text
En proyectos/mi-aplicacion, revisa la estructura actual e implementa [función].
Conserva las tecnologías existentes. Define criterios de aceptación y utiliza
solo los especialistas necesarios. Coordina los contratos si hay frontend y
backend. Revisa y verifica los cambios e informa los resultados reales y cómo
ejecutar la aplicación.
```

Las skills se descubren en `.opencode/skills/<nombre>/SKILL.md`; se pueden invocar
con `/<nombre>` en el TUI o dejar que el agente las cargue según su descripción.
Los perfiles indican cuáles usar en cada tarea y permiten cargar skills.
Después de editar perfiles o skills, ejecuta `opencode reload` desde una
terminal abierta en esta carpeta. En el TUI, usa Tab para cambiar de agente
principal, `@nombre` para invocar un subagente y `/<nombre-de-skill>` para
cargar una skill.

Preparar configuración de despliegue no publica una aplicación. Las acciones
sobre producción o servicios externos necesitan una autorización que cubra su
destino y alcance; una autorización ya concedida en la sesión se respeta.









