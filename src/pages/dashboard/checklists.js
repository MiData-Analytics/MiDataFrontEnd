import { DashboardLayout } from "@/layouts/Dashboard";
import Head from "next/head";

export default function Checklists() {
  return (
    <DashboardLayout>
      <Head>
        <title>MiData | Checklists</title>
      </Head>
      <div>Dashboard Checklists page</div>
    </DashboardLayout>
  );
}
