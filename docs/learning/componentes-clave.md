# Componentes Clave

Este documento detalla los componentes principales bajo `src/components/` y explica cómo colaboran para construir el blog técnico.

## TechBlog

- **Archivo** `src/components/TechBlog.jsx`
- **Responsabilidad** Es la vista general del blog. Coordina filtros, paginación, lista de posts y llamadas a otras vistas (`BlogPost`, `BlogEditor`).
- **Hooks**
  - `useBlog()` para consumir el estado global.
  - `useState` para paginación (`currentPage`).
  - `useEffect` con `IntersectionObserver` para activar animaciones cuando el bloque entra en pantalla.
- **Elementos UI**
  - Botón "Nueva entrada" que usa `toggleEditor()`.
  - Filtros de categoría y ordenamiento.
  - Grid de posts (`currentPosts.map(...)`).
  - Paginación con botones numerados.
  - Sección de estadísticas generales.

## BlogPost

- **Archivo** `src/components/BlogPost.jsx`
- **Responsabilidad** Renderizar el detalle de una entrada (`post`).
- **Características destacadas**
  - Botón para volver a la lista (`setView('list')`) y cerrar el modal.
  - Información del post: título, fecha (`formatDate`), etiquetas, métricas (`views`, `likes`).
  - Contenido en Markdown utilizando un parser (revisa la implementación exacta en el archivo).
  - Acciones: marcar como favorito (`toggleLike`), compartir, copiar enlace.

## BlogEditor

- **Archivo** `src/components/BlogEditor.jsx`
- **Responsabilidad** Permitir crear o editar posts.
- **Características**
  - Formulario con campos para título, categoría, resumen, tags, contenido (Markdown).
  - Vista previa en tiempo real de Markdown y estadísticas (longitud, tiempo de lectura aproximado).
  - Manejo de `onSubmit` que llama a `addPost()` o `updatePost()` según el modo.
  - Botones animados (`motion.button`) para mejorar la UX.

## CascadeBackground

- **Archivo** `src/components/CascadeBackground.jsx`
- **Responsabilidad** Dibujar fondos animados que acompañan distintas secciones. El componente acepta props como `intensity` y `colors`.
- **Uso en `TechBlog`** Colocado al inicio del JSX principal para renderizar efectos de partículas o gradientes detrás del contenido.

## Otros componentes útiles

- **`SearchBar` / `Filter` (si existieran)** Revisa la carpeta para identificar piezas reutilizables.
- **`StatsCard`** (si se abstrayera la tarjeta de estadísticas) puede ser un buen candidato para reutilización en el futuro.

## Cómo seguir aprendiendo

1. **Lee el código fuente** y sigue los comentarios o secciones marcadas con `TODO` (si existen).
2. **Ejecuta el proyecto** (`npm install` + `npm run dev`) para ver cómo responde cada componente a tus cambios.
3. **Agrega nuevas funcionalidades** (por ejemplo, validaciones adicionales en el editor) y documenta la experiencia en este directorio.
