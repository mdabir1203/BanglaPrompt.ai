import { ReactNode, Children } from "react";
import OptimizedAdLayout from "./OptimizedAdLayout";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  const content = Children.toArray(children);

  return (
    <OptimizedAdLayout>
      <div id="top" aria-hidden="true" className="sr-only" />
      <Navbar />
      <main id="main-content" className="flex flex-col gap-0 pt-24">
        {content}
      </main>
      <Footer />
    </OptimizedAdLayout>
  );
};

export default RootLayout;
