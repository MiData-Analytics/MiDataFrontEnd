import Head from "next/head";
import Layout from "@/layouts/Main";
import { Collaborate } from "@/components/Collaborate";
import { DataReport } from "@/components/DataReport";
import { Hero } from "@/components/Hero";

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>MiData | Landing Page</title>
      </Head>
      <Hero />
      <DataReport />
      <Collaborate />
    </Layout>
  );
}
