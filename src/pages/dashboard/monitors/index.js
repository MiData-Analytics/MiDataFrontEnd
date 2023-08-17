import { DashboardLayout } from "@/layouts/Dashboard";
import Head from "next/head";

export default function Monitors() {
  return (
    <DashboardLayout>
      <Head>
        <title>MiData | Monitors</title>
      </Head>
      <div>Dashboard Monitors</div>
    </DashboardLayout>
  );
}
