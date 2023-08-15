import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Layout({children}){
    return (
        <div className="w-full">
            <Navbar />
            <main className="w-full">
                {children}
            </main>
            <Footer />
        </div>
    )
}