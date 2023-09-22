import { useState, useEffect } from "react";
import {
  MdOutlineCheckBoxOutlineBlank,
  MdOutlineCheckBox,
} from "react-icons/md";
import { IoMdCheckbox } from "react-icons/io";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  BsFillCaretRightSquareFill,
  BsFillCaretLeftSquareFill,
} from "react-icons/bs";
import { useGetMonitors } from "@/hooks/useGetMonitors";
import { TailSpin } from "react-loader-spinner";
import axios from "axios";
import Toast from "awesome-toast-component";
import { urls } from "@/utils/urls";
import { useCookie } from "@/hooks/useCookie";

export function MonitorAccessList() {
  const [selectAll, setSelectAll] = useState(false);
  const { query } = useRouter();
  const { monitors, isLoading: monitorsLoading, isError } = useGetMonitors();

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = monitors?.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(monitors?.length / itemsPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  function toggleAllMonitors() {
    setSelectAll(!selectAll);
  }

  return (
    <>
      <div>
        <h4 className="text-[#4E4E4E] text-2xl font-semibold">Monitors</h4>
        <div className="flex justify-end">
          <Link
            href={`/dashboard/form/preview/${query.id}`}
            className="py-1 sm:px-10 px-3 bg-[#2ACDA6]/40 flex justify-center gap-x-1 rounded-md text-[#444444]"
          >
            Preview Form
          </Link>
        </div>
        <p>Add and remove monitors access to your checklists</p>
        <div className="flex flex-col items-end w-full gap-y-3">
          <div className="flex gap-x-2">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <BsFillCaretLeftSquareFill />
            </button>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <BsFillCaretRightSquareFill />
            </button>
          </div>
          <div>
            {indexOfFirstItem + 1} -{" "}
            {Math.min(indexOfLastItem, monitors?.length)} of {monitors?.length}{" "}
            items
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col items-start h-[420px]">
        <div className="flex items-center justify-between w-full text-md border-b-2 text-[#666666] font-semibold mx-auto pb-2 scroll-smooth">
          <div className="flex items-center gap-x-10">
            {selectAll ? (
              <MdOutlineCheckBox
                size={20}
                color="#2AB514"
                onClick={toggleAllMonitors}
                className="hover:cursor-pointer"
              />
            ) : (
              <MdOutlineCheckBoxOutlineBlank
                size={20}
                onClick={toggleAllMonitors}
                color="#2AB514"
                className="hover:cursor-pointer"
              />
            )}
            <p>Name</p>
          </div>
          <p>Email</p>
          <p>Action</p>
        </div>
        <div className="flex flex-col items-center overflow-y-auto w-full p-1">
          {monitorsLoading ? (
            <TailSpin color="black" height={50} width={50} />
          ) : (
            <>
              {currentItems &&
                currentItems?.map((monitor, index) => {
                  return (
                    <Monitor
                      key={index}
                      monitor={monitor}
                      selectAll={selectAll}
                      toggleAllMonitors={toggleAllMonitors}
                    />
                  );
                })}
            </>
          )}
        </div>
      </div>
      <div>
        <h4 className="text-[#666666] font-semibold">Bulk Action</h4>
        <div className="flex gap-x-3 mt-3">
          <button
            className="bg-[#E7E7E7] font-thin px-3 py-1 rounded-lg inline-flex gap-x-2 justify-start items-center"
            onClick={() => {
              new Toast("Still in development...");
            }}
          >
            <Image
              src="/icons/addcircle.svg"
              alt="add icon"
              width={24}
              height={24}
            />
            Add
          </button>
          <button
            className="bg-[#E7E7E7] font-thin px-3 py-1 rounded-lg inline-flex gap-x-2 justify-start items-center"
            onClick={() => {
              new Toast("Still in development...");
            }}
          >
            <Image
              src="/icons/trash-monitor.svg"
              alt="trash icon"
              width={24}
              height={24}
            />
            Remove
          </button>
        </div>
      </div>
    </>
  );
}

export function Monitor({ monitor, selectAll, toggleAllFonitors }) {
  const [userAccess, setUserAccess] = useState(false);
  const [accessState, setAccessState] = useState(false);
  const { query } = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useCookie();

  function toggleTick() {
    setUserAccess(!userAccess);
  }

  async function changeAccess(checklistId, monitorId, status) {
    setIsLoading(true);
    try {
      const response = await axios.patch(
        urls.changeAccess,
        {
          checklist: checklistId,
          monitor: monitorId,
          accessStatus: status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setAccessState(status);
        setIsLoading(false);
      }
    } catch (error) {
      new Toast("Failed to update user access status");
      console.error(error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const checklistAccess = monitor?.checklistAccess;
    const checklist = checklistAccess.find(
      (checklist) => checklist.list === query?.id
    );

    setAccessState(checklist.hasAccess);
  }, [query?.id]);

  return (
    <div
      className={`flex items-center justify-between w-full text-md border-b-2 text-[#666666] font-semibold mx-auto pb-2 py-3 justify-self-center`}
    >
      <div className="flex items-center gap-x-10">
        {userAccess ? (
          <IoMdCheckbox
            size={20}
            color="#2AB514"
            onClick={toggleTick}
            className="hover:cursor-pointer"
          />
        ) : (
          <MdOutlineCheckBoxOutlineBlank
            size={20}
            onClick={toggleTick}
            color="#2AB514"
            className="hover:cursor-pointer"
          />
        )}
        <p>
          {monitor.firstName} {monitor.lastName}
        </p>
      </div>
      <p>{monitor.emailAddress}</p>
      <p>
        {accessState ? (
          <button
            className="bg-[#B53114] text-white font-thin px-3 py-1 rounded-lg inline-flex gap-x-2 justify-start items-center"
            onClick={() => changeAccess(query?.id, monitor?.id, false)}
            disabled={isLoading}
          >
            {isLoading ? (
              <TailSpin color="white" height={50} width={50} />
            ) : (
              <>
                <Image
                  src="/icons/remove-access.svg"
                  alt="trash icon"
                  width={24}
                  height={24}
                />
                Remove
              </>
            )}
          </button>
        ) : (
          <button
            className="bg-[#2AB514] text-white font-thin px-7 py-1 rounded-lg inline-flex gap-x-2 justify-start items-center"
            onClick={() => changeAccess(query?.id, monitor?.id, true)}
            disabled={isLoading}
          >
            {isLoading ? (
              <TailSpin color="white" height={50} width={50} />
            ) : (
              <>
                <Image
                  src="/icons/add-circle-access.svg"
                  alt="add icon"
                  width={24}
                  height={24}
                />
                Add
              </>
            )}
          </button>
        )}
      </p>
    </div>
  );
}
