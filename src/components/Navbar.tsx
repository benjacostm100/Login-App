import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  return (
    <nav className="bg-cyan-500 p-4 shadow-lg flex justify-between items-center">
      {/* Logo y nombre */}
      <div className="flex items-center gap-2">
        <Image src="/logo.svg" alt="TechConnect Logo" width={100} height={100} />
        <span className="text-white font-bold text-lg">TechConnect</span>
      </div>

      {/* Enlaces del navbar */}
      <div className="space-x-6 p-6">
        <Link href="/" className="text-blue-950 font-bold  hover:text-cyan-200 ">Inicio</Link>
        <Link href="/registro" className="text-blue-950 font-bold  hover:text-cyan-200 ">Registrarse</Link>
        <Link href="/login" className="text-blue-950 font-bold  hover:text-cyan-200 ">Iniciar Sesión</Link>
      </div>
    </nav>
  );
}
