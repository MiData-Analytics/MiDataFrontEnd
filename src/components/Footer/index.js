import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#DFD4FF] h-fit py-5 px-10 absolute bottom-0 w-full">
      <div className="flex justify-between items-center py-3">
        <div>
          <Image src="/logo/midata.png" width={160} height={39} className="" />
        </div>
        <div className="flex">
          <Link href="/">
            <Image src="/icons/twitter.png" width={45} height={45} />
          </Link>
          <Link href="/">
            <Image src="/icons/youtube.png" width={45} height={45} />
          </Link>
          <Link href="/">
            <Image src="/icons/facebook.png" width={45} height={45} />
          </Link>
          <Link href="/">
            <Image src="/icons/linkedin.png" width={45} height={45} />
          </Link>
          <Link href="/">
            <Image src="/icons/instagram.png" width={45} height={45} />
          </Link>
          <Link href="/">
            <Image src="/icons/thread.png" width={45} height={45} />
          </Link>
        </div>
      </div>
      <div className="flex justify-center">
        <hr className="w-[95%] border-[#37373771]" />
      </div>
      <div className="flex w-[90%] justify-between mx-auto my-5 items-center">
        <h3 className="text-[#37139D] font-extrabold text-5xl leading-[3rem]">
          See the big
          <br /> picture in
          <br /> every detail
        </h3>
        <div className="space-y-2">
          <h5 className="font-bold text-[#583E9C]">ABOUT MiData</h5>
          <ul className="space-y-2 font-medium">
            <li>
              <Link href="/">Why MiData?</Link>
            </li>
            <li>
              <Link href="/">Security</Link>
            </li>
            <li>
              <Link href="/">Privacy Policy</Link>
            </li>
            <li>
              <Link href="/">User Agreement</Link>
            </li>
          </ul>
        </div>
        <div className="space-y-2">
          <h5 className="font-bold text-[#583E9C]">ABOUT MiData</h5>
          <ul className="space-y-2 font-medium">
            <li>
              <Link href="/">Why MiData?</Link>
            </li>
            <li>
              <Link href="/">Security</Link>
            </li>
            <li>
              <Link href="/">Privacy Policy</Link>
            </li>
            <li>
              <Link href="/">User Agreement</Link>
            </li>
          </ul>
        </div>
        <div className="space-y-2">
          <h5 className="font-bold text-[#583E9C]">ABOUT MiData</h5>
          <ul className="space-y-2 font-medium">
            <li>
              <Link href="/">Why MiData?</Link>
            </li>
            <li>
              <Link href="/">Security</Link>
            </li>
            <li>
              <Link href="/">Privacy Policy</Link>
            </li>
            <li>
              <Link href="/">User Agreement</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex justify-center">
        <hr className="w-[95%] border-[#37373771]" />
      </div>
      <div className="w-[95%] mx-auto">
        <p className="text-right text-sm font-medium pt-5">
          Copyright &copy; {currentYear} MiData - All Rights Reserved
        </p>
      </div>
    </footer>
  );
}
