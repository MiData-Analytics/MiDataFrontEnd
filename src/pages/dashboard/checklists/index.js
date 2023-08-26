import { useState } from "react";
import { DashboardLayout } from "@/layouts/Dashboard";
import Head from "next/head";
import { SearchBar, Filter } from "@/components/Dashboard";
import { CheckList } from "@/components/Dashboard/CheckList";
import Link from "next/link";
import { BsPlusLg } from "react-icons/bs";
import { AiFillCaretDown } from "react-icons/ai";

export default function Checklists() {
  const [searchTerm, setSearchTerm] = useState("");

  const checkList = [
    {
      title: "Early Warning Signs",
      monitors: 35,
      author: "Timmy Adeyeloja",
      percentageComplete: 90,
      daysRemaining: 3,
      status: "closed",
    },
    {
      title: "Tornado Alert",
      monitors: 10,
      author: "Timmy Adeyeloja",
      percentageComplete: 90,
      daysRemaining: 3,
      status: "open",
    },
    {
      title: "Training Data",
      monitors: 35,
      author: "Timmy Oladayo",
      percentageComplete: 90,
      daysRemaining: 10,
      status: "closed",
    },

    {
      title: "Early Warning Signs",
      monitors: 35,
      author: "Timmy Adeyeloja",
      percentageComplete: 90,
      daysRemaining: 3,
      status: "closed",
    },

  ];

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
          <Link href="/dashboard/checklists/create">
            <div>
              <button className="bg-[#6C3FEE] text-white flex items-center justify-center py-4 px-7 rounded-md gap-x-3">
                Create Checklist <BsPlusLg color="#fff" size={20} />
              </button>
            </div>
          </Link>
        </div>
        <div className="flex items-center justify-between w-full my-5">
          <p>
            We've found{" "}
            <span className="font-semibold text-primary">
              {checkList.length}
            </span>{" "}
            {checkList.length > 1 && "Checklists"}
            {checkList.length === 1 && "Monitor"}
            {checkList.length === 0 && "Checklists"}
          </p>

          <p className="flex items-center font-semibold gap-2 hover:cursor-pointer">
            Sort By:
            <span className="inline-flex items-center text-primary">
              Date
              <AiFillCaretDown size={15} color="#6C3FEE" />
            </span>
          </p>
        </div>
        <div className="flex flex-col gap-3 h-[55vh] overflow-y-auto">
          {checkList.map((checklist, index) => {
            const {
              title,
              monitors,
              author,
              percentageComplete,
              daysRemaining,
              status,
            } = checklist;

            if (title.toLowerCase().includes(searchTerm.toLowerCase())) {
              return (
                <CheckList
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
