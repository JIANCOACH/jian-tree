# Agentes de IA utilizados

Este proyecto fue desarrollado íntegramente con asistencia de **Claude Code** (Anthropic), usando el modelo **claude-sonnet-4-6** dentro del entorno de VS Code.

## Rol del agente

El agente actuó como co-desarrollador full-stack en todas las etapas:

| Etapa | Tarea |
|-------|-------|
| Prototipado | Generó el mockup inicial en HTML/CSS puro con diseño glassmorphism |
| Backoffice | Construyó el admin en vanilla JS con preview en tiempo real |
| Refactorización | Migró todo el proyecto a React + Tailwind + Vite |
| Debug | Diagnosticó y resolvió errores de build (JSX en `.js`, multi-entry HTML) |

## Herramientas usadas por el agente

- **Write** — creación de archivos fuente
- **Edit** — modificaciones puntuales
- **Bash / PowerShell** — scaffolding, instalación de dependencias, diagnóstico del entorno
- **Read / Glob / Grep** — exploración del proyecto

## Modelo

```
claude-sonnet-4-6
Proveedor: Anthropic
Interfaz: Claude Code (extensión VS Code)
```

## Notas

- Todas las decisiones de diseño (paleta, tipografía, layout) fueron delegadas al agente con libertad creativa.
- El agente detectó que Node.js no estaba instalado y guió al usuario para resolverlo.
- El agente propuso la arquitectura React (Context API + React Router + localStorage) sin librerías de estado externas para mantener el proyecto ligero.
