import { useState, useEffect, useRef } from "react";
import { BsTrash3Fill } from "react-icons/bs";
import axios from "axios";
import { urls } from "@/utils/urls";
import { useCookie } from "@/hooks/useCookie";
import Toast from "awesome-toast-component";
import _debounce from "lodash/debounce";

export const Section = ({
  sectionTitle,
  sectionDescription,
  deleteSection,
  checklistId,
  sectionId,
}) => {
  
  const [section, setSection] = useState({
    title: "",
    description: "",
  });

  const { token } = useCookie();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSection((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    updateSection({ ...section, [name]: value });
  };

  const updateSection = useRef(
    _debounce(async (updatedSection) => {
      try {
        const response = await axios.patch(
          `${urls.updateSection}${sectionId}`,
          updatedSection,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
        }
      } catch (error) {
        console.error(error);
        new Toast("Failed to update section");
      }
    }, 500)
  ).current;

  useEffect(() => {
    setSection((prevData) => ({
      ...prevData,
      title: sectionTitle,
      description: sectionDescription,
    }));
  }, []);

  return (
    <div className={`w-full rounded-lg shadow-md min-h-[250px] relative`}>
      <div className="h-[4vh] rounded-t-lg bg-[#6C3FEE] z-50"></div>
      <div className={`flex flex-col justify-between p-5 w-full z-10`}>
        <div className="flex flex-row justify-between w-full z-10">
          <div className="flex flex-col z-10">
            <input
              type="text"
              placeholder="New Subsection"
              name="title"
              className={`outline-none bg-transparent placeholder:text-2xl text-2xl z-10}`}
              value={section.title}
              onChange={handleChange}
            />
            <textarea
              name="description"
              className={`outline-none placeholder:font-thin resize-none z-10 bg-transparent`}
              cols="30"
              rows="3"
              placeholder="Subsection description"
              value={section.description}
              onChange={handleChange}
            ></textarea>
          </div>
        </div>
        <div className="flex justify-end w-full">
          <BsTrash3Fill
            className="hover:cursor-pointer"
            onClick={deleteSection}
          />
        </div>
      </div>
    </div>
  );
};
