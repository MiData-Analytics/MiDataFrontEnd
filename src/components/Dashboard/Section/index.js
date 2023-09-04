import { useState,useEffect } from "react";

export const Section = ({ sectionTitle, sectionDescription }) => {
  const [section, setSection] = useState({
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSection((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
        setSection((prevData) => (
            {
                ...prevData,
                title:sectionTitle,
                description:sectionDescription
            }
        ))
  }, [])
  

  return (
    <div className={`w-full rounded-lg shadow-md h-[30vh] relative`}>
      <div className="h-[4vh] rounded-t-lg bg-[#6C3FEE] z-50 "></div>
      <div className={`flex flex-col p-5 h-full w-full z-10`}>
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
          {/* <label
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
            </label> */}
        </div>
      </div>
    </div>
  );
};
