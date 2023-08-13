import { DashboardLayout } from "@/layouts/Dashboard";
import Head from "next/head";

export default function Subscriptions() {
  return (
    <DashboardLayout>
      <Head>
        <title>MiData | Dashboard Home</title>
      </Head>
      <div>Dashboard Subscriptions</div>
    </DashboardLayout>
  );
}
