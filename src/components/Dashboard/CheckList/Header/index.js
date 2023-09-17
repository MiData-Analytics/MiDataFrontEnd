import React, { useState } from "react";
import Image from "next/image";
import { AiFillCaretDown } from "react-icons/ai";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const Header = ({
  title,
  description,
  handleChange,
  handleCoverImg,
  imgUploadRef,
  checklistType,
  options,
  handleFormType,
  startDate,
  setDeadline,
}) => {
  const [selectDropdown, setSelectDropdown] = useState(false);

  return (
    <div
      className={`sm:w-[65%] w-full rounded-lg shadow-md max-h-[30vh] relative`}
    >
      <div className="h-[4vh] rounded-t-lg bg-[#6C3FEE] z-50 "></div>
      <div className={`flex flex-col p-5 h-full w-full z-10`}>
        <div className="flex flex-row justify-between w-full z-10">
          <div className="flex flex-col z-10">
            <input
              type="text"
              placeholder="New Checklist"
              name="title"
              className={`outline-none bg-transparent placeholder:text-2xl text-2xl z-10}`}
              value={title}
              onChange={handleChange}
            />
            <textarea
              name="description"
              className={`outline-none placeholder:font-thin resize-none z-10 bg-transparent`}
              cols="30"
              rows="3"
              placeholder="Checklist description"
              value={description}
              onChange={handleChange}
            ></textarea>
          </div>
          <label
            className="flex flex-col items-end hover:cursor-pointer"
            htmlFor="headerImg"
          >
            <input
              type="file"
              accept=".jpg"
              className="hidden"
              id="headerImg"
              onChange={handleCoverImg}
              ref={imgUploadRef}
            />
            <Image
              src="/icons/gallery.svg"
              alt="Gallery"
              width={30}
              height={30}
            />
            <h3 className={`text-right text-[#AAAAAA]`}>Add Cover Image</h3>
          </label>
        </div>
        <div className="flex sm:flex-row flex-col justify-start gap-x-5 w-full">
          <DatePicker
            selected={startDate}
            onChange={(date) => setDeadline(date)}
            className="w-28 z-30 p-2 border border-gray-300 rounded-md"
          />
          <label
            className="flex items-center gap-x-2 text-[#AAAAAA] hover:cursor-pointer"
            htmlFor="deadline"
          >
            <Image src="/icons/clock.svg" alt="Clock" width={18} height={18} />
            Set Deadline
          </label>
          <div
            className="flex items-center gap-x-2 text-[#AAAAAA] hover:cursor-pointer relative"
            onClick={() => setSelectDropdown(!selectDropdown)}
          >
            <AiFillCaretDown size={18} color="black" />
            {checklistType}
            {selectDropdown && (
              <div className="w-full absolute top-3 flex flex-col gap-y-2 bg-white p-3 z-20 shadow-md rounded-md">
                {options.map((option, index) => {
                  return (
                    <div
                      key={index}
                      onClick={() => {
                        handleFormType(option.value);
                        setSelectDropdown(false);
                      }}
                      className="text-primary "
                    >
                      {option.value}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
