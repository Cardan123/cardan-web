/**
 * Formatea una fecha frontmatter (YYYY-MM-DD) como "Jan 15, 2025".
 * Usa UTC para evitar el desfase de un día por zona horaria.
 * @param {string} dateString
 * @returns {string}
 */
export const formatDate = (dateString) => {
  if (!dateString) return ''
  try {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      timeZone: 'UTC',
    })
  } catch {
    return dateString
  }
}
