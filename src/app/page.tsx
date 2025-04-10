'use client';

import Link from 'next/link';
import './globals.css';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-cyan-50">
      <h1 className="text-3xl font-bold text-blue-950 mb-8">
        Bienvenidos al Login-App
      </h1>
      <div className="flex space-x-4">
        <Link
          href="/login"
          className="bg-cyan-500 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-800 transition duration-300"
        >
          Iniciar Sesión
        </Link>
        <Link
          href="/registro"
          className="bg-cyan-500 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-800 transition duration-300"
        >
          Registrarse
        </Link>
      </div>
    </div>
  );
}
