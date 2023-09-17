import Navbar from "@/components/Navbar";

export default function Layout({ children, userData }) {
  return (
    <div className="w-full h-full cursor-default flex flex-col items-center justify-between relative">
      <Navbar userData={userData} />
      {children}
      <div className="bg-[#583E9C] w-full absolute bottom-0 mt-3">
        <p className="text-center text-white">
          Copyright © {new Date().getFullYear()} MiData - All Rights Reserved
        </p>
      </div>
    </div>
  );
}
