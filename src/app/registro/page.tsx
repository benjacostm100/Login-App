
import RegistroForm from './RegistroForm'


export default function RegistroPage() {
  return (
    <>
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Registro</h1>
        <RegistroForm />
      </div>
    </div>
    </>
  )
}

