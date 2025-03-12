export default function Footer() {
    return (
      <footer className="bg-blue-600 text-white p-4 text-center shadow-inner">
        <div className="container mx-auto">
          <h2 className="text-xl font-bold mb-2">📚 Laredu</h2>
          <p className="text-sm">© {new Date().getFullYear()} Laredu. Todos los derechos reservados.</p>
        </div>
      </footer>
    )
  }
  
  