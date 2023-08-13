import Head from "next/head";
import axios from "axios";
import Layout from "@/layouts/Main";
import { useRouter } from "next/router";

export default function EmailVerifyPage() {
  const { query } = useRouter();


  return (
    <Layout>
      <Head>
        <title>MiData | Email Verification</title>
      </Head>
    </Layout>
  );
}
