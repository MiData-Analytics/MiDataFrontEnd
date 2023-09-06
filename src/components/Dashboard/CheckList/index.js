import Image from "next/image";
import Link from "next/link";
import { useState, useMemo, useEffect, useRef } from "react";
import { BsFillPlusCircleFill } from "react-icons/bs";
import Toast from "awesome-toast-component";
import { RxBox } from "react-icons/rx";
import { BiUpload } from "react-icons/bi";
import { AiFillCalendar, AiFillClockCircle } from "react-icons/ai";
import _debounce from "lodash/debounce";
import axios from "axios";
import { urls } from "@/utils/urls";
import { useCookie } from "@/hooks/useCookie";

export const CheckList = ({
  id,
  title,
  monitors,
  author,
  percentageComplete,
  daysRemaining,
  status,
}) => {
  return (
    <Link
      href={`/dashboard/checklists/${id}`}
      className="flex w-full mx-auto border rounded-md shadow-md justify-between p-3 hover:cursor-pointer sm:flex-row flex-col hover:shadow-lg duration-500"
    >
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
        <div className="flex gap-2 gap-x-5 w-full">
          <div className="py-1 sm:px-10 px-3 bg-[#AAAAAA] flex justify-center gap-x-1 rounded-md">
            <span className="text-primary font-medium">{monitors} </span>
            <span className="text-[#666666]">Monitors</span>
          </div>
          <Link
            href={``}
            className="py-1 sm:px-10 px-3 bg-[#2ACDA6]/40 flex justify-center gap-x-1 rounded-md text-[#444444]"
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
    </Link>
  );
};

export const Choice = ({
  removeRadioChoice,
  option,
  id,
  formData,
  setFormData,
  editQuestion,
}) => {
  const [multipleChoiceValue, setMultipleChoiceValue] = useState("");

  useEffect(() => {
    setMultipleChoiceValue(option);
  }, [option]);

  const handleChange = (e) => {
    const newSelectedValue = e.target.value;
    setMultipleChoiceValue(newSelectedValue);

    setFormData((prevData) => {
      const newOptions = [...prevData.options];
      newOptions[id] = newSelectedValue;

      return {
        ...prevData,
        options: newOptions,
      };
    });

    const newOptions = [...formData.options];
    newOptions[id] = newSelectedValue;

    editQuestion({
      ...formData,
      options: newOptions,
    });
  };

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
            onChange={handleChange}
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

export const Option = ({
  removeCheckbox,
  option,
  id,
  formData,
  setFormData,
  editQuestion,
}) => {
  const [selectedValue, setSelectedValue] = useState("");

  useEffect(() => {
    setSelectedValue(option);
  }, [option]);

  const handleChange = (e) => {
    const newSelectedValue = e.target.value;
    setSelectedValue(newSelectedValue);

    setFormData((prevData) => {
      const newOptions = [...prevData.options];
      newOptions[id] = newSelectedValue;

      return {
        ...prevData,
        options: newOptions,
      };
    });

    const newOptions = [...formData.options];
    newOptions[id] = newSelectedValue;

    editQuestion({
      ...formData,
      options: newOptions,
    });
  };

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
            onChange={handleChange}
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

export const Answer = ({
  answerType,
  options,
  addOptions,
  removeOption,
  formData,
  setFormData,
  editQuestion,
}) => {
  const [radioComponent, setRadioComponent] = useState([<Choice />]);

  const [checkboxComponent, setcheckboxComponent] = useState([<Option />]);

  useEffect(() => {
    if (answerType === "Check Boxes") {
      const checks = options?.map((option, index) => (
        <Option
          option={option}
          removeCheckbox={() => removeCheckbox(index)}
          formData={formData}
          setFormData={setFormData}
          editQuestion={editQuestion}
          id={index}
        />
      ));

      if (checks) {
        setcheckboxComponent([...checks]);
      }
    }

    if (answerType === "Multiple Choice") {
      const radio = options?.map((option, index) => (
        <Choice
          option={option}
          removeRadioChoice={() => removeRadioChoice(index)}
          formData={formData}
          setFormData={setFormData}
          editQuestion={editQuestion}
          id={index}
        />
      ));

      if (radio) {
        setRadioComponent([...radio]);
      }
    }
  }, [formData]);

  function newRadioChoice() {
    if (radioComponent.length > 4) {
      return new Toast("Too Many Options");
    }

    setFormData((prevData) => {
      const newOptions = [...prevData.options];
      newOptions.push("");

      return {
        ...prevData,
        options: newOptions,
      };
    });

    const newOptions = [...formData.options];
    newOptions.push("");

    editQuestion({
      ...formData,
      options: newOptions,
    });

    setRadioComponent((components) => [
      ...components,
      <Choice
        removeRadioChoice={() => removeRadioChoice(radioComponent.length - 1)}
        option={""}
        formData={formData}
        setFormData={setFormData}
        editQuestion={editQuestion}
        id={radioComponent.length - 1}
      />,
    ]);
  }

  function removeRadioChoice(index) {
    if (radioComponent.length === 2) {
      return new Toast("There has to be at least two options");
    }

     setFormData((prevData) => {
       const newOptions = [...prevData.options];
       newOptions.splice(index, 1);

       return {
         ...prevData,
         options: newOptions,
       };
     });

     const newOptions = [...formData.options];
     newOptions.splice(index, 1);

     editQuestion({
       ...formData,
       options: newOptions,
     });

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

    setFormData((prevData) => {
      const newOptions = [...prevData.options];
      newOptions.push("");

      return {
        ...prevData,
        options: newOptions,
      };
    });

    const newOptions = [...formData.options];
    newOptions.push("");

    editQuestion({
      ...formData,
      options: newOptions,
    });

    setcheckboxComponent((component) => [
      ...component,
      <Option
        removeCheckbox={() => removeCheckbox(checkboxComponent.length - 1)}
        option={""}
        formData={formData}
        setFormData={setFormData}
        editQuestion={editQuestion}
        id={checkboxComponent.length - 1}
      />,
    ]);
  }

  function removeCheckbox(index) {
    if (checkboxComponent.length === 2) {
      return new Toast("There has to be at least two options");
    }

    setFormData((prevData) => {
      const newOptions = [...prevData.options];
      newOptions.splice(index, 1);

      return {
        ...prevData,
        options: newOptions,
      };
    });

    const newOptions = [...formData.options];
    newOptions.splice(index, 1);

    editQuestion({
      ...formData,
      options: newOptions,
    });

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
            return <div key={index}>{component}</div>;
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
          className="outline-none placeholder:text-xl text-xl w-full disabled:bg-transparent"
          disabled
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
          className="outline-none placeholder:text-xl text-xl resize-none w-full disabled:bg-transparent"
          rows={4}
          disabled
        ></textarea>
      </div>
    );
  }

  if (answerType === "Check Boxes") {
    return (
      <div className="flex flex-col">
        <div className="sm:w-[80%] w-full flex justify-start flex-col gap-x-2 gap-y-1 pl-4 py-3">
          {checkboxComponent.map((component, index) => {
            return <div key={index}>{component}</div>;
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

export const CheckListEdit = ({
  id,
  removeForm,
  question,
  answerType,
  required,
  setDescription,
  questionOptions,
  copyQuestion,
}) => {
  const [formData, setFormData] = useState({
    question: "",
    description: "",
    type: "Short Answer",
    showTypeDropdown: false,
    showDescription: false,
    required: true,
    options: [],
  });
  const { token } = useCookie();

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

  const debounceEditQuestion = useRef(
    _debounce(async (updatedForm) => {
      {
        try {
          const response = await axios.patch(
            `${urls.updateQuestion}${id}`,
            updatedForm,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.status === 200) {
            console.log("successfully updated question");
          }
        } catch (error) {
          console.error(error);
          new Toast("Failed to update question");
        }
      }
    }, 500)
  ).current;

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      question: question,
      description: setDescription,
      type: answerType,
      required: required,
      showDescription: setDescription === "" ? false : true,
      options: questionOptions,
    }));
  }, [id]);

  const handleSelect = (option) => {
    setFormData((prevData) => ({
      ...prevData,
      type: option,
      showTypeDropdown: false,
    }));

    debounceEditQuestion({ ...formData, type: option });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: checked,
    }));

    debounceEditQuestion({ ...formData, [name]: checked });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    debounceEditQuestion({ ...formData, [name]: value });
  };

  return (
    <div className="w-full rounded-lg shadow-md min-h-[45vh] h-fit relative flex justify-between flex-col">
      <div>
        <div className="h-[4vh] rounded-t-lg bg-[#6C3FEE]"></div>
        <div className="flex justify-between flex-wrap">
          <div className="w-fit">
            <div className="border-b flex justify-start gap-x-2 pl-4 py-3">
              <input
                type="text"
                placeholder="Question"
                className="outline-none placeholder:text-2xl text-2xl"
                name="question"
                value={formData.question}
                onChange={handleChange}
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
              onClick={() =>
                setFormData((prevData) => ({
                  ...prevData,
                  showTypeDropdown: !prevData.showTypeDropdown,
                }))
              }
            >
              {formData.type}
            </button>
            <div
              className={`h-fit w-36 text-white absolute bg-[#6C3FEE] z-20 rounded-md mt-2 cursor-pointer ${
                formData.showTypeDropdown ? "block" : "hidden"
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
            formData.showDescription ? "block" : "hidden"
          }`}
        >
          <input
            type="text"
            className="outline-none placeholder:text-xl text-xl w-full"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div className="w-full">
          <Answer
            answerType={formData.type}
            options={formData.options}
            formData={formData}
            setFormData={setFormData}
            editQuestion={debounceEditQuestion}
          />
        </div>
      </div>
      <div className="border-t flex w-[90%] mx-auto px-3 justify-end items-center">
        <div className="flex border-r sm:justify-between justify-center h-full items-center gap-x-5 px-2 sm:flex-row flex-col">
          <button className="flex gap-x-1" type="button" onClick={copyQuestion}>
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
              value={formData.required}
              onChange={handleCheckboxChange}
            />
            <label htmlFor={requiredId} className="cursor-pointer">
              Required
            </label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              name="showDescription"
              id={uniqueDescriptionId}
              className="w-4 h-4 accent-indigo-600"
              checked={formData.showDescription}
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
  function inDevelopment() {
    new Toast("Still in development");
  }

  const images = [
    {
      path: "/icons/download.svg",
      title: "Import List",
      call: inDevelopment,
    },
    {
      path: "/icons/text.svg",
      title: "Add Description",
      call: inDevelopment,
    },
    {
      path: "/icons/gallery.svg",
      title: "Add Image",
      call: inDevelopment,
    },
    {
      path: "/icons/clapperboard.svg",
      title: "Add Video",
      call: inDevelopment,
    },
    {
      path: "/icons/section.svg",
      title: "Create Sub Section",
      call: inDevelopment,
    },
  ];

  return (
    <div className=" rounded-md shadow-md border shadow-[#6C3FEE] flex flex-col justify-center items-center px-2 py-5 gap-y-1 h-fit">
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
            onClick={image.call}
            className="object-contain hover:cursor-pointer"
          />
        );
      })}
    </div>
  );
};
