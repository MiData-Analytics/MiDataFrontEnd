import { useState } from "react";
import Head from "next/head";
import Layout from "@/layouts/Main";
import { Button } from "@/components/Button";

export default function ForgotPassword() {
  const [emailAddress, setEmailAddress] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <Layout>
      <Head>
        <title>MiData | Forgot Password?</title>
      </Head>
      <section className="flex justify-center py-20 flex-col items-center bg-[#F5F5F5] gap-2 w-full">
        <div className="flex flex-col items-center text-center gap-y-2 w-full">
          <h1 className="text-5xl font-bold text-[#5A3FA2]">
            Forgot Password?
          </h1>
          <p className="text-sm mx-auto sm:w-[65%] w-full">
            Reset your password by providing your email below
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col items-center w-full gap-2">
            <label htmlFor="emailAddress" className="font-bold text-xl">
              Email
            </label>
            <input
              type="email"
              name="emailAddress"
              id="emailAddress"
              className="w-full border rounded-full text-center p-2"
              onChange={(e) => setEmailAddress(e.target.value)}
            />
            <p>{}</p>
            <div className="flex justify-center">
              <Button type="submit">Reset</Button>
            </div>
          </div>
        </form>
      </section>
    </Layout>
  );
}
