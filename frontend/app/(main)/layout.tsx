import { Footer } from "@/components/layouts/Footer";
import { Hero } from "@/components/layouts/Hero";
import { Navbar } from "@/components/layouts/Navbar";
import { UploadZone } from "@/components/pdf/UploadZone";

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