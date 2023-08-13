import { DashboardLayout } from "@/layouts/Dashboard";
import Head from "next/head";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <Head>
        <title>MiData | Dashboard Home</title>
      </Head>
      <div>Dashboard Home</div>
    </DashboardLayout>
  );
}
