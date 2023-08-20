import { useState } from "react";
import { DashboardLayout } from "@/layouts/Dashboard";
import Head from "next/head";
import { SearchBar, Filter } from "@/components/Dashboard";
import TableRow from "@/components/Table";
import { AiFillCaretDown } from "react-icons/ai";
import { BsPlusLg } from "react-icons/bs";
import Link from "next/link";
import { useGetMonitors } from "@/hooks/useGetMonitors";
import { useRouter } from "next/router";
import { urls } from "@/utils/urls";
import Toast from "awesome-toast-component";
import { useCookie } from "@/hooks/useCookie";
import axios from "axios";
import Image from "next/image";

export default function Monitors() {
  const [searchTerm, setSearchTerm] = useState("");
  const { monitors } = useGetMonitors();
  const { push, reload } = useRouter();
  const { token } = useCookie();

  function handleEdit(id) {
    push(`/dashboard/monitors/${id}`);
  }

  async function handleDelete(id) {
    try {
      const response = await axios.delete(`${urls.deleteMonitor}${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        new Toast("Successfully deleted Monitor account... Refreshing...", {
          afterHide: () => reload(),
        });
      }
    } catch (error) {
      if (error.response && error.response === 500) {
        new Toast(
          "There was a problem trying to delete that monitor... please try again later"
        );
      }

      if (error.response && error.response === 404) {
        new Toast(
          "Seems that MiData Monitor has already been deleted, please refresh the dashboard..."
        );
      }
    }
  }

  return (
    <DashboardLayout>
      <Head>
        <title>MiData | Monitors</title>
      </Head>
      <div className="w-full">
        <h3 className="font-bold text-3xl text-[#4E4E4E]">My Monitors</h3>
        <div className="flex justify-between w-full gap-2 mt-3">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <Filter />
        </div>
        <div className="flex justify-between my-5">
          <div></div>
          <Link href="/dashboard/monitors/add">
            <div>
              <button className="bg-[#6C3FEE] text-white flex items-center justify-center py-4 px-7 rounded-md gap-x-3">
                Add Monitor <BsPlusLg color="#fff" size={20} />
              </button>
            </div>
          </Link>
        </div>
        <div className="flex items-center justify-between w-full my-5">
          <p>
            We've found{" "}
            <span className="font-semibold text-primary">
              {monitors.length}
            </span>{" "}
            {monitors.length > 1 && "Monitors"}
            {monitors.length === 0 && "Monitors"}
          </p>

          <p className="flex items-center font-semibold gap-2 hover:cursor-pointer">
            Sort By:
            <span className="inline-flex items-center text-primary">
              Date
              <AiFillCaretDown size={15} color="#6C3FEE" />
            </span>
          </p>
        </div>
        {monitors.length === 0 ? (
          <div className="w-full flex items-center justify-end">
            <Link href="/dashboard/monitors/add">
              <Image
                src="/icons/add_fab.svg"
                width={80}
                height={80}
                alt="Add Icon"
              />
            </Link>
          </div>
        ) : (
          <>
            <div className="w-full overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="font-semibold">
                    <th className="px-4 py-2">S/N</th>
                    <th className="px-4 py-2">Full Name</th>
                    <th className="px-4 py-2">Contact Number</th>
                    <th className="px-4 py-2">Email</th>
                    <th className="px-4 py-2">Date Added</th>
                  </tr>
                </thead>
                <tbody className="max-h-[80vh]">
                  {monitors.map((monitor, index) => {
                    const fullName = `${monitor?.firstName?.toLowerCase()} ${monitor?.lastName?.toLowerCase()}`;
                    if (fullName.includes(searchTerm.toLocaleLowerCase())) {
                      return (
                        <TableRow
                          key={index}
                          serialNumber={index + 1}
                          firstName={monitor.firstName}
                          lastName={monitor.lastName}
                          contactNumber={monitor.phoneNumber}
                          email={monitor.emailAddress}
                          dateAdded={monitor.dateCreated}
                          onEdit={() => handleEdit(monitor.id)}
                          onDelete={() => handleDelete(monitor.id)}
                          isGrey={index % 2 === 0}
                        />
                      );
                    }
                  })}
                </tbody>
              </table>
            </div>
            <div className="w-full flex items-center justify-end">
              <Link href="/dashboard/monitors/add">
                <Image
                  src="/icons/add_fab.svg"
                  width={80}
                  height={80}
                  alt="Add Icon"
                />
              </Link>
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
