export default function Footer() {
  return (
    <footer className="bg-indigo-800 text-white py-8">
      <p className="mb-4 text-center text-lg font-light">
        &copy; {new Date().getFullYear()} TechConnect. Todos los derechos reservados.
      </p>
      <div className="flex justify-center gap-6">
        <a href="#" className="text-white font-medium hover:text-cyan-500 transition-colors duration-300">
          Facebook
        </a>
        <a href="#" className="text-white font-medium hover:text-cyan-500 transition-colors duration-300">
          Twitter
        </a>
        <a href="#" className="text-white font-medium hover:text-cyan-500 transition-colors duration-300">
          LinkedIn
        </a>
      </div>
    </footer>
  );
}
