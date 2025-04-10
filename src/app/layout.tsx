import Navbar from '@/components/Navbar';
import './globals.css'
import { Inter } from 'next/font/google';
import Footer from '@/components/Footer';

 // Asegúrate de que la ruta al componente Footer sea correcta

const inter = Inter({ subsets: ['latin'] })

export default function ClientRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Login-App</title>
      </head>
      <body className={`${inter.className} `}>
        <Navbar /> {/* El Navbar estará en todas las páginas */}
        <main className="flex-grow container mx-auto px-4 py-8">
          {children} {/* El contenido específico de la página se renderiza aquí */}
        </main>
        <Footer /> {/* El Footer estará en todas las páginas */}
      </body>
    </html>
  )
}
