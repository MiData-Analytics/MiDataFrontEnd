import Layout from "@/layouts/Monitor";
import Head from "next/head";

export default function RecievedResponse() {
  return (
    <Layout>
      <Head>
        <title>MiData | Response Received</title>
      </Head>
      <div className="h-[95vh] w-full bg-[#ECE5FF]">
        <div className="space-y-5">
          <h1 className="text-primary font-extrabold text-5xl text-center mt-5">
            Response
            <br /> Received
          </h1>
          <p className="text-center">
            Create, edit and access your checklists, from anywhere around the
            world, With 0ver 3million users, MiData has gained a lot of
            credibility among organizations.
          </p>
        </div>
      </div>
    </Layout>
  );
}
