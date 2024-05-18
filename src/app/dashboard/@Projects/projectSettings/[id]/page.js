"use client";
import React, { useEffect, useState } from "react";
import { redirect, useParams } from "next/navigation";
import { ProjectElements } from "@/components/Store";
import { Button, Input, Select, p } from "antd";
import { useRouter } from "next/navigation";

const ProjectSettings = () => {
  const router = useRouter();
  function status(val) {
    if (val == 1) return "finished";
    if (val == 2) return "onhold";
    if (val == 3) return "bandoned";
    if (val == 4) return "progress";
  }
  const projectData = ProjectElements((state) => state.ProjectData);
  const setProjectData = ProjectElements((state) => state.setProjectData);

  const params = useParams();
  // console.log(projectData.filter((e) => e.project_code === params.id));
  const [currentProject, setCurrentProject] = useState(
    projectData
      .map((e, index) => ({ ...e, index }))
      .filter((e) => e.project_code === params.id)[0]
  );
  // console.log(currentProject);
  return (
    <div className="h-screen w-full bg-white flex flex-col-reverse sm:flex-row text-neutral-400 ">
      <div className="sm:h-full h-fit sm:w-[45%] p-10 flex  flex-col gap-5 justify-center">
        <p className="text-xl ">Project Details:</p>
        <div className="w-full flex gap-10 justify-around items-center">
          <p className="w-[150px]">Name:</p>{" "}
          <Input
            value={currentProject?.projectName}
            onChange={(e) => {
              setCurrentProject((prev) => ({
                ...prev,
                ["projectName"]: e.target.value,
              }));
            }}
          />
        </div>
        <div className="w-full flex gap-10 justify-around items-center">
          <p className="w-[150px]">Type:</p>{" "}
          <Input value={currentProject?.type} />
        </div>
        <div className="w-full flex gap-10 justify-around items-center">
          <p className="w-[150px]">Created At:</p>{" "}
          <Input value={currentProject?.created_at} />
        </div>
        <div className="w-full flex gap-10 justify-around items-center">
          <p className="w-[150px]">Deadline:</p>{" "}
          <Input value={currentProject?.deadline} />
        </div>
        <div className="w-full flex gap-10 justify-around items-center">
          <p className="w-[150px]">Team Lead:</p>{" "}
          <Input value={currentProject?.team_lead} />
        </div>
        <div className="w-full flex gap-10 justify-around items-center">
          <p className="w-[150px]">Status</p>{" "}
          <Select
            value={status(currentProject?.status)}
            options={[
              { value: "1", label: "finished" },
              { value: "2", label: "onhold" },
              { value: "3", label: "abandoned" },
              { value: "4", label: "in progress" },
            ]}
            className="w-full"
            onChange={(e) => {
              setCurrentProject((prev) => ({
                ...prev,
                ["status"]: e,
              }));
            }}
          />
        </div>
        <div className="w-full flex justify-center gap-10">
          <Button
            type="primary"
            className="w-[40%]"
            onClick={() => {
              // console.log(currentProject);
              let updateProject = [...projectData];
              // console.log(updateProject[currentProject.index]);
              updateProject[currentProject.index] = {
                ...updateProject[currentProject.index],
                ...currentProject,
              };
              // console.log(updateProject);
              setProjectData(updateProject);
            }}
          >
            Update
          </Button>
          <Button
            className="w-[40%]"
            onClick={() => {
              router.push("/dashboard");
            }}
          >
            Back
          </Button>
        </div>
      </div>
      <div className="h-full flex items-center ">
        <img
          src={currentProject?.project_Img}
          className="w-full sm:h-[600px] sm:p-10 h-[300px] "
        />
      </div>
    </div>
  );
};

export default ProjectSettings;
