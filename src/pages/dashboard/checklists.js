import { useState } from "react";
import { DashboardLayout } from "@/layouts/Dashboard";
import Head from "next/head";
import { CheckListSearch,CheckListFilter } from "@/components/Dashboard";

export default function Checklists() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <DashboardLayout>
      <Head>
        <title>MiData | Checklists</title>
      </Head>
      <div className="w-full">
        <div className="flex justify-between w-full gap-2">
          <CheckListSearch
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
          <CheckListFilter />
        </div>
      </div>
    </DashboardLayout>
  );
}
