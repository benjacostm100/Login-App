import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs/promises';
import path from 'path';
import { parse, stringify } from 'csv/sync';

const CSV_FILE_PATH = path.join(process.cwd(), 'users.csv');

// Definir la interfaz del usuario
interface User {
  username: string;
  password: string;
}

async function ensureFileExists() {
  try {
    await fs.access(CSV_FILE_PATH);
  } catch {
    await fs.writeFile(CSV_FILE_PATH, 'username,password\n');
  }
}

async function getUsers(): Promise<User[]> {
  try {
    await ensureFileExists();
    const fileContent = await fs.readFile(CSV_FILE_PATH, 'utf-8');
    return parse(fileContent, { columns: true }) as User[];
  } catch {
    throw new Error('Error reading users');
  }
}

async function updateUser(userData: User): Promise<void> {
  try {
    const users = await getUsers();
    const index = users.findIndex(user => user.username === userData.username);
    
    if (index !== -1) {
      users[index].password = userData.password;
    }
    
    await fs.writeFile(CSV_FILE_PATH, stringify(users, { header: true }));
  } catch {
    throw new Error('Error updating user');
  }
}

async function deleteUser(username: string): Promise<void> {
  try {
    const users = await getUsers();
    const updatedUsers = users.filter(user => user.username !== username);

    await fs.writeFile(CSV_FILE_PATH, stringify(updatedUsers, { header: true }));
  } catch {
    throw new Error('Error deleting user');
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Obtener todos los usuarios
    try {
      const users = await getUsers();
      return res.status(200).json(users);
    } catch {
      return res.status(500).json({ message: 'Error retrieving users' });
    }
  } else if (req.method === 'PUT') {
    // Actualizar usuario
    const { username, password } = req.body;
    try {
      if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
      }
      
      await updateUser({ username, password });
      return res.status(200).json({ message: 'User updated successfully' });
    } catch {
      return res.status(500).json({ message: 'Error updating user' });
    }
  } else if (req.method === 'DELETE') {
    // Eliminar usuario
    const { username } = req.body;
    try {
      if (!username) {
        return res.status(400).json({ message: 'Username is required' });
      }
      
      await deleteUser(username);
      return res.status(200).json({ message: 'User deleted successfully' });
    } catch {
      return res.status(500).json({ message: 'Error deleting user' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
