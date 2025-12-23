# Contexto del Blog

Este documento describe cómo funciona `src/context/BlogContext.jsx`, el punto central del estado global del blog.

## BlogProvider

- **Ubicación** `src/context/BlogContext.jsx`
- **Descripción** Envuelve la aplicación y expone el estado global mediante `BlogContext.Provider`.
- **Hook clave** `useBlog()` verifica que el contexto exista y devuelve todas las propiedades y acciones disponibles.

## Estado inicial

- **`posts`** Tres entradas de ejemplo con campos como `title`, `category`, `tags`, `likes` y `content` con Markdown.
- **`currentView`** Controla la vista activa (`list`, `post`, `editor`).
- **`currentPost`** Almacena la entrada seleccionada para la vista detallada.
- **`isEditorOpen`** Bandera para abrir/cerrar el panel de edición.
- **`searchTerm`, `selectedCategory`, `sortBy`** Configuran filtros y ordenamiento.

## Reducer (`blogReducer`)

- **Patrón** `switch(action.type)` que devuelve un nuevo estado inmutable.
- **Acciones principales**
  - **`SET_VIEW`** Cambia la vista (`state.currentView`).
  - **`SET_CURRENT_POST`** Selecciona un post y cambia la vista a `post`.
  - **`ADD_POST`** Inserta una entrada con metadatos generados (fecha, slug, likes, etc.).
  - **`UPDATE_POST`** Mezcla actualizaciones parciales en la entrada con el ID dado.
  - **`DELETE_POST`** Elimina un post y restablece la vista a la lista.
  - **`TOGGLE_EDITOR`** Abre o cierra el editor sin salir de la vista actual.
  - **`SET_SEARCH_TERM`, `SET_CATEGORY`, `SET_SORT_BY`** Ajustan filtros y ordenamiento.
  - **`INCREMENT_VIEWS`** Incrementa la métrica `views` al abrir una entrada.
  - **`TOGGLE_LIKE`** Alterna un `liked` booleano y actualiza el contador `likes`.
  - **`LOAD_POSTS`** Sobrescribe `posts` con datos guardados en `localStorage`.

## Efectos (`useEffect`)

- **Carga inicial** Recupera `blog-posts` de `localStorage` y despacha `LOAD_POSTS` si existen datos.
- **Persistencia** Observa `state.posts` y vuelve a guardar la lista serializada en `localStorage`.

## Selectores y valores derivados

- **`filteredPosts`** Función interna llamada en cada render para aplicar filtros y ordenamiento:
  - **Categoría** Filtra por `state.selectedCategory`.
  - **Búsqueda** Evalúa `title`, `content` y `tags` con `state.searchTerm` en minúsculas.
  - **Orden** Usa `sortBy` para decidir entre `views`, `likes` o `date` (de más reciente a más antiguo).

## Acciones expuestas

- **`setView(view)`** Despacha `SET_VIEW`.
- **`setCurrentPost(post)`** Aumenta `views` y luego establece la entrada como `currentPost`.
- **`addPost(post)`**, **`updatePost(id, updates)`**, **`deletePost(id)`** Controlan el CRUD de entradas.
- **`toggleEditor()`**, **`setSearchTerm(term)`**, **`setCategory(category)`**, **`setSortBy(sort)`**, **`toggleLike(id)`** permiten gestionar la UI y las métricas.

## Nota de seguridad

`localStorage` sólo está disponible en el navegador; en renderizados del lado del servidor habría que añadir verificaciones para evitar errores en entornos sin `window`.
