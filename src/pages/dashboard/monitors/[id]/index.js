import { useState, useEffect } from "react";
import { DashboardLayout } from "@/layouts/Dashboard";
import Head from "next/head";
import axios from "axios";
import { useCookie } from "@/hooks/useCookie";
import { urls } from "@/utils/urls";
import { useRouter } from "next/router";
import Toast from "awesome-toast-component";
import { TailSpin } from "react-loader-spinner";
import country from "locations-ng";

export default function Monitor() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    lga: "",
    emailAddress: "",
    phoneNumber: "",
    contactDetails: "",
  });
  const [loading, setLoading] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const { token } = useCookie();
  const { push, query } = useRouter();

  const states = country.state.all();
  const [lgaOption, setLGAOption] = useState([]);

  useEffect(() => {
    setLGAOption(country.lga.lgas(formData.state));
  }, [formData.state]);

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get(`${urls.getMonitorById}${query.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          const {
            firstName,
            lastName,
            phoneNumber,
            contactDetails,
            lga,
            state,
            emailAddress,
          } = response.data;

          setFormData((prevData) => ({
            ...prevData,
            firstName: firstName,
            lastName: lastName,
            phoneNumber: phoneNumber,
            contactDetails: contactDetails,
            lga: lga,
            state: state,
            emailAddress: emailAddress,
          }));
        }
      } catch (error) {
        new Toast("Failed to retrieve data on this user...");
        setBtnDisabled(false);
      }
    }

    getData();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    new Toast("Updating Monitor...");

    try {
      setLoading(true);
      const response = await axios.patch(
        `${urls.updateMonitor}${query.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setLoading(false);
        new Toast(
          "Successfully Updated Monitor... Redirecting to Monitor List...",
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
          new Toast("Server failed to update monitor");
        }
      }

      if (error && !error.response) {
        new Toast(
          "Server is Unavailable at this time... Please Try again later..."
        );
      }

      console.error(error);

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
        <title>MiData | Edit Monitor Information</title>
      </Head>
      <div className="w-full p-5">
        <h3 className="font-bold text-3xl text-[#4E4E4E]">Update Monitor</h3>
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
              <select
                className="w-full border rounded-md p-2 placeholder:text-black placeholder:font-thin"
                name="state"
                id="state"
                onChange={handleChange}
                value={formData.state}
              >
                State
                {states.map((state, index) => {
                  return (
                    <option value={state.name} key={index}>
                      {state.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="flex flex-col items-center w-full">
              <select
                className="w-full border rounded-md p-2 placeholder:text-black placeholder:font-thin"
                name="lga"
                id="lga"
                onChange={handleChange}
                value={formData.lga}
              >
                Local Government Area
                {lgaOption.map((lga, index) => {
                  return (
                    <option value={lga} key={index}>
                      {lga}
                    </option>
                  );
                })}
              </select>
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
              <button
                className="bg-[#6C3FEE] py-4 px-7 text-white rounded-md disabled:bg-gray-800"
                disabled={btnDisabled}
              >
                {loading ? (
                  <TailSpin color="#fff" width={15} height={15} />
                ) : (
                  "Update Monitor"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}
