import Image from "next/image"
import Link from "next/link";

export default function Navbar(){
    return (
      <>
        <nav className="flex justify-between items-center gap-x-3 py-2 px-3 text-primary font-medium border">
          <Link href="/">
            <div>
              <Image src="/logo/midata.png" width={196} height={59} alt="MiData Logo" />
            </div>
          </Link>
          <div className="flex justify-center gap-x-10 text-md items-center">
            <Link href="/about">About MiData</Link>
            <Link href="/pricing">Pricing</Link>
            <Link href="/contact">Contact Us</Link>
          </div>
          <div className="flex justify-center gap-x-10 text-md items-center">
            <Link href="/login" className="font-semibold">
              Login
            </Link>
            <Link
              href="/signup"
              className="px-10 py-2 bg-primary text-white rounded-[90px] font-extrabold"
            >
              Sign Up
            </Link>
          </div>
        </nav>
      </>
    ); 
}