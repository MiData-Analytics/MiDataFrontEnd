import Head from "next/head";
import { DashboardLayout } from "@/layouts/Dashboard";
import Link from "next/link";
import Image from "next/image";
import { MonitorAccessList } from "@/components/Dashboard/Access/MonitorList";
import { Checklist } from "@/components/Dashboard/Access/Checklist";

export default function ChecklistAccess() {
  return (
    <DashboardLayout>
      <Head>
        <title>MiData | Checklist Access</title>
      </Head>
      <div className="sm:p-10 p-0 space-y-2">
        <h3 className="font-bold text-3xl text-[#4E4E4E]">Checklist Access</h3>

        <div className="w-11/12 border min-h-[70vh] rounded-xl flex  shadow-md justify-center items-stretch">
          <div className="w-[40%] min-h-full border-r rounded-l-xl flex flex-col justify-between bg-[#FBFAFA]">
            <Checklist />
            <div className="w-full flex justify-end p-3">
              <Link href="/dashboard/checklists">
                <Image
                  src="/icons/add_fab.svg"
                  width={80}
                  height={80}
                  alt="Add Icon"
                />
              </Link>
            </div>
          </div>
          <div className="w-full min-h-full bg-white p-3 rounded-t-xl flex flex-col justify-between">
            <MonitorAccessList />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
