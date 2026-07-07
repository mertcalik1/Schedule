# Contracts

This directory stores durable notes for public APIs, schemas, data models, wire formats, and cross-project contracts.

The project does not expose a remote/public API yet. The durable contract today is the local event data model stored in Electron/browser localStorage.

## Starting Notes

- Public APIs: None.
- Schemas and data models: Local event model stored under `zaman-takvimi-events-v1`.
- Wire formats: JSON in localStorage.
- Cross-project consumers: None.

## Event Model

```js
{
  id: string,
  title: string,
  start: string,
  end: string,
  category: string,
  reminderMinutes: number,
  repeat: "none" | "daily" | "weekly" | "monthly" | "yearly",
  notes: string,
  createdAt: string
}
```

`start`, `end`, and `createdAt` are ISO datetime strings.

## Routine Model

Routines are stored in localStorage under `zaman-takvimi-routines-v1`.

```js
{
  id: string,
  title: string,
  time: string, // HH:mm
  durationMinutes: number,
  category: string,
  reminderMinutes: number,
  notes: string
}
```

## Related

- [[00-agent-orientation]]
- [[standards/agent-documentation-rules]]
- [[architecture/README]]
