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
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";

export default function SignUp() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    emailAddress: "",
    password: "",
  });
  const [clearPassword, setClearPassword] = useState("password");
  const [errors, setErrors] = useState([]);
  const [cookies, setCookie] = useCookies(["token"]);
  const { push } = useRouter();

  const clearFields = () => {
    setFormData({ ...formData, password: "" });
  };

  const validatePassword = () => {
    const { password } = formData;
    const errors = [];

    if (password.length < 6 || password.length > 25) {
      errors.push("Password must be between 6 and 25 characters.");
    }

    if (!/[A-Z]/.test(password)) {
      errors.push("Password must contain at least one uppercase letter.");
    }

    if (!/[a-z]/.test(password)) {
      errors.push("Password must contain at least one lowercase letter.");
    }

    if (!/\d/.test(password)) {
      errors.push("Password must contain at least one number.");
    }

    if (!/[!@#$%^&*]/.test(password)) {
      errors.push("Password must contain at least one symbol (!@#$%^&*).");
    }

    return errors;
  };

  async function handleSubmit(e) {
    e.preventDefault();

    const validationErrors = validatePassword();
    setErrors(validationErrors);

    if (validationErrors.length === 0) {
      try {
        new Toast("Registering User...");
        const res = await axios.post(urls.signup, formData);

        if (res.status === 201) {
          setCookie("token", res.data.token, {
            path: "/",
            maxAge: 3600 * 24 * 30, // 30 days
            sameSite: true,
          });

          new Toast("Sign Up Successful... Redirecting to Dashboard", {
            timeout: 5000,
          });
          push("/dashboard");
        }
      } catch (error) {
        console.error(error);
        if (error.response) {
          if (error.response.status === 400) {
            new Toast("Email/Password can't be empty", {
              timeout: 5000,
            });
          }

          if (error.response.status === 500) {
            new Toast("Server Error", {
              timeout: 5000,
            });
          }

          if (error.response.status === 409) {
            new Toast("User with this Email already exists", {
              timeout: 5000,
            });
          }
        }

        new Toast("Server Error");
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

      <section className="flex justify-center py-10 flex-col items-center bg-[#5D43A9] text-white">
        <div className="flex flex-col items-center text-center gap-3">
          <h1 className="text-5xl font-bold">Create your account.</h1>
          <p className="text-sm mx-auto sm:w-[65%] w-full">
            Create your first checklist in seconds. Fast, flexible, and
            user-friendly, so you can focus on what matters most: your data.
          </p>
          <p className="font-bold text-xl">
            Already a user?{" "}
            <Link href="/login" className="underline leading-5">
              Login
            </Link>
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="my-2 space-y-3 sm:w-[380px] w-full p-2"
        >
          <div className="flex flex-col items-center w-full">
            <label htmlFor="firstName" className="font-bold text-xl">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              className="w-full border rounded-full text-center p-2 text-black"
              onChange={handleChange}
              value={formData.firstName}
              required
            />
          </div>
          <div className="flex flex-col items-center w-full">
            <label htmlFor="lastName" className="font-bold text-xl">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              className="w-full border rounded-full text-center p-2 text-black"
              onChange={handleChange}
              value={formData.lastName}
              required
            />
          </div>
          <div className="flex flex-col items-center w-full">
            <label htmlFor="emailAddress" className="font-bold text-xl">
              Email
            </label>
            <input
              type="email"
              name="emailAddress"
              id="emailAddress"
              className="w-full border rounded-full text-center p-2 text-black"
              onChange={handleChange}
              value={formData.emailAddress}
              required
            />
          </div>
          <div className="relative flex flex-col items-center w-full">
            <label htmlFor="password" className="font-bold text-xl">
              Create Password
            </label>
            <input
              type={clearPassword}
              name="password"
              id="password"
              className="p-2 w-full border rounded-full text-center text-black"
              value={formData.password}
              onChange={handleChange}
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
          {errors.length > 0 && (
            <div>
              <ul>
                {errors.map((error, index) => (
                  <li key={index} className="text-white text-center">
                    {error}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="flex justify-center">
            <Button type="submit">Create Account</Button>
          </div>
          <div className="flex justify-end">
            <Link href="/forgot_password" className="text-sm underline">
              Forgot Password?
            </Link>
          </div>
          <Divider color="text-white" />
          <div className="flex w-full justify-center">
            <button
              className="bg-white rounded-full w-full text-black inline-flex justify-center items-center p-2 gap-1 font-semibold"
              type="button"
            >
              <FcGoogle size={25} />
              Sign Up with Google
            </button>
          </div>
          <p className="text-center text-sm">
            By signing up, you are creating a MiData account, and you agree to
            MiData{" "}
            <Link href="/terms" className="underline">
              Terms of Use
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="underline">
              Privacy Policy
            </Link>
          </p>
        </form>
      </section>
    </Layout>
  );
}
