"use client";
import React, { useEffect, useState } from "react";
import { UserOutlined, RightOutlined } from "@ant-design/icons";
import { Select } from "antd";
import { ProjectElements } from "@/components/Store";
import CardContainer from "@/components/CardContainer.js";
import { DragDropContext } from "@hello-pangea/dnd";
import { Draggable, Droppable } from "@hello-pangea/dnd";

const Task = () => {
  const projectsData = ProjectElements((state) => state.ProjectData);
  const [cards, setCards] = useState({});

  const [Projects, SetProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(0);
  useEffect(() => {
    let ProjectsArray = [];

    projectsData.map((e, index) =>
      ProjectsArray.push({ label: e.projectName, value: index })
    );
    SetProjects(ProjectsArray);
    setCards(projectsData[0].tasks);
  }, []);
  return (
    <div className="w-full bg-white text-black h-screen ">
      <p className="p-10 font-bold text-4xl  ">
        <RightOutlined /> Task Manager
      </p>
      <p className=" px-10 text-md font-bold">
        Select a Project:{" "}
        <Select
          placeholder="select project"
          defaultValue={projectsData[0].projectName}
          options={Projects}
          onChange={(value) => {
            setSelectedProject(value);
            setCards(projectsData[value].tasks);
          }}
        />
      </p>
      <div className=" sm:h-[78%] w-full ">
        <div className="flex h-full w-full gap-3 overflow-x-scroll p-12 ">
          <CardContainer
            cards={cards}
            setCards={setCards}
            selectedProjectIndex={selectedProject}
          />
        </div>
      </div>
    </div>
  );
};

export default Task;
