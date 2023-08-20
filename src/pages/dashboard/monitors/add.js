import { useState } from "react";
import { DashboardLayout } from "@/layouts/Dashboard";
import Head from "next/head";
import axios from "axios";
import { useCookie } from "@/hooks/useCookie";
import { urls } from "@/utils/urls";
import { useRouter } from "next/router";
import Toast from "awesome-toast-component";
import { TailSpin } from "react-loader-spinner";

export default function AddMonitor() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    lga: "",
    emailAddress: "",
    phoneNumber: "",
    contactDetails: "",
  });
  const [loading, setLoading] = useState(false);
  const { token } = useCookie();
  const { push } = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    new Toast("Creating New Monitor...");

    try {
      setLoading(true);
      const response = await axios.post(urls.createMonitor, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        setLoading(false);
        new Toast(
          "Successfully Created a new Monitor... Redirecting to Monitor List...",
          {
            afterHide: () => push("/dashboard/monitors"),
          }
        );
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          new Toast("Unauthorized Access...");
        }

        if (error.response.status === 409) {
          new Toast("Monitor with Email Address/Phone Number already exists");
        }

        if (error.response.status === 500) {
          new Toast("Server failed to add monitor to database");
        }
      }

      if (error && !error.response) {
        new Toast(
          "Server is Unavailable at this time... Please Try again later..."
        );
      }

      console.error(error)

      setLoading(false);
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

  const handlePhoneNumberChange = (event) => {
    let inputNumber = event.target.value;
    // Remove all non-numeric characters from the input
    inputNumber = inputNumber.replace(/\D/g, "");
    // Check if the input number already starts with +234 (international format)
    if (!inputNumber.startsWith("234") && inputNumber.length === 11) {
      // Convert the input number to international format (+234)
      inputNumber = `234${inputNumber.slice(1)}`;
    }
    setFormData({ ...formData, phoneNumber: inputNumber });
  };

  return (
    <DashboardLayout>
      <Head>
        <title>MiData | Add Monitor</title>
      </Head>
      <div className="w-full p-5">
        <h3 className="font-bold text-3xl text-[#4E4E4E]">
          Create New Monitor
        </h3>
        <div className="w-full">
          <form
            onSubmit={handleSubmit}
            className="my-2 space-y-3 sm:w-[380px] w-full p-2"
          >
            <div className="flex flex-col items-center w-full">
              <input
                type="text"
                name="firstName"
                id="firstName"
                className="w-full border rounded-md p-2 placeholder:text-black placeholder:font-thin"
                placeholder="First Name"
                onChange={handleChange}
                value={formData.firstName}
                required
              />
            </div>
            <div className="flex flex-col items-center w-full">
              <input
                type="text"
                name="lastName"
                id="lastName"
                className="w-full border rounded-md p-2 placeholder:text-black placeholder:font-thin"
                placeholder="Last Name"
                onChange={handleChange}
                value={formData.lastName}
                required
              />
            </div>
            <div className="flex flex-col items-center w-full">
              <input
                type="text"
                name="lga"
                id="lga"
                className="w-full border rounded-md p-2 placeholder:text-black placeholder:font-thin"
                placeholder="Local Government Area"
                onChange={handleChange}
                value={formData.lga}
                required
              />
            </div>
            <div className="flex flex-col items-center w-full">
              <input
                type="email"
                name="emailAddress"
                id="emailAddress"
                className="w-full border rounded-md p-2 placeholder:text-black placeholder:font-thin"
                placeholder="Email Address"
                onChange={handleChange}
                value={formData.emailAddress}
                required
              />
            </div>
            <div className="flex flex-col items-center w-full">
              <input
                type="text"
                name="phoneNumber"
                id="phoneNumber"
                className="w-full border rounded-md p-2 placeholder:text-black placeholder:font-thin"
                placeholder="Phone Number"
                onChange={handlePhoneNumberChange}
                value={formData.phoneNumber}
                required
              />
            </div>
            <textarea
              value={formData.contactDetails}
              onChange={handleChange}
              id="contactDetails"
              name="contactDetails"
              placeholder="Contact Details"
              className="w-full px-3 py-2 border rounded-lg resize-none placeholder:text-black placeholder:font-thin"
              rows={7}
            ></textarea>
            <div>
              <button className="bg-[#6C3FEE] py-4 px-7 text-white rounded-md">
                {loading ? (
                  <TailSpin color="#fff" width={15} height={15} />
                ) : (
                  "Add Monitor"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}
