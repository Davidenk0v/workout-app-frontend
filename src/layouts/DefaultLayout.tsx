import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

interface DefaultLayoutProps {
  children: React.ReactNode;
}

export const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <>
      <header>
        <Header />
      </header>
      <div className="flex-grow">
        <main>{children}</main>
      </div>
      <footer>
        <Footer />
      </footer>
    </>
  );
};
