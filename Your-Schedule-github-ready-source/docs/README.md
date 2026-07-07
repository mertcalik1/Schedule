# Project Docs

This directory describes project behavior in Markdown that is readable by both agents and humans. It does not fetch live system data; it is versioned project memory.

When using Obsidian, open the repository's `docs/` directory as the vault root.

## Where to start

1. Use [[00-agent-orientation]] to choose the coding-agent reading route.
2. Read [[standards/agent-documentation-rules]] for documentation rules.
3. Read [[architecture/README]] for durable system behavior.
4. Read [[contracts/README]] when public APIs, schemas, data models, or wire formats exist.
5. Read [[decisions/README]] for durable decision records.

## Agent use

- Read task-relevant docs before scanning long progress history.
- Old detailed changelog entries belong in `docs/history/progress-archive.md`; they are not current truth.
- Every new durable note must link to at least one hub or `Related` section.
- `.obsidian/` is local editor state and must not be committed.

## Related

- [[00-agent-orientation]]
- [[standards/agent-documentation-rules]]
- [[architecture/README]]
- [[contracts/README]]
- [[decisions/README]]
- [[history/README]]
