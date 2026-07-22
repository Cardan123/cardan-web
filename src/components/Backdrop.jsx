// Shared decorative background: subtle grid + single accent glow (Ember Copper)
const Backdrop = () => (
  <>
    <div aria-hidden="true" className="backdrop-grid fixed inset-0 pointer-events-none opacity-50" />
    <div
      aria-hidden="true"
      className="backdrop-glow fixed -top-40 left-1/2 -translate-x-1/2 w-[680px] h-[420px] pointer-events-none opacity-50"
    />
  </>
)

export default Backdrop
