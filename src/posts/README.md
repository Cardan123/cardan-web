# Posts del Blog

Esta carpeta contiene todos los posts del blog en formato Markdown.

## Estructura de un Post

Cada archivo `.md` debe tener:

1. **Frontmatter YAML** al inicio con la metadata:
```yaml
---
id: 1
title: "Título del Post"
excerpt: "Resumen corto que aparece en la tarjeta"
author: "Carlos Villena"
date: "2025-01-20"
category: "AI/ML"
tags: ["Tag1", "Tag2", "Tag3"]
readTime: "5 min read"
featured: false
---
```

2. **Contenido Markdown** después del frontmatter

## Categorías Disponibles

- `AI/ML`
- `DevOps`
- `Backend`
- `Frontend`
- `Architecture`

## Cómo Agregar un Nuevo Post

1. Crea un nuevo archivo `.md` en esta carpeta
2. Usa un nombre descriptivo (ej: `mi-nuevo-post.md`)
3. Agrega el frontmatter con toda la metadata
4. Escribe el contenido en Markdown
5. Guarda el archivo

El post aparecerá automáticamente en el blog.

## Formato del Contenido

Puedes usar todo el formato Markdown estándar:
- **Negritas**: `**texto**`
- *Cursivas*: `*texto*`
- # Títulos
- - Listas
- `código inline`
- Bloques de código
- Enlaces
- Y más...

