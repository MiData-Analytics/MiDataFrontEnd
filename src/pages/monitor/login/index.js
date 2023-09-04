import Head from "next/head";
import axios from "axios";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Layout from "@/layouts/Monitor";
import { Button } from "@/components/Button";
import { urls } from "@/utils/urls";
import Toast from "awesome-toast-component";
import { TailSpin } from "react-loader-spinner";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";

export default function MonitorLogin() {
  const [formData, setFormData] = useState({
    emailAddress: "",
    uniqueCode: "",
  });
  const [clearPassword, setClearPassword] = useState("password");
  const userType = "";
  const [loading, setLoading] = useState(false);
  const { push } = useRouter();
  const [cookies, setCookie] = useCookies(["token"]);

  async function handleSubmit(e) {
    setLoading(false);
    e.preventDefault();
    try {
      const res = await axios.post(urls.monitorLogin, formData);
      if (res.status === 200) {
        setCookie("token", res.data.token, {
          path: "/",
          maxAge: 3600 * 24 * 30, // 30 days
          sameSite: true,
        });

        new Toast("Login Successful", {
          timeout: 5000,
        });
        push("/dashboard/monitor/form");
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
      if (error.response) {
        if (error.response.status === 400) {
          new Toast("There is no monitor with these credentials");
        }

        if (error.response.status === 401) {
          new Toast("Incorrect Email/Unique Code, Please try again. ");
        }
      }

      if (error && !error.response) {
        new Toast(
          "Server is Unavailable at this time... Please Try again later..."
        );
      }
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  return (
    <Layout userType={userType}>
      <Head>
        <title>MiData | Monitor Login</title>
      </Head>
      <div className="h-[95vh] w-full bg-[#583E9C] flex items-center justify-center py-[10rem]">
        <form
          onSubmit={handleSubmit}
          className="my-2 space-y-3 sm:w-[380px] w-full p-2"
        >
          <div className="flex flex-col items-center w-full">
            <label
              htmlFor="emailAddress"
              className="font-bold text-xl text-white"
            >
              Email
            </label>
            <input
              type="email"
              name="emailAddress"
              id="emailAddress"
              className="w-full border rounded-full text-center p-2"
              onChange={handleChange}
              value={formData.emailAddress}
              required
            />
          </div>
          <div className="relative flex flex-col items-center w-full">
            <label
              htmlFor="uniqueCode"
              className="font-bold text-xl text-white"
            >
              Unique Code
            </label>
            <input
              type={clearPassword}
              name="uniqueCode"
              id="uniqueCode"
              className="p-2 w-full border rounded-full text-center"
              onChange={handleChange}
              value={formData.uniqueCode}
              required
            />
            {clearPassword === "uniqueCode" ? (
              <FiEyeOff
                size={25}
                className="mr-3 hover:cursor-pointer absolute right-0 top-9"
                onClick={() => setClearPassword("text")}
              />
            ) : (
              <FiEye
                size={25}
                className="mr-3 hover:cursor-pointer absolute right-0 top-9"
                onClick={() => setClearPassword("uniqueCode")}
              />
            )}
          </div>

          <div className="flex justify-center">
            <Button type="submit">
              {loading ? (
                <TailSpin width={15} height={15} color="white" />
              ) : (
                "Proceed to Checklist"
              )}
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
