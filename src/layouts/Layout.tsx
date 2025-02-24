import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header fijo arriba */}
      <header className="w-full">
        <Header />
      </header>

      {/* Contenido principal que se expande */}
      <main className="flex-grow container max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </main>

      {/* Footer siempre al fondo */}
      <footer className="w-full mt-auto">
        <Footer />
      </footer>
    </div>
  );
};
