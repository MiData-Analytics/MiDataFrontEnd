import { useState, useEffect } from "react";
import Layout from "@/layouts/Monitor";
import Head from "next/head";
import { useGetMonitor } from "@/hooks/useGetMonitors";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { useRouter } from "next/router";
import Toast from "awesome-toast-component";
import { TailSpin } from "react-loader-spinner";

export default function Monitor() {
  const { monitor, isLoading, isError } = useGetMonitor();
  const [dropdown, setDropdown] = useState(false);
  const [selection, setSelection] = useState();
  const [checklistId, setChecklistId] = useState();
  const { push } = useRouter();

  function handleSelection(checklist) {
    setSelection(checklist.title);
    setChecklistId(checklist.id);
  }

  function loadForm() {
    if (!checklistId) {
      new Toast("Select a form");
      return;
    }
    push(`/dashboard/monitor/response/${checklistId}`);
  }

  return (
    <Layout userType="" userData={monitor}>
      <Head>
        <title>MiData | Monitor Dashboard</title>
      </Head>
      <div className="w-full h-[100vh] bg-[#583E9C]">
        <div className="flex items-center justify-start flex-col">
          <h1 className="text-white text-center text-5xl font-extrabold mt-10">
            Welcome
          </h1>
          {isLoading ? (
            <TailSpin height={25} width={25} color="white" />
          ) : (
            <p className="text-white text-4xl font-semibold">
              {monitor?.firstName} {monitor?.lastName}
            </p>
          )}
          <p className="text-white mt-10 mb-1">
            Select the form assigned to you
          </p>
          <div className="w-full flex justify-center">
            <div
              className="bg-white w-[280px] inline-flex items-center justify-between p-1 rounded-full cursor-pointer relative"
              onClick={() => setDropdown(!dropdown)}
            >
              {selection ? selection : "Select Form"}{" "}
              {dropdown ? <AiFillCaretUp /> : <AiFillCaretDown />}
              {dropdown && (
                <div className="w-full bg-white h-fit flex flex-col gap-y-3 items-start justify-between absolute top-10 left-0 shadow-lg border rounded-md">
                  {monitor.checklists.map((checklist, index) => {
                    return (
                      <div
                        key={index}
                        className="hover:text-white hover:bg-primary w-full h-fit py-2"
                        onClick={() => handleSelection(checklist)}
                      >
                        {checklist.title}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
          <p className="text-white w-[300px] text-center mt-16">
            Create, edit and access your checklists, from anywhere around the
            world, With over 3million users, MiData has gained a lot of
            credibility among organizations.
          </p>
          <div className="mt-10" onClick={loadForm}>
            <button className="bg-white px-5 py-3 text-primary rounded-lg font-bold">
              Get started
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
