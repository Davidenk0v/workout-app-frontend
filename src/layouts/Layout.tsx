import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header fijo arriba */}
      <header>
        <Header />
      </header>

      {/* Contenido principal que se expande */}
      <main className="flex-grow container mx-auto px-4 p-6">{children}</main>

      {/* Footer siempre al fondo */}
      <footer className="mt-auto">
        <Footer />
      </footer>
    </div>
  );
};
