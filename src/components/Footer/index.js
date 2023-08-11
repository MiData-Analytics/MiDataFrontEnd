import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#DFD4FF] h-fit py-[3.5rem] sm:px-10 px-7 relative bottom-0 w-full">
      <div className="flex justify-between items-center pb-[3rem] relative">
        <Image src="/logo/midata.png" width={160} height={45} className="" alt="MiData Logo" />
        <div className="hidden flex-row sm:flex">
          <Link href="/">
            <Image
              src="/icons/twitter.png"
              width={45}
              height={45}
              alt="Social Media Icons"
            />
          </Link>
          <Link href="/">
            <Image
              src="/icons/youtube.png"
              width={45}
              height={45}
              alt="Social Media Icons"
            />
          </Link>
          <Link href="/">
            <Image
              src="/icons/facebook.png"
              width={45}
              height={45}
              alt="Social Media Icons"
            />
          </Link>
          <Link href="/">
            <Image
              src="/icons/linkedin.png"
              width={45}
              height={45}
              alt="Social Media Icons"
            />
          </Link>
          <Link href="/">
            <Image
              src="/icons/instagram.png"
              width={45}
              height={45}
              alt="Social Media Icons"
            />
          </Link>
          <Link href="/">
            <Image
              src="/icons/thread.png"
              width={45}
              height={45}
              alt="Social Media Icons"
            />
          </Link>
        </div>
      </div>
      <div className="flex justify-center">
        <hr className="sm:w-[95%] w-[100%] border-[#37373771]" />
      </div>
      <div className="flex flex-row sm:hidden mt-5 justify-between">
        <Link href="/">
          <Image
            src="/icons/twitter.png"
            width={45}
            height={45}
            alt="Social Media Icon"
          />
        </Link>
        <Link href="/">
          <Image
            src="/icons/youtube.png"
            width={45}
            height={45}
            alt="Social Media Icon"
          />
        </Link>
        <Link href="/">
          <Image
            src="/icons/facebook.png"
            width={45}
            height={45}
            alt="Social Media Icon"
          />
        </Link>
        <Link href="/">
          <Image
            src="/icons/linkedin.png"
            width={45}
            height={45}
            alt="Social Media Icon"
          />
        </Link>
        <Link href="/">
          <Image
            src="/icons/instagram.png"
            width={45}
            height={45}
            alt="Social Media Icon"
          />
        </Link>
        <Link href="/">
          <Image
            src="/icons/thread.png"
            width={45}
            height={45}
            alt="Social Media Icon"
          />
        </Link>
      </div>
      <div className="flex w-[90%] justify-between mx-auto my-5 items-center sm:flex-row flex-col-reverse">
        <h3 className="text-[#37139D] font-extrabold sm:text-5xl text-4xl leading-[3rem]">
          See the big
          <br /> picture in
          <br /> every detail
        </h3>
        <div className="flex items-center gap-x-3">
          <div className="space-y-2 py-3">
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
      </div>
      <div className="flex justify-center">
        <hr className="w-[95%] border-[#37373771]" />
      </div>
      <div className="w-[95%] mx-auto pt-5 text-[#373737]">
        <p className="text-center text-[10px] sm:hidden block">
          Powered By: Kimpact Development Initiative
        </p>
        <p className="sm:text-right text-center text-sm font-medium">
          Copyright &copy; {currentYear} MiData - All Rights Reserved
        </p>
      </div>
    </footer>
  );
}
