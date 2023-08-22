import Image from "next/image";
import { AiFillCaretDown } from "react-icons/ai";

export const Header = ({ title, description, coverImgURL, handleChange }) => {
  return (
    <div className="sm:w-[65%] w-full rounded-lg shadow-md h-[30vh]">
      <div className="h-[4vh] rounded-t-lg bg-[#6C3FEE]"></div>
      <div className={`flex flex-col p-5 h-full w-full`}>
        <div className="flex flex-row justify-between w-full">
          <div className="flex flex-col ">
            <input
              type="text"
              placeholder="New Checklist"
              name="title"
              className="outline-none placeholder:text-2xl text-2xl"
              value={title}
              onChange={handleChange}
            />
            <textarea
              name="description"
              className="outline-none placeholder:font-thin resize-none"
              cols="30"
              rows="3"
              placeholder="Checklist description"
              value={description}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="flex flex-col items-end hover:cursor-pointer">
            <Image
              src="/icons/gallery.svg"
              alt="Gallery"
              width={30}
              height={30}
            />
            <h3 className="text-[#AAAAAA] text-right">Add Cover Image</h3>
          </div>
        </div>
        <div className="flex flex-row justify-start gap-x-5 w-full">
          <div className="flex items-center gap-x-2 text-[#AAAAAA] hover:cusor-pointer">
            <Image src="/icons/clock.svg" alt="Clock" width={18} height={18} />
            Set Deadline
          </div>
          <div className="flex items-center gap-x-2 text-[#AAAAAA] hover:cusor-pointer">
            <AiFillCaretDown size={18} color="black" />
            Set Deadline
          </div>
        </div>
      </div>
    </div>
  );
};
