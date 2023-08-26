import { useEffect, useState } from "react";
import Head from "next/head";
import { DashboardLayout } from "@/layouts/Dashboard";
import { Header } from "@/components/Dashboard/CheckList/Header";
import { CheckListEdit, SideBar } from "@/components/Dashboard/CheckList";

export default function CreateCheckList() {
  const [checkList, setCheckList] = useState({
    title: "",
    description: "",
    coverImgUrl: "/",
  });
  const [checklistData, setCheckListData] = useState([
    <CheckListEdit removeForm={removeForm} key={Date.now()} />,
  ]);

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;

    setCheckList((checkList) => ({ ...checkList, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  function duplicateForm() {
    const newFormKey = Date.now();
    setCheckListData((checklistData) => [
      ...checklistData,
      <CheckListEdit removeForm={removeForm} key={newFormKey} />,
    ]);
  }

  function removeForm(index) {
    setCheckListData((checklistData) => {
      const updatedList = [...checklistData];
      updatedList.splice(index, 1);
      return updatedList;
    });
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
          handleChange={handleChange}
        />
        <div className="w-full flex flex-row mt-5 gap-x-3">
          <div className="flex sm:w-[65%] w-full flex-col gap-y-5">
            {checklistData.map((component, index) => {
              return (
                <CheckListEdit
                  key={component.key} 
                  removeForm={() => removeForm(index)}
                />
              );
            })}
          </div>
          <SideBar addForm={duplicateForm} />
        </div>
      </form>
    </DashboardLayout>
  );
}
