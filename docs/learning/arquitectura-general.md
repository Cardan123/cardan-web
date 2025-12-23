# Arquitectura General del Proyecto

Este documento resume cómo se estructura y ejecuta el blog técnico dentro del repositorio `cardan-web`.

## Stack principal

- **Vite + React**: el proyecto se inicializa con Vite para obtener recarga rápida y bundling moderno.
- **Tailwind CSS**: las clases utilitarias controlan la capa visual (colores, tipografía, spacing, etc.).
- **Framer Motion**: añade animaciones declarativas a los componentes (`motion.div`, `AnimatePresence`).
- **Context API**: `src/context/BlogContext.jsx` centraliza el estado del blog.
- **LocalStorage**: se usa para persistir entradas creadas por el usuario (`useEffect` en `BlogProvider`).

## Estructura de carpetas relevante

- **`src/context/`**: contiene `BlogContext.jsx` con el reducer, acciones y proveedor de estado global.
- **`src/components/`**: alberga UI desacoplada (por ejemplo, `TechBlog.jsx`, `BlogPost.jsx`, `BlogEditor.jsx`, `CascadeBackground.jsx`).
- **`docs/learning/`**: documentación creada para describir el comportamiento interno del código (este directorio).

## Flujo alto nivel

1. **Estado global**: `BlogProvider` expone el estado (`posts`, `currentView`, `searchTerm`, etc.) y métodos (`setCurrentPost`, `toggleEditor`, `addPost`).
2. **Componente principal**: `TechBlog.jsx` consume `useBlog()` para renderizar el panel de entradas, filtros y editar/visualizar posts.
3. **Vista dinámica**: según `currentView` se alterna entre lista (`TechBlog`), vista detallada (`BlogPost`) y editor (`BlogEditor`).
4. **Animaciones y UX**: se usan variantes de Framer Motion y `IntersectionObserver` para revelar secciones progresivamente.

## Ciclo de renderizado

- **Carga inicial**: `BlogProvider` intenta recuperar entradas desde `localStorage` y, si existen, actualiza el estado con `LOAD_POSTS`.
- **Interacciones**: filtros, ordenamientos y búsqueda modifican el estado global; `TechBlog.jsx` recalcula `filteredPosts` en cada render.
- **Persistencia**: cualquier cambio en `state.posts` se serializa de nuevo en `localStorage` para mantener la información tras recargar.

## Siguientes lecturas

- Consulta `contexto-blog.md` para profundizar en el reducer y las acciones.
- Revisa `componentes-clave.md` para entender la responsabilidad de cada componente.
- Lee `animaciones-y-ui.md` si quieres dominar las transiciones y estilos.
- Explora `estado-y-filtrado.md` para conocer cómo se filtran y ordenan las entradas.
