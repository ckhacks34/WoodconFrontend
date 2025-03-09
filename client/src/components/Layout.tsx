import { ReactNode, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  useEffect(() => {
    // Add custom classes for fonts to the document
    document.body.classList.add('font-opensans', 'text-gray-800', 'bg-cream');
    
    return () => {
      document.body.classList.remove('font-opensans', 'text-gray-800', 'bg-cream');
    };
  }, []);
  
  return (
    <>
      <Header />
      <main>
        {children}
      </main>
      <Footer />
    </>
  );
}
