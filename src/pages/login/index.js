import { useState } from "react";
import Head from "next/head";
import Layout from "@/layouts/Main";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Link from "next/link";
import { Button } from "@/components/Button";
import axios from "axios";
import { urls } from "@/utils/urls";
import Toast from "awesome-toast-component";
import { Divider } from "@/components/Divider";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";

export default function Login() {
  const [formData, setFormData] = useState({
    emailAddress: "",
    password: "",
  });
  const [clearPassword, setClearPassword] = useState("password");
  const { push } = useRouter();
  const [cookies, setCookie] = useCookies(["token"]);

  function clearFields() {
    setFormData({ ...formData, emailAddress: "", password: "" });
  }

  async function handleSubmit(e) {
    new Toast("Attempting Login...");
    e.preventDefault();

    try {
      const res = await axios.post(urls.login, formData);

      if (res.status === 200) {
        setCookie("token", res.data.token, {
          path: "/",
          maxAge: 3600 * 24 * 30, // 30 days
          sameSite: true,
        });

        new Toast("Login Successful", {
          timeout: 5000,
        });
        push("/dashboard");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          new Toast("Incorrect Email/Password, Please try Again", {
            timeout: 5000,
          });
        }

        if (error.response.status === 500) {
          new Toast("Server Error", {
            timeout: 5000,
          });
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
    const name = e.target.name;
    const value = e.target.value;

    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  }

  return (
    <Layout>
      <Head>
        <title>MiData | Login</title>
      </Head>

      <section className="flex justify-center py-10 flex-col items-center bg-[#F5F5F5]">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-5xl font-bold text-[#5A3FA2]">Welcome Back</h1>
          <p className="text-sm mx-auto sm:w-[65%] w-full">
            MiData, a fast, flexible, and user-friendly platform, allowing you
            focus on what matters most: your data.
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="my-2 space-y-3 sm:w-[380px] w-full p-2"
        >
          <div className="flex flex-col items-center w-full">
            <label htmlFor="emailAddress" className="font-bold text-xl">
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
            <label htmlFor="password" className="font-bold text-xl">
              Password
            </label>
            <input
              type={clearPassword}
              name="password"
              id="password"
              className="p-2 w-full border rounded-full text-center"
              onChange={handleChange}
              value={formData.password}
              required
            />
            {clearPassword === "password" ? (
              <FiEyeOff
                size={25}
                className="mr-3 hover:cursor-pointer absolute right-0 top-9"
                onClick={() => setClearPassword("text")}
              />
            ) : (
              <FiEye
                size={25}
                className="mr-3 hover:cursor-pointer absolute right-0 top-9"
                onClick={() => setClearPassword("password")}
              />
            )}
          </div>
          <div className="flex justify-center">
            <Button type="submit">Login</Button>
          </div>
          <div className="flex justify-end">
            <Link href="/forgot_password" className="text-sm underline">
              Forgot Password?
            </Link>
          </div>
          <Divider color="text-black" />
          <div className="flex w-full justify-center">
            <button
              className="bg-white rounded-full w-full text-black inline-flex justify-center items-center p-2 gap-1 font-semibold"
              type="button"
            >
              <FcGoogle size={25} />
              Sign In with Google
            </button>
          </div>
        </form>
      </section>
    </Layout>
  );
}
