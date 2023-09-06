import { useState } from "react";
import { DashboardLayout } from "@/layouts/Dashboard";
import Head from "next/head";
import { SearchBar, Filter } from "@/components/Dashboard";
import { CheckList } from "@/components/Dashboard/CheckList";
import Link from "next/link";
import { BsPlusLg } from "react-icons/bs";
import { AiFillCaretDown } from "react-icons/ai";
import axios from "axios";
import { useRouter } from "next/router";
import { useCookie } from "@/hooks/useCookie";
import { urls } from "@/utils/urls";
import Toast from "awesome-toast-component";
import { useGetChecklists } from "@/hooks/useGetChecklists";

export default function Checklists() {
  const [searchTerm, setSearchTerm] = useState("");
  const { push } = useRouter();
  const { token } = useCookie();
  const { checklists, isLoading, isError } = useGetChecklists();

  async function initializeChecklist() {
    new Toast("Initializing Checklist...");
    try {
      const res = await axios.post(
        urls.initializeChecklist,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 201) {
        const { id } = res.data;
        new Toast("Initialized Checklist...");
        push(`/dashboard/checklists/${id}`);
      }
    } catch (error) {
      new Toast("Failed to initialize checklist");
    }
  }

  return (
    <DashboardLayout>
      <Head>
        <title>MiData | Checklists</title>
      </Head>
      <div className="sm:p-10 p-0">
        <h3 className="font-bold text-3xl text-[#4E4E4E]">Checklists</h3>
        <div className="flex justify-between w-full gap-2">
          <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            placeholder={"Search by title"}
          />
          <Filter />
        </div>
        <div className="flex justify-between my-5">
          <div></div>
          <div>
            <button
              className="bg-[#6C3FEE] text-white flex items-center justify-center py-4 px-7 rounded-md gap-x-3"
              onClick={initializeChecklist}
            >
              Create Checklist <BsPlusLg color="#fff" size={20} />
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between w-full my-5">
          <p>
            We've found{" "}
            <span className="font-semibold text-primary">
              {checklists.length}
            </span>{" "}
            {checklists.length > 1 && "Checklists"}
            {checklists.length === 1 && "Checklist"}
            {checklists.length === 0 && "Checklists"}
          </p>

          <p className="flex items-center font-semibold gap-2 hover:cursor-pointer">
            Sort By:
            <span className="inline-flex items-center text-primary">
              Date
              <AiFillCaretDown size={15} color="#6C3FEE" />
            </span>
          </p>
        </div>
        <div className="flex flex-col gap-3 items-center w-full text-2xl">
          {checklists.length === 0 && (
            <div>You have no checklist at this time</div>
          )}
        </div>
        <div className="flex flex-col gap-3">
          {checklists.length !== 0 &&
            checklists.map((checklist, index) => {
              const {
                id,
                title,
                monitors,
                author,
                percentageComplete,
                daysRemaining,
                status,
              } = checklist;

              if (title?.toLowerCase().includes(searchTerm.toLowerCase())) {
                return (
                  <CheckList
                    id={id}
                    title={title}
                    monitors={monitors}
                    author={author}
                    percentageComplete={percentageComplete}
                    daysRemaining={daysRemaining}
                    status={status}
                    key={index}
                  />
                );
              }
            })}
        </div>
      </div>
    </DashboardLayout>
  );
}
