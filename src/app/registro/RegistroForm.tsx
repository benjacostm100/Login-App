'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { registrarUsuario } from './actions'

export default function RegistroForm() {
  const [error, setError] = useState('')
  const router = useRouter()

  async function onSubmit(formData: FormData) {
    const result = await registrarUsuario(formData)
    if (result.success) {
      router.push('/login')
    } else {
      setError(result.error || 'Hubo un error al registrar el usuario')
    }
  }

  return (
    <form action={onSubmit} className="space-y-4">
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
          Nombre de usuario
        </label>
        <input
          type="text"
          id="username"
          name="username"
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Contraseña
        </label>
        <input
          type="password"
          id="password"
          name="password"
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Registrarse
      </button>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </form>
  )
}

