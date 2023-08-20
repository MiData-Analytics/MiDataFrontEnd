import axios from "axios";
import React, { useState } from "react";
import { countries } from "country-data-list";
import { urls } from "@/utils/urls";
import { TailSpin } from "react-loader-spinner";
import Toast from "awesome-toast-component";
import { useCookie } from "@/hooks/useCookie";

export const Modal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    userType: "",
    orgName: "",
    organizationDescription: "",
    nationality: "",
  });
  const [loading, setLoading] = useState(false);
  const { token } = useCookie();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    new Toast("Updating User Profile...");

    try {
      const res = await axios.post(urls.updateProfile, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200) {
        onClose();
        setLoading(false);
        new Toast("Successfully updated profile...")
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      new Toast("User Profile Update Failed...");
    }
  };

  return (
    <div
      className={`fixed ${isOpen ? "block" : "hidden"} inset-0 overflow-y-auto`}
    >
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:text-left">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Profile Update
                </h3>
                <p>
                  We are going to need a little more info before you get to use
                  MiData
                </p>
                <div className="mt-2">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <label
                        htmlFor="userType"
                        className="block text-gray-700 text-sm font-bold mb-2"
                      >
                        User Type
                      </label>
                      <select
                        value={formData.userType}
                        id="userType"
                        onChange={(e) =>
                          setFormData({ ...formData, userType: e.target.value })
                        }
                        className="w-full px-3 py-2 border rounded-lg"
                        required
                      >
                        <option value="">Choose User Type</option>
                        <option value="Non-Profit Organization">
                          Non-Profit Organization
                        </option>
                        <option value="Commercial Organization">
                          Commercial Organization
                        </option>
                        <option value="Independent Researcher">
                          Independent Researcher
                        </option>
                        <option value="Student">Student</option>
                      </select>
                    </div>
                    {formData.userType === "Non-Profit Organization" ||
                    formData.userType === "Commercial Organization" ? (
                      <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                          Organization Name
                        </label>
                        <input
                          type="text"
                          value={formData.orgName}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              orgName: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border rounded-lg"
                        />
                      </div>
                    ) : null}
                    {formData.userType === "Non-Profit Organization" ||
                    formData.userType === "Commercial Organization" ? (
                      <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                          Organization Description
                        </label>
                        <textarea
                          value={formData.organizationDescription}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              organizationDescription: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border rounded-lg"
                        ></textarea>
                      </div>
                    ) : null}
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="nationality"
                      >
                        Nationality
                      </label>
                      <select
                        name="nationality"
                        id="nationality"
                        className="w-full px-3 py-2 border rounded-lg relative"
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            nationality: e.target.value,
                          })
                        }
                      >
                        {countries.all.map((country, index) => (
                          <option key={index} className="absolute top-0">
                            {country.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="bg-primary text-white font-bold py-2 px-4 rounded-lg"
                      >
                        {loading ? (
                          <TailSpin height={15} width={15} />
                        ) : (
                          "Submit"
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
