'use server'

import { checkUser } from '@/utils/csvHandler'

export async function iniciarSesion(formData: FormData) {
  const username = formData.get('username') as string
  const password = formData.get('password') as string

  if (!username || !password) {
    return { success: false, error: 'Nombre de usuario y contraseña son requeridos' }
  }

  const isValid = await checkUser(username, password)

  if (isValid) {
    return { success: true }
  } else {
    return { success: false, error: 'Credenciales inválidas' }
  }
}

