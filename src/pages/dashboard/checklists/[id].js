import { useEffect, useState, useRef } from "react";
import Head from "next/head";
import { DashboardLayout } from "@/layouts/Dashboard";
import { Header } from "@/components/Dashboard/CheckList/Header";
import { CheckListEdit, SideBar } from "@/components/Dashboard/CheckList";
import axios from "axios";
import { useRouter } from "next/router";
import { useGetChecklist, useGetQuestions } from "@/hooks/useGetChecklists";
import { useCookie } from "@/hooks/useCookie";
import { urls } from "@/utils/urls";
import _debounnce from "lodash/debounce";
import Toast from "awesome-toast-component";
import { Section } from "@/components/Dashboard/Section";

export default function CreateCheckList() {
  const { query } = useRouter();
  const { checklist, isLoading, isError } = useGetChecklist(query.id);
  const [checkList, setCheckList] = useState({
    title: "",
    description: "",
    coverImgUrl: "",
    checklistType: "Select Form Type",
  });
  const { token } = useCookie();
  const imgUploadRef = useRef();

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

      duplicateForm(response.data.question);
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

  async function createNewQuestion(id) {
    try {
      const response = await axios.post(
        urls.newQuestion,
        { id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      duplicateForm(response.data.newQuestion);
    } catch (error) {
      new Toast("Failed to create question");
    }
  }

  async function removeQuestion(id) {
    console.log(checklistData.length);
    if (checklistData.length === 1) {
      return new Toast("There has to be at least 1 question");
    }

    try {
      await axios.delete(`${urls.deleteQuestion}${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const question = checklistData.find(
        (question) => question.props.id === id
      );
      removeForm(question.key);
    } catch (error) {
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

  const [checklistData, setCheckListData] = useState([]);

  useEffect(() => {
    setCheckList({
      ...checkList,
      title: checklist?.title,
      description: checklist?.description,
      coverImgUrl: checklist?.coverImgURL,
      checklistType: checklist?.checklistType,
    });

    const questions = checklist?.questions;

    const questionElements = questions?.map((question, index) => (
      <CheckListEdit
        removeForm={() => removeQuestion(question.id)}
        id={question.id}
        answerType={question.answerType}
        required={question.required}
        question={question.question}
        setDescription={question.description}
        questionOptions={question.options}
        copyQuestion={() => copyQuestion(question.id)}
        key={index}
      />
    ));

    if (questionElements) {
      setCheckListData([...questionElements]);
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
        />
        <div className="w-full flex flex-row mt-5 gap-x-3">
          <div className="flex sm:w-[65%] w-full flex-col gap-y-5 bg-white">
            {checklistData.map((component, index) => {
              return <div key={index}>{component}</div>;
            })}
            <Section />
          </div>
          <SideBar addForm={() => createNewQuestion(query.id)} />
        </div>
      </form>
    </DashboardLayout>
  );
}
