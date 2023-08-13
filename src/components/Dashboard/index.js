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

export function Sidebar() {
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

  function NavLink({ url, title, icon }) {
    const [active, setActive] = useState(false);
    const { pathname } = useRouter();

    useEffect(() => {
      if (pathname.includes(url)) {
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
    <header className="w-72 border bg-white h-[100vh] flex flex-col items-center py-3 justify-start gap-10">
      <Image src="/logo/midata.png" alt="MiData Logo" height={57} width={196} />
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
    </header>
  );
}

export function Header() {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <nav className="w-full h-20 bg-white shadow-md flex items-center p-3 justify-between">
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
        <p className="inline-flex items-center gap-2 hover:cursor-pointer">Kimpact Development Initiative <AiFillCaretDown size={15} /></p>
      </div>
    </nav>
  );
}
