import { useState, useEffect } from "react";
import { DashboardLayout } from "@/layouts/Dashboard";
import Head from "next/head";
import { AiFillCaretDown } from "react-icons/ai";
import { WorkBoard } from "@/components/Dashboard";
import { Modal } from "@/components/Dashboard/Modal";
import { useGetProfile } from "@/hooks/useGetProfile";
import { useGetChecklists } from "@/hooks/useGetChecklists";

export default function Dashboard() {
  const [modal, setModal] = useState(false);
  const { userData } = useGetProfile();
  const { checklists, isError, isLoading } = useGetChecklists();
  const [selection, setSelection] = useState();
  const [showSelection, setShowSelection] = useState(false);

  const closeModal = () => {
    setModal(false);
  };

  useEffect(() => {
    if (userData.userType === "") {
      setModal(true);
    }
  }, [userData.userType]);

  const handleSelection = (checklist) => {
    setSelection(checklist.title);
    setShowSelection(false);
  };

  return (
    <DashboardLayout>
      <Head>
        <title>MiData | Dashboard Home</title>
      </Head>
      <div className="flex items-center justify-between w-full">
        <h3 className="font-bold text-3xl text-[#4E4E4E]">Dashboard</h3>
        <div
          className="inline-flex items-center bg-[#D9D9D9] sm:w-60 w-32 justify-between rounded-md px-2 py-1 hover:cursor-pointer relative"
          onClick={() => setShowSelection(!showSelection)}
        >
          {selection ? selection : "Select Form"}
          <AiFillCaretDown size={15} />
          {showSelection && (
            <div className="absolute top-8 left-0 bg-primary h-fit w-full flex flex-col items-first text-white justify-between z-20">
              {checklists.map((checklist, index) => {
                return (
                  <p
                    className="border-b w-full h-10 hover:bg-white hover:text-primary inline-flex justify-start pl-2 items-center"
                    key={index}
                    onClick={() => handleSelection(checklist)}
                  >
                    {checklist.title}
                  </p>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <Modal isOpen={modal} onClose={closeModal} />
      <WorkBoard />
    </DashboardLayout>
  );
}
