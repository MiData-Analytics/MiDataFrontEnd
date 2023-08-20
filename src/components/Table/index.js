import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const TableRow = ({
  serialNumber,
  firstName,
  lastName,
  contactNumber,
  email,
  state,
  lga,
  dateAdded,
  onEdit,
  onDelete,
  isGrey,
}) => {
  const rowBackground = isGrey ? "bg-gray-100" : "bg-white";

  return (
    <tr className={`${rowBackground} text-center`}>
      <td className="px-4 py-2">{serialNumber}</td>
      <td className="px-4 py-2">
        {firstName} {lastName}
      </td>
      <td className="px-4 py-2">{contactNumber}</td>
      <td className="px-4 py-2">{email}</td>
      <td className="px-4 py-2">{state}</td>
      <td className="px-4 py-2">{lga}</td>
      <td className="px-4 py-2">{dateAdded}</td>
      <td className="px-4 py-2 space-x-2 ">
        <div className="flex items-center justify-center gap-3">
          <button onClick={onEdit}>
            <FaEdit
              className="text-blue-500 hover:text-blue-700 cursor-pointer"
              color="#6C3FEE"
            />
          </button>
          <button onClick={onDelete}>
            <FaTrash className="text-red-500 hover:text-red-700 cursor-pointer" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default TableRow;
