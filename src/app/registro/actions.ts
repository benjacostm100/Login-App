'use server'

import { saveUser } from '@/utils/csvHandler'

export async function registrarUsuario(formData: FormData) {
  const username = formData.get('username') as string
  const password = formData.get('password') as string

  if (!username || !password) {
    return { success: false, error: 'Nombre de usuario y contraseña son requeridos' }
  }

  return await saveUser(username, password)
}

