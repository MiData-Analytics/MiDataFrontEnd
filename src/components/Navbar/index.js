import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineMenu, AiOutlineCloseCircle } from "react-icons/ai";
import { AnimatePresence, motion } from "framer-motion";

export default function Navbar({ userData }) {
  const [openMobileNav, setOpenMobileNav] = useState(false);
  const variants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <nav
        className={`justify-between items-center gap-x-3 py-2 px-3 text-primary font-medium border flex-wrap lg:flex hidden w-full`}
      >
        <Link href="/">
          <div>
            <Image
              src="/logo/midata.png"
              width={196}
              height={59}
              alt="MiData Logo"
            />
          </div>
        </Link>
        {userData ? (
          <div className="flex flex-col text-primary font-semibold">
            <p>
              {userData?.firstName} {userData?.lastName}
            </p>
            <p>{userData?.emailAddress}</p>
          </div>
        ) : (
          <>
            <div className="flex justify-center gap-x-10 text-md items-center">
              <Link href="/about">About MiData</Link>
              <Link href="/pricing">Pricing</Link>
              <Link href="/contact">Contact Us</Link>
            </div>
          </>
        )}
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
      <nav className="flex lg:hidden w-full relative h-[10vh] shadow-lg">
        <div className="flex flex-row justify-between items-center w-full pr-2">
          <Link href="/">
            <Image
              src="/logo/midata.png"
              width={160}
              height={45}
              alt="MiData Logo"
              className="object-contain"
            />
          </Link>
          {userData && (
            <div className="flex flex-col text-primary font-semibold">
              <p>
                {userData?.firstName} {userData?.lastName}
              </p>
              <p>{userData?.emailAddress}</p>
            </div>
          )}
          <AiOutlineMenu
            size={35}
            className="hover:cursor-pointer"
            onClick={() => setOpenMobileNav(true)}
          />
        </div>

        <AnimatePresence
          initial={false}
          node="wait"
          onExitComplete={() => null}
        >
          {openMobileNav && (
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={variants}
              className="fixed top-0 z-20 h-[100vh] bg-white w-full"
            >
              <div className="flex justify-end p-5">
                <AiOutlineCloseCircle
                  size={35}
                  className="hover:cursor-pointer"
                  onClick={() => setOpenMobileNav(false)}
                />
              </div>

              <div className="flex flex-col text-primary items-center text-xl">
                <Link href="/">Home</Link>
                <Link href="/about">About MiData</Link>
                <Link href="/pricing">Pricing</Link>
                <Link href="/contact">Contact Us</Link>
              </div>

              <div className="flex flex-col items-center text-primary mt-5">
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
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
