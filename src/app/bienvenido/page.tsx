'use client';
import { useEffect, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Asegúrate de instalar react-icons

type User = {
  username: string;
  password: string;
};

export default function BienvenidoPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState<User>({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState<boolean>(false); // Estado para mostrar/ocultar la contraseña

  // Fetch users on component mount
  useEffect(() => {
    async function fetchUsers() {
      const response = await fetch('/api/users');
      const data: User[] = await response.json();
      setUsers(data);
    }

    fetchUsers();
  }, []);

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setFormData(users[index]);
  };

  const handleDelete = async (index: number) => {
    const usernameToDelete = users[index].username;

    await fetch('/api/users', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: usernameToDelete }),
    });

    setUsers((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    const updatedUsers = [...users];
    updatedUsers[editingIndex!] = formData;

    await fetch('/api/users', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    setUsers(updatedUsers);
    setEditingIndex(null);
    setFormData({ username: '', password: '' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Función para alternar la visibilidad de la contraseña
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-6">¡Bienvenido!</h1>
      <table className="table-auto border-collapse border border-gray-300 w-full max-w-4xl">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Usuario</th>
            <th className="border border-gray-300 px-4 py-2">Contraseña</th>
            <th className="border border-gray-300 px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index} className="text-center">
              <td className="border border-gray-300 px-4 py-2">
                {editingIndex === index ? (
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="border p-1"
                  />
                ) : (
                  user.username
                )}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {editingIndex === index ? (
                  <div className="flex items-center">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="border p-1"
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="ml-2"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                ) : (
                  '••••••••'
                )}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {editingIndex === index ? (
                  <button onClick={handleSave} className="btn-primary">
                    Guardar
                  </button>
                ) : (
                  <>
                    <button onClick={() => handleEdit(index)} className="btn-secondary mr-2">
                      Editar
                    </button>
                    <button onClick={() => handleDelete(index)} className="btn-danger">
                      Eliminar
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
