import { DashboardLayout } from "@/layouts/Dashboard";
import Head from "next/head";
import { AiFillCaretDown } from "react-icons/ai";
import { WorkBoard } from "@/components/Dashboard";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <Head>
        <title>MiData | Dashboard Home</title>
      </Head>
      <div className="flex items-center justify-between w-full">
        <h3 className="font-bold text-3xl text-[#4E4E4E]">Dashboard</h3>
        <div className="inline-flex items-center bg-[#D9D9D9] sm:w-60 w-32 justify-between rounded-md px-2 py-1 hover:cursor-pointer">
          Select Form
          <AiFillCaretDown size={15} />
        </div>
      </div>
      <WorkBoard />
    </DashboardLayout>
  );
}
