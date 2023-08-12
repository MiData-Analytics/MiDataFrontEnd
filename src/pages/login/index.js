import { useState } from "react";
import Head from "next/head";
import Layout from "@/layouts/Main";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Link from "next/link";
import { Button } from "@/components/Button";

export default function Login() {
  const [formData, setFormData] = useState({
    emailAddress: "",
    password: "",
  });
  const [clearPassword, setClearPassword] = useState("password");

  async function handleSubmit(e) {
    e.preventDefault()
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

      <section className="flex justify-center my-10 flex-col items-center">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-5xl font-bold text-[#5A3FA2]">Welcome Back</h1>
          <p className="sm:text-xl text-sm mx-auto sm:w-[65%] w-full">
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
            <Button
              type="submit"
            >
              Login
            </Button>
          </div>
          <div className="flex justify-end">
            <Link href="/forget" className="text-sm underline">
              Forget
            </Link>
          </div>
        </form>
      </section>
    </Layout>
  );
}
