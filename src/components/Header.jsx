export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-transparent backdrop-blur-2xl">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6 lg:px-8">
        <div>
          <h1 className="text-lg font-semibold tracking-tight text-white">
            Mi Aplicación
          </h1>
        </div>

        <nav className="flex items-center gap-6">
          <a
            href="/"
            className="text-sm text-white/60 transition-colors hover:text-white"
          >
            Inicio
          </a>

          <a
            href="/mapa"
            className="text-sm text-white/60 transition-colors hover:text-white"
          >
            Mapa
          </a>
        </nav>
      </div>
    </header>
  );
}