import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'

const AdminLogin = ({ onBack }) => {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (login(password)) {
      setError('')
      setPassword('')
      // El usuario ya está logueado, se mostrará el dashboard
    } else {
      setError('Contraseña incorrecta')
      setPassword('')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-cyber-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="cyber-card rounded-lg p-6 w-full max-w-md"
      >
        <div className="text-center mb-6">
          <h2 className="text-2xl font-cyber cyber-title mb-2">ADMIN ACCESS</h2>
          <p className="text-gray-400 font-cyber text-sm">Sistema de autenticación</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-cyber-cyan font-cyber text-sm mb-2">
              PASSWORD
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="cyber-input w-full rounded"
              placeholder="Ingresa la contraseña de administrador"
              autoFocus
            />
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-status-error font-cyber text-sm"
            >
              ⚠ {error}
            </motion.p>
          )}

          <div className="flex gap-3 pt-2">
            <motion.button
              type="submit"
              className="btn-cyber-filled flex-1"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              AUTENTICAR
            </motion.button>

            <motion.button
              type="button"
              onClick={() => {
                onBack && onBack()
                setError('')
                setPassword('')
              }}
              className="btn-cyber"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              VOLVER
            </motion.button>
          </div>
        </form>

        <div className="mt-6 pt-4 border-t border-cyber-cyan/20">
          <p className="text-gray-500 font-matrix text-xs text-center">
            Solo el administrador puede gestionar el blog
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default AdminLogin