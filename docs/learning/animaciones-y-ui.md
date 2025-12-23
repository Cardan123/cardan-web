# Animaciones y UI

Este documento recopila los patrones de animación y estilos empleados en `src/components/` para el blog técnico.

## Framer Motion

- **Importaciones comunes** `import { motion, AnimatePresence } from 'framer-motion'`.
- **Variantes**
  - `containerVariants` en `TechBlog.jsx` define animaciones con `staggerChildren` para revelar el contenido de forma escalonada.
  - `itemVariants` manipula `opacity` y `y` para el efecto "slide in".
- **AnimatePresence**
  - Usado en la grilla de posts (`<AnimatePresence mode="wait">`) para transiciones suaves al filtrar o cambiar páginas.
- **whileHover / whileTap**
  - Botones (`motion.button`) escalan ligeramente para obtener feedback visual.

## Intersection Observer

- **Objetivo**: solo ejecutar animaciones cuando la sección `TechBlog` es visible.
- **Implementación**
  - `useRef()` + `ref={ref}` para identificar el contenedor.
  - `useEffect()` crea `IntersectionObserver` con `threshold: 0.2`.
  - Cuando la intersección es positiva, `setIsVisible(true)` y se dispara la animación.

## Tailwind CSS y estilos personalizados

- **Clases**
  - `section-padding`, `bg-playstation-black`, `container-max` provienen de configuraciones de Tailwind.
  - `glass-effect`, `gradient-text`, `btn-primary` sugieren utilidades personalizadas.
- **Layout**
  - `grid md:grid-cols-2 lg:grid-cols-3` para distribuir tarjetas.
  - `flex flex-wrap justify-center` para los filtros de categorías.

## Componentes visuales especiales

- **CascadeBackground**
  - Renderiza fondos animados. Revisa `src/components/CascadeBackground.jsx` para conocer parámetros `intensity` y `colors`.
- **Estadísticas animadas**
  - Cada tarjeta (`motion.div`) usa animaciones de escala y rotación para aparecer con efecto elástico.

## Buenas prácticas observadas

- **Limpieza del observer** con `return () => observer.disconnect()` en el `useEffect()` para evitar fugas de memoria.
- **Desacople**: las variantes de Framer Motion se definen fuera del JSX, facilitando la reutilización.
- **Accesibilidad**: asegúrate de que los elementos interactivos (`button`, `article`) tengan roles apropiados y textos descriptivos.

## Sugerencias de estudio

1. Explora la [documentación oficial de Framer Motion](https://www.framer.com/motion/) para entender variantes y transiciones avanzadas.
2. Practica creando variantes reutilizables (por ejemplo, `fadeInUp`) que puedas compartir entre componentes.
3. Experimenta con `AnimatePresence` para transiciones al cerrar modales (`BlogEditor`).
