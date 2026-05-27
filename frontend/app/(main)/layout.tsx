import { Footer } from "@/components/layouts/Footer";
import { Navbar } from "@/components/layouts/Navbar";

export default function SlicePDF({ children }: { children: React.ReactNode }) {

  return (
    <>
      <main className="slice-root">
        <Navbar/>

        {children}
        
        <Footer/>

      </main>
    </>
  );
}