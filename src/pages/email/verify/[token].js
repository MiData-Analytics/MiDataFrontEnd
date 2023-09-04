import { useEffect, useState } from "react";
import Head from "next/head";
import axios from "axios";
import Layout from "@/layouts/Main";
import { useRouter } from "next/router";
import { urls } from "@/utils/urls";
import { TailSpin } from "react-loader-spinner";
import { Button } from "@/components/Button";
import Toast from "awesome-toast-component";

export default function EmailVerifyPage() {
  const { query, push } = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const [resendLoading, setResendLoading] = useState(false);
  const [emailAddress, setEmailAddress] = useState("");

  useEffect(() => {
    setLoading(true);
    const verifyEmail = async () => {
      try {
        const response = await axios.get(`${urls.verifyEmail}${query.token}`);
        setMsg(response.data.message);
        setLoading(false);
        push("/dashboard")
      } catch (error) {
        if (error.response) {
          setError(error.response.data.message.message);
          setLoading(false);
        }
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, []);

  async function resendEmail() {
    new Toast("Still in development");
  }

  return (
    <Layout>
      <Head>
        <title>MiData | Email Verification</title>
      </Head>
      <div className="flex justify-center items-center h-[40vh] flex-col gap-y-2">
        {loading ? (
          <TailSpin height={60} width={60} color="black" />
        ) : (
          <>
            <h1 className="font-bold text-3xl">
              {error === ""
                ? "Email Successfully Verified"
                : "Email Verification Failed"}
            </h1>
            <p>{error !== "" ? error : msg}</p>
            <Button onClick={resendEmail}>Resend Email</Button>
          </>
        )}
      </div>
    </Layout>
  );
}
