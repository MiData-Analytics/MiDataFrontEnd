import { useEffect, useState, useRef, Fragment } from "react";
import Head from "next/head";
import { DashboardLayout } from "@/layouts/Dashboard";
import { Header } from "@/components/Dashboard/CheckList/Header";
import { CheckListEdit, SideBar } from "@/components/Dashboard/CheckList";
import axios from "axios";
import { useRouter } from "next/router";
import { useGetChecklist } from "@/hooks/useGetChecklists";
import { useCookie } from "@/hooks/useCookie";
import { urls } from "@/utils/urls";
import _debounnce from "lodash/debounce";
import Toast from "awesome-toast-component";
import { Section } from "@/components/Dashboard/Section";

export default function CreateCheckList() {
  const { query } = useRouter();
  const { checklist, isLoading, isError, refetchData } = useGetChecklist(
    query.id
  );
  const [checkList, setCheckList] = useState({
    title: "",
    description: "",
    deadline: "",
    coverImgUrl: "",
    checklistType: "Select Form Type",
  });
  const { token } = useCookie();
  const [startDate, setStartDate] = useState(new Date());
  const imgUploadRef = useRef();
  const [lastSectionID, setLastSectionID] = useState();
  const [checklistData, setCheckListData] = useState([]);

  const options = [
    {
      value: "Single Submission",
    },
    {
      value: "Multiple Submission",
    },
  ];

  const debounceEditHeader = useRef(
    _debounnce(async (updatedCheckList) => {
      {
        try {
          const response = await axios.patch(
            `${urls.updateChecklistHeader}${query.id}`,
            updatedCheckList,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        } catch (error) {
          console.log(error);
        }
      }
    }, 500)
  ).current;

  async function copyQuestion(questionId) {
    try {
      const response = await axios.post(
        `${urls.copyQuestion}`,
        {
          checklistId: query.id,
          questionId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      refetchData(query?.id);
    } catch (error) {
      new Toast("Could not copy that question");
    }
  }

  async function uploadImage(file) {
    const formData = new FormData();
    formData.append("headerimg", file);

    try {
      const response = axios.patch(
        `${urls.uploadChecklistHeaderIMG}${query.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        console.log("Successfully uploaded");
      }
    } catch (error) {
      throw new Error("An error occured while uploading the image");
    }
  }

  async function removeSection(id) {
    try {
      const response = await axios.delete(`${urls.deleteSection}${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        refetchData(query?.id);
        // setCheckListData((prevData) =>
        //   prevData.filter((section) => section?.key !== id)
        // );
      }
    } catch (error) {
      console.error(error);
      new Toast("Failed to delete section");
    }
  }

  async function createNewQuestion(id) {
    try {
      const response = await axios.post(
        urls.newQuestion,
        { id, sectionId: lastSectionID },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // duplicateForm(response.data.newQuestion);
      refetchData(query?.id);
    } catch (error) {
      new Toast("Failed to create question");
      console.error(error);
    }
  }

  async function createNewSection() {
    try {
      const response = await axios.post(
        urls.newSection,
        {
          checklist: query.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        // addSection(response.data);
        refetchData(query?.id);
      }
    } catch (error) {
      new Toast("Failed to create new section");
    }
  }

  async function removeQuestion(id) {
    try {
      const res = await axios.delete(`${urls.deleteQuestion}${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200) {
        refetchData(query?.id);
        // setCheckListData((prevData) =>
        //   prevData.map((section) =>
        //     section.filter((question) => question.key !== id)
        //   )
        // );
      }
    } catch (error) {
      console.error(error);
      new Toast("Failed to delete question");
    }
  }

  function handleCoverImg(e) {
    const files = e.target.files;
    let img = files[0];

    if (!img) {
      new Toast("No Selected Image File...");
    }

    if (
      !["image/jpeg", "image/gif", "image/png", "image/svg+xml"].includes(
        img.type
      )
    ) {
      new Toast("Only JPG, GIF, PNG and SVG is allowed");
      return;
    }

    if (img.size > 30 * 1024 * 1024) {
      new Toast("File size cannot be more than 30MB");
      return;
    }

    uploadImage(file);
  }

  useEffect(() => {
    const renderData = checklist?.checklist;
    const sections = checklist?.sections;

    if (sections) {
      const lastSectionIndex = sections?.length - 1;
      setLastSectionID(sections[lastSectionIndex].id);
    }

    setCheckList({
      ...checkList,
      title: checklist?.sections[0].title,
      description: checklist?.sections[0].description,
      coverImgUrl: checklist?.coverImgURL,
      checklistType: renderData?.checklistType,
    });

    const elements = checklist?.sections?.map((data, index) => {
      if (index === 0) {
        return data?.questions?.map((question, innerIndex) => {
          return (
            <CheckListEdit
              removeForm={() => removeQuestion(question.id)}
              id={question.id}
              answerType={question.answerType}
              required={question.required}
              question={question.question}
              setDescription={question.description}
              questionOptions={question.options}
              copyQuestion={() => copyQuestion(question.id)}
              key={question.id}
            />
          );
        });
      }

      return (
        <Fragment key={data.id}>
          <Section
            sectionTitle={data.title}
            sectionDescription={data.description}
            checklistId={query.id}
            sectionId={data.id}
            key={data.id}
            deleteSection={() => removeSection(data.id)}
          />
          {data?.questions?.length > 0 && (
            <>
              {data?.questions?.map((question, innerIndex) => {
                return (
                  <CheckListEdit
                    removeForm={() => removeQuestion(question.id)}
                    id={question.id}
                    answerType={question.answerType}
                    required={question.required}
                    question={question.question}
                    setDescription={question.description}
                    questionOptions={question.options}
                    copyQuestion={() => copyQuestion(question.id)}
                    key={question.id}
                  />
                );
              })}
            </>
          )}
        </Fragment>
      );
    });

    if (elements) {
      setCheckListData([...elements]);
    }
  }, [checklist]);

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;

    setCheckList((prevChecklist) => ({ ...prevChecklist, [name]: value }));
    debounceEditHeader({ ...checkList, [name]: value });
  }

  function duplicateForm(data) {
    setCheckListData((checklistData) => [
      ...checklistData,
      <div key={data.id}>
        <CheckListEdit
          removeForm={() => removeQuestion(data.id)}
          id={data.id}
          answerType={data.answerType}
          required={data.required}
          question={data.question}
          setDescription={data.description}
          questionOptions={data.options}
          copyQuestion={() => copyQuestion(data.id)}
          key={data.id}
        />
      </div>,
    ]);
  }

  function addSection(data) {
    setCheckListData((checklistdata) => [
      ...checklistdata,
      <div key={data.id}>
        <Section
          sectionId={data.id}
          sectionTitle={data.title}
          sectionDescription={data.description}
          key={data.id}
          deleteSection={() => removeSection(data.id)}
        />
      </div>,
    ]);
  }

  function removeForm(index) {
    setCheckListData((checklistData) => {
      const updatedList = [...checklistData];
      updatedList.splice(index, 1);
      return updatedList;
    });
  }

  function handleFormType(value) {
    setCheckList((prevData) => ({
      ...prevData,
      checklistType: value,
    }));

    debounceEditHeader({ ...checkList, checklistType: value });
  }

  function setDeadline(date) {
    setCheckList((checklist) => ({
      ...checklist,
      deadline: date,
    }));

    setStartDate(date);
    debounceEditHeader({ ...checkList, deadline: date });
  }

  return (
    <DashboardLayout>
      <Head>
        <title>MiData | Create Checklist</title>
      </Head>
      <form className="sm:p-10 p-0">
        <Header
          title={checkList.title}
          description={checkList.description}
          coverImgURL={checkList.coverImgUrl}
          handleCoverImg={handleCoverImg}
          handleChange={handleChange}
          imgUploadRef={imgUploadRef}
          checklistType={checkList.checklistType}
          options={options}
          handleFormType={handleFormType}
          startDate={startDate}
          setDeadline={setDeadline}
        />
        <div className="w-full flex flex-row mt-5 gap-x-3">
          <div className="flex sm:w-[65%] w-full flex-col gap-y-5 bg-white">
            {checklistData.map((component, index) => {
              return (
                <div key={index} className="flex flex-col gap-y-5">
                  {component}
                </div>
              );
            })}
          </div>
          <SideBar
            addForm={() => createNewQuestion(query.id)}
            addSection={() => createNewSection(query.id)}
          />
        </div>
      </form>
    </DashboardLayout>
  );
}
