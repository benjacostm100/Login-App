import fs from 'fs/promises';
import path from 'path';
import { parse, stringify } from 'csv/sync';

// Definir la interfaz para los usuarios
interface User {
  username: string;
  password: string;
}

const CSV_FILE_PATH = path.join(process.cwd(), 'users.csv');

async function ensureFileExists() {
  try {
    await fs.access(CSV_FILE_PATH);
  } catch {
    // Si el archivo no existe, crearlo con los encabezados
    await fs.writeFile(CSV_FILE_PATH, 'username,password\n');
  }
}

export async function saveUser(username: string, password: string) {
  try {
    await ensureFileExists();
    const fileContent = await fs.readFile(CSV_FILE_PATH, 'utf-8');
    const users: User[] = parse(fileContent, { columns: true });

    if (users.some(user => user.username === username)) {
      return { success: false, error: 'El nombre de usuario ya existe' };
    }

    users.push({ username, password });
    await fs.writeFile(CSV_FILE_PATH, stringify(users, { header: true }));
    return { success: true };
  } catch (error) {
    console.error('Error saving user:', error);
    return { success: false, error: 'Error al guardar el usuario' };
  }
}

export async function checkUser(username: string, password: string) {
  try {
    await ensureFileExists();
    const fileContent = await fs.readFile(CSV_FILE_PATH, 'utf-8');
    const users: User[] = parse(fileContent, { columns: true });
    return users.some(user => user.username === username && user.password === password);
  } catch (error) {
    console.error('Error checking user:', error);
    return false;
  }
}
