import { useState } from "react";
import { useGetChecklists, useGetChecklist } from "@/hooks/useGetChecklists";
import Link from "next/link";
import {
  BsFillCaretRightSquareFill,
  BsFillCaretLeftSquareFill,
} from "react-icons/bs";
import { useRouter } from "next/router";

export function Checklist() {
  const { query, push } = useRouter();
  const {
    checklists,
    isError: checklistsError,
    isLoading: checklistsLoading,
  } = useGetChecklists();
  const { checklist, isError, isLoading } = useGetChecklist(query.id);
  const [selectedChecklist, setSelectedChecklist] = useState(checklist);

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = checklists?.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(checklists?.length / itemsPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };


  return (
    <div>
      <h4 className="font-semibold text-2xl text-[#4E4E4E] text-center  mt-2">
        My Checklists
      </h4>
      <div className="w-full flex justify-end items-center mt-3 gap-x-3 text-[#666666] font-semibold px-1">
        <div>
          {indexOfFirstItem + 1} -{" "}
          {Math.min(indexOfLastItem, checklists?.length)} of{" "}
          {checklists?.length} items
        </div>
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
      </div>
      <div className="flex flex-col gap-y-2 items-end mt-6">
        {currentItems?.map((checklist, index) => {
          const id = query?.id;

          if (checklist.id === id) {
            return (
              <Link
                href={`/dashboard/checklists/access/${checklist.id}`}
                key={index}
                className="w-5/6 border-t border-b border-l rounded-l-lg py-3 px-2 font-semibold text-[#6C3FEE] bg-white"
              >
                {checklist.title}
              </Link>
            );
          }
          return (
            <Link
              key={index}
              href={`/dashboard/checklists/access/${checklist.id}`}
              className="w-5/6 py-3 px-2 font-semibold text-[#6C3FEE]"
            >
              {checklist.title}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
