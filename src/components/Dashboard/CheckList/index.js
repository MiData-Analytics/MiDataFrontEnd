import Image from "next/image";
import Link from "next/link";
import { useState, useMemo } from "react";
import { BsFillPlusCircleFill } from "react-icons/bs";
import Toast from "awesome-toast-component";
import { RxBox } from "react-icons/rx";
import { BiUpload } from "react-icons/bi";
import { AiFillCalendar, AiFillClockCircle } from "react-icons/ai";

export const CheckList = ({
  title,
  monitors,
  author,
  percentageComplete,
  daysRemaining,
  status,
}) => {
  return (
    <div className="flex w-full mx-auto border rounded-md shadow-md justify-between p-3 hover:cursor-default sm:flex-row flex-col">
      <div className="flex flex-col gap-3 items-start justify-between">
        <div className="flex justify-between gap-3">
          <h3 className="text-2xl">{title}</h3>
          <Image
            src={`${
              status === "open"
                ? "/icons/checklistactive.svg"
                : "/icons/checklistclosed.svg"
            }`}
            width={20}
            height={20}
            alt="status"
          />
        </div>
        <div className="flex gap-2 w-full">
          <div className="py-1 sm:px-8 px-3 bg-[#AAAAAA] flex justify-center gap-x-1 rounded-md">
            <span className="text-primary font-medium">{monitors} </span>
            <span className="text-[#666666]">Monitors</span>
          </div>
          <Link
            href={``}
            className="py-1 sm:px-8 px-3 bg-[#2ACDA6] flex justify-center gap-x-1 rounded-md"
          >
            Preview Form
          </Link>
        </div>
      </div>
      <div className="flex flex-col sm:gap-3 gap-1 sm:text-right text-left">
        <span className="text-xl font-semibold text-[#666666]">
          {percentageComplete}% Complete
        </span>
        <span className="text-[#666666] font-medium">Created by {author}</span>
        <span className="text-primary font-semibold">
          {daysRemaining} days remaining
        </span>
      </div>
    </div>
  );
};

export const Choice = ({ removeRadioChoice }) => {
  const [multipleChoiceValue, setMultipleChoiceValue] = useState("Option");

  return (
    <div className="flex items-center cursor-pointer gap-x-2 justify-between w-full">
      <div className="flex justify-between gap-x-2 border-b">
        <div className="flex items-center gap-x-3">
          <Image src="/icons/drag.svg" alt="draggable" width={15} height={15} />
          <Image src="/icons/radio.svg" alt="select" width={15} height={15} />
          <input
            type="text"
            plsceholder="Answer"
            value={multipleChoiceValue}
            onChange={(e) => setMultipleChoiceValue(e.target.value)}
            className="outline-none w-full"
            unselectable
          />
        </div>
        <div>
          <Image
            src="/icons/gallery.svg"
            alt="gallery"
            width={30}
            height={30}
          />
        </div>
      </div>
      <Image
        src="/icons/cross.svg"
        alt="cross"
        width={30}
        height={30}
        onClick={removeRadioChoice}
      />
    </div>
  );
};

export const Option = ({ removeCheckbox }) => {
  const [selectedValue, setSelectedValue] = useState("");

  return (
    <div className="flex items-center cursor-pointer gap-x-2 justify-between w-full">
      <div className="flex justify-between gap-x-2 border-b">
        <div className="flex items-center gap-x-3">
          <Image src="/icons/drag.svg" alt="draggable" width={15} height={15} />
          <RxBox size={25} />
          <input
            type="text"
            plsceholder="Answer"
            value={selectedValue}
            onChange={(e) => setSelectedValue(e.target.value)}
            className="outline-none w-full"
            unselectable
          />
        </div>
        <div>
          <Image
            src="/icons/gallery.svg"
            alt="gallery"
            width={30}
            height={30}
          />
        </div>
      </div>
      <Image
        src="/icons/cross.svg"
        alt="cross"
        width={30}
        height={30}
        onClick={removeCheckbox}
      />
    </div>
  );
};

export const Answer = ({ answerType }) => {
  const [radioComponent, setRadioComponent] = useState([
    <Choice />,
    <Choice />,
  ]);

  const [checkboxComponent, setcheckboxComponent] = useState([
    <Option />,
    <Option />,
  ]);

  const [scale, setScale] = useState({
    low: 0,
    high: 0,
  });

  const [scaleDropdown, setScaleDropdown] = useState({
    low: false,
    high: false,
  });

  function newRadioChoice() {
    if (radioComponent.length > 4) {
      return new Toast("Too Many Options");
    }
    setRadioComponent((components) => [...components, <Option />]);
  }

  function removeRadioChoice(index) {
    if (radioComponent.length === 2) {
      return new Toast("There has to be at least two options");
    }

    setRadioComponent((components) => {
      const updatedList = [...components];
      updatedList.splice(index, 1);
      return updatedList;
    });
  }

  function newCheckBox() {
    if (checkboxComponent.length > 4) {
      return new Toast("Too Many Options");
    }
    setcheckboxComponent((components) => [...components, <Option />]);
  }

  function removeCheckbox(index) {
    if (checkboxComponent.length === 2) {
      return new Toast("There has to be at least two options");
    }

    setcheckboxComponent((components) => {
      const updatedList = [...components];
      updatedList.splice(index, 1);
      return updatedList;
    });
  }

  if (answerType === "Multiple Choice") {
    return (
      <div className="flex flex-col">
        <div className="sm:w-[80%] w-full flex justify-start flex-col gap-x-2 gap-y-1 pl-4 py-3">
          {radioComponent.map((component, index) => {
            return <Choice key={index} removeRadioChoice={removeRadioChoice} />;
          })}
        </div>
        <div className="flex w-full justify-end p-3">
          <BsFillPlusCircleFill
            size={30}
            className="text-[#6C3FEE] hover:cursor-pointer"
            onClick={newRadioChoice}
          />
        </div>
      </div>
    );
  }

  if (answerType === "Short Answer") {
    return (
      <div className="border-b sm:w-[80%] w-full flex justify-start gap-x-2 pl-4 py-3">
        <input
          type="text"
          placeholder="Short Answer"
          className="outline-none placeholder:text-xl text-xl w-full"
        />
      </div>
    );
  }

  if (answerType === "Paragraph") {
    return (
      <div className="border-b sm:w-[80%] w-full flex justify-start gap-x-2 pl-4 py-3">
        <textarea
          type="text"
          placeholder="Paragraph"
          className="outline-none placeholder:text-xl text-xl resize-none w-full"
          rows={4}
        ></textarea>
      </div>
    );
  }

  if (answerType === "Check Boxes") {
    return (
      <div className="flex flex-col">
        <div className="sm:w-[80%] w-full flex justify-start flex-col gap-x-2 gap-y-1 pl-4 py-3">
          {checkboxComponent.map((component, index) => {
            return <Option key={index} removeCheckbox={removeCheckbox} />;
          })}
        </div>
        <div className="flex w-full justify-end p-3">
          <BsFillPlusCircleFill
            size={30}
            className="text-[#6C3FEE] hover:cursor-pointer"
            onClick={newCheckBox}
          />
        </div>
      </div>
    );
  }

  if (answerType === "File Upload") {
    return (
      <div className="flex justify-start items-center w-full h-full">
        <div className="h-40 w-[80%] mx-auto flex items-center justify-center">
          <h3 className="py-2 px-4 rounded-md border bg-[#6C3FEE] text-white cursor-pointer flex items-center gap-x-3">
            File Upload <BiUpload />
          </h3>
        </div>
      </div>
    );
  }

  if (answerType === "Linear Scale") {
    return (
      <div className="flex justify-start mt-4 ml-3">
        <div className="flex justify-between gap-x-10 items-center">
          <select className="flex items-center gap-x-2 cursor-pointer border rounded px-4 py-2 bg-gray-100 text-gray-800">
            <option value={0}>0</option>
            <option value={1}>1</option>
          </select>
          <div>to</div>
          <select className="flex items-center gap-x-2 cursor-pointer border rounded px-4 py-2 bg-gray-100 text-gray-800">
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
            <option value={5}>5</option>
            <option value={6}>6</option>
            <option value={7}>7</option>
            <option value={8}>8</option>
            <option value={9}>9</option>
            <option value={10}>10</option>
          </select>
        </div>
      </div>
    );
  }

  if (answerType === "Date") {
    return (
      <div className="flex justify-start w-full h-full p-3">
        <h3 className="flex items-center justify-start font-semibold w-full h-full">
          Date
          <AiFillCalendar size={30} color="#6C3FEE" />
        </h3>
      </div>
    );
  }

  if (answerType === "Time") {
    return (
      <div className="flex justify-start w-full h-full p-3">
        <h3 className="flex items-center justify-start font-semibold w-full h-full">
          Time
          <AiFillClockCircle size={30} color="#6C3FEE" />
        </h3>
      </div>
    );
  }
};

export const CheckListEdit = ({ removeForm }) => {
  const [type, setType] = useState("Short Answer");
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [showDescription, setShowDescription] = useState(false);

  const uniqueDescriptionId = useMemo(() => {
    return `checklist_${Math.floor(Math.random() * 100000)}`;
  }, []);

  const requiredId = useMemo(() => {
    return `required${Math.floor(Math.random() * 100000)}`;
  }, []);

  const options = [
    {
      value: "Short Answer",
    },
    {
      value: "Paragraph",
    },
    {
      value: "Multiple Choice",
    },
    {
      value: "Check Boxes",
    },
    {
      value: "File Upload",
    },
    {
      value: "Linear Scale",
    },
    {
      value: "Multiple Choice Grid",
    },
    {
      value: "Checkbox Grid",
    },
    {
      value: "Date",
    },
    { value: "Time" },
  ];

  const handleSelect = (option) => {
    setType(option);
    setShowTypeDropdown(false);
  };

  const handleCheckboxChange = (e) => {
    setShowDescription(e.target.checked);
  };

  return (
    <div className="w-full rounded-lg shadow-md min-h-[45vh] h-fit relative flex justify-between flex-col">
      <div>
        <div className="h-[4vh] rounded-t-lg bg-[#6C3FEE]"></div>
        <div className="flex justify-between">
          <div className="w-fit">
            <div className="border-b flex justify-start gap-x-2 pl-4 py-3">
              <input
                type="text"
                placeholder="Question"
                className="outline-none placeholder:text-2xl text-2xl "
              />
              <Image
                src="/icons/gallery.svg"
                width={30}
                height={30}
                className="cursor-pointer"
                alt="Gallery Icon"
              />
            </div>
          </div>
          <div className="p-3 relative">
            <button
              className="bg-[#6C3FEE] text-white px-3 py-1 rounded-md"
              type="button"
              onClick={() => setShowTypeDropdown(true)}
            >
              {type}
            </button>
            <div
              className={`h-fit w-36 text-white absolute bg-[#6C3FEE] z-20 rounded-md mt-2 cursor-pointer ${
                showTypeDropdown ? "block" : "hidden"
              }`}
            >
              {options.map((option, index) => {
                return (
                  <p
                    key={index}
                    className="hover:bg-white p-1 hover:text-[#6C3FEE]"
                    onClick={() => handleSelect(option.value)}
                  >
                    {option.value}
                  </p>
                );
              })}
            </div>
          </div>
        </div>

        <div
          className={`w-full border-b p-4 ${
            showDescription ? "block" : "hidden"
          }`}
        >
          <input
            type="text"
            className="outline-none placeholder:text-xl text-xl w-full"
            placeholder="Description"
          />
        </div>
        <div className="w-full">
          <Answer answerType={type} />
        </div>
      </div>
      <div className="border-t flex w-[90%] mx-auto px-3 justify-end items-center">
        <div className="flex border-r sm:justify-between justify-center h-full items-center gap-x-5 px-2 sm:flex-row flex-col">
          <button className="flex gap-x-1" type="button">
            <Image src="/icons/copy.svg" height={20} width={20} alt="copy" />
            Copy
          </button>
          <button className="flex gap-x-1" type="button" onClick={removeForm}>
            <Image src="/icons/trash.svg" height={20} width={20} alt="trash" />
            Delete
          </button>
        </div>
        <div className="flex justify-start gap-x-2 px-2 py-3 sm:flex-row flex-col">
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              name="required"
              id={requiredId}
              className="w-4 h-4 accent-indigo-600"
            />
            <label htmlFor={requiredId} className="cursor-pointer">
              Required
            </label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              name="showChecklistDescription"
              id={uniqueDescriptionId}
              className="w-4 h-4 accent-indigo-600"
              checked={showDescription}
              onChange={handleCheckboxChange}
            />
            <label htmlFor={uniqueDescriptionId} className="cursor-pointer">
              Show Checklist Description
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export const SideBar = ({ addForm }) => {
  const images = [
    {
      path: "/icons/download.svg",
      title:"Import List"
    },
    {
      path: "/icons/text.svg",
      title:"Add Description"
    },
    {
      path: "/icons/gallery.svg",
      title:"Add Image"
    },
    {
      path: "/icons/clapperboard.svg",
      title:"Add Video"
    },
    {
      path: "/icons/section.svg",
      title:"Create Sub Section"
    },
  ];

  return (
    <div className="w-[6vh] h-[32vh] rounded-md shadow-md border shadow-[#6C3FEE] flex flex-col justify-center items-center py-2 gap-y-1">
      <BsFillPlusCircleFill
        size={30}
        color="#6C3FEE"
        onClick={addForm}
        className="hover:cursor-pointer"
        title="Add Form"
      />
      {images.map((image, index) => {
        return (
          <Image
            key={index}
            src={image.path}
            width={30}
            height={30}
            alt={image.path}
            title={image.title}
            className="object-contain hover:cursor-pointer"
          />
        );
      })}
    </div>
  );
};
