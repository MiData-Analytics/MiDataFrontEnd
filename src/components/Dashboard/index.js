import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { LuLayoutDashboard } from "react-icons/lu";
import { TbChecklist } from "react-icons/tb";
import { HiUsers } from "react-icons/hi";
import { BiWallet } from "react-icons/bi";
import { FiLogOut } from "react-icons/fi";
import { useRouter } from "next/router";
import { AiOutlineMenu } from "react-icons/ai";
import { AiFillCaretDown } from "react-icons/ai";
import { HiMagnifyingGlass } from "react-icons/hi2";

const firstLinks = [
  {
    url: "/dashboard",
    title: "Dashboard",
    icon: <LuLayoutDashboard size={25} />,
  },
  {
    url: "/dashboard/checklists",
    title: "Checklists",
    icon: <TbChecklist size={25} />,
  },
  {
    url: "/dashboard/monitors",
    title: "My Monitors",
    icon: <HiUsers size={25} />,
  },
];

const secondLinks = [
  {
    url: "/dashboard/subscriptions",
    title: "Subscriptions",
    icon: <BiWallet size={25} />,
  },
];

const login = [
  {
    url: "/logout",
    title: "Logout",
    icon: <FiLogOut size={25} />,
  },
];

export function Sidebar() {
  function NavLink({ url, title, icon }) {
    const [active, setActive] = useState(false);
    const { pathname } = useRouter();

    useEffect(() => {
      if (pathname === url) {
        setActive(true);
      }
    }, []);

    return (
      <Link href={url}>
        <div
          className={`flex justify-start gap-4 items-center border w-56 mx-auto p-3  py-5 rounded-xl ${
            active ? "bg-[#6C3FEE] text-white" : ""
          } hover:bg-[#6C3FEE] hover:text-white hover:shadow-md hover:duration-300`}
        >
          {icon}
          {title}
        </div>
      </Link>
    );
  }

  return (
    <>
      <nav className="lg:hidden flex w-full border justify-between bg-white shadow-md">
        <Link href="/dashboard">
          <Image
            src="/logo/midata.png"
            alt="MiData Logo"
            height={57}
            width={196}
          />
        </Link>
        <div className="flex items-center gap-3 pr-2">
          <HiMagnifyingGlass size={25} />
          <AiOutlineMenu size={25} />
        </div>
      </nav>
      <nav className="w-72 border bg-white h-[100vh] lg:flex flex-col items-center py-3 justify-start gap-10 hidden">
        <Link href="/dashboard">
          <Image
            src="/logo/midata.png"
            alt="MiData Logo"
            height={57}
            width={196}
          />
        </Link>
        <div className="flex flex-col gap-10 w-full">
          <div className="flex flex-col gap-3">
            {firstLinks.map((link, index) => {
              return (
                <NavLink
                  key={index}
                  url={link.url}
                  title={link.title}
                  icon={link.icon}
                />
              );
            })}
          </div>
          <div className="flex flex-col gap-3">
            {secondLinks.map((link, index) => {
              return (
                <NavLink
                  key={index}
                  url={link.url}
                  title={link.title}
                  icon={link.icon}
                />
              );
            })}
          </div>
          <div className="flex flex-col gap-10 w-full place-items mt-10">
            {login.map((link, index) => {
              return (
                <NavLink
                  key={index}
                  url={link.url}
                  title={link.title}
                  icon={link.icon}
                />
              );
            })}
          </div>
        </div>
      </nav>
    </>
  );
}

export function Header() {
  const [searchTerm, setSearchTerm] = useState("");

  function Options({ icon, link }) {
    const { pathname } = useRouter();


    return (
      <div className="flex gap-2">
        <Link href="/dashboard">
          <LuLayoutDashboard
            size={20}
            color={pathname === "/dashboard" ? "#6C3FEE" : "#000"}
          />
        </Link>
        <Link href="/dashboard/checklists">
          <TbChecklist
            size={20}
            color={pathname === "/dashboard/checklists" ? "#6C3FEE" : "#000"}
          />
        </Link>
        <Link href="/dashboard/monitors">
          <HiUsers
            size={20}
            color={pathname === "/dashboard/monitors" ? "#6C3FEE" : "#000"}
          />
        </Link>
        <Link href="/dashboard/subscriptions">
          <BiWallet
            size={20}
            color={pathname === "/dashboard/subscriptions" ? "#6C3FEE" : "#000"}
          />
        </Link>
      </div>
    );
  }

  return (
    <>
      <nav className="w-full lg:hidden flex justify-between border-b items-center py-3 gap-1 px-1">
        <Options />
        <p className="text-xs">Kimpact Development Initiative</p>
      </nav>
      <nav className="w-full h-20 bg-white shadow-md flex items-center p-3 justify-between lg:flex hidden">
        <div className="flex items-center justify-center gap-5">
          <AiOutlineMenu size={35} className="hover:cursor-pointer" />
          <div className="w-3/2">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border w-50 p-3 rounded-lg bg-[#f5f5f5]"
              placeholder="Quick Search"
            />
          </div>
        </div>
        <div className="w-fit">
          <p className="inline-flex items-center gap-2 hover:cursor-pointer">
            Kimpact Development Initiative <AiFillCaretDown size={15} />
          </p>
        </div>
      </nav>
    </>
  );
}
