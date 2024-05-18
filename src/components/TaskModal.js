import { Button, DatePicker, Input, Popover, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useState } from "react";
import { UserOutlined, FormOutlined } from "@ant-design/icons";
import { ProjectElements } from "./Store";
import dayjs from "dayjs";

const TaskModal = ({
  taskDetails,
  selectedProjectIndex,
  column,
  id,
  setCards,
  height,
}) => {
  const projectsData = ProjectElements((state) => state.ProjectData);
  const setProjectData = ProjectElements((state) => state.setProjectData);

  const [ModifyTask, setModifyTask] = useState(
    taskDetails || {
      name: "",
      description: "",
      assignees: [],
      Review_manager: "",
      Project_manager: "",
      deadline: new Date().toUTCString(),
      status_code: column,
      isCompleted: false,
      id: projectsData[selectedProjectIndex].tasks.length + 1,
    }
  );
  const [optionAssignees, setoptionAssignees] = useState("");
  const [popOpen, setpopOpen] = useState(false);
  const popContentTask = (
    <div>
      <p className="flex flex-col gap-2">
        <Input
          size="large"
          placeholder="Name of Task"
          value={ModifyTask.name}
          onChange={(e) =>
            setModifyTask((prev) => ({
              ...prev,
              ["name"]: e.target.value,
              ["id"]: `${ModifyTask.id}`,
            }))
          }
          prefix={<FormOutlined />}
        />

        <TextArea
          rows={4}
          placeholder="Description"
          value={ModifyTask.description}
          maxLength={100}
          onChange={(e) =>
            setModifyTask((prev) => ({
              ...prev,
              ["description"]: e.target.value,
            }))
          }
        />
        <Input
          size="large"
          placeholder="Review Manager"
          value={ModifyTask.Review_manager}
          onChange={(e) =>
            setModifyTask((prev) => ({
              ...prev,
              ["Review_manager"]: e.target.value,
            }))
          }
          prefix={<UserOutlined />}
        />
        <Input
          size="large"
          placeholder="Project Manager"
          value={ModifyTask.Project_manager}
          onChange={(e) =>
            setModifyTask((prev) => ({
              ...prev,
              ["Project_manager"]: e.target.value,
            }))
          }
          prefix={<UserOutlined />}
        />
        <DatePicker
          defaultValue={dayjs(ModifyTask.deadline, "YYYY-MM-DD")}
          format={"YYYY-MM-DD"}
          onChange={(date, dateString) => {
            setModifyTask((prev) => ({
              ...prev,
              ["deadline"]: dateString,
            }));
          }}
        />
        <Select
          mode="multiple"
          allowClear
          className="max-w-[250px]"
          defaultValue={ModifyTask.assignees}
          placeholder="Assignees"
          onChange={(members) =>
            setModifyTask((prev) => ({ ...prev, ["assignees"]: members }))
          }
          options={optionAssignees}
        />
        {/* <Select
          className="max-w-[250px]"
          placeholder="Task Status "
          defaultValue={column}
          onChange={(status) =>
            setModifyTask((prev) => ({ ...prev, ["status_code"]: status }))
          }
          options={[
            { value: "todo", label: "todo" },
            { value: "doing", label: "doing" },
            { value: "done", label: "done" },
            { value: "backlog", label: "backlog" },
          ]}
        /> */}
        <Button
          type="primary"
          onClick={(e) => {
            const newProjectData = [...projectsData];
            {
              id !== "-1"
                ? (newProjectData[selectedProjectIndex].tasks = newProjectData[
                    selectedProjectIndex
                  ].tasks.map((task) => {
                    if (task.id === id) {
                      return ModifyTask;
                    }
                    return task;
                  }))
                : newProjectData[selectedProjectIndex].tasks.push(ModifyTask);
            }

            setProjectData(newProjectData);

            setCards(newProjectData[selectedProjectIndex].tasks);
            setpopOpen(!popOpen);
          }}
        >
          {id === "-1" ? "Add" : "Update"}
        </Button>
        <Button onClick={() => setpopOpen(!popOpen)}>{popOpen} Close</Button>
        {/* {console.log(ModifyTask)}; */}
      </p>
    </div>
    // <></>
  );

  return (
    <Popover
      title="Title"
      trigger="click"
      placement="right"
      open={popOpen}
      content={popContentTask}
      onOpenChange={(e) => {
        let optionValues = [];
        projectsData[selectedProjectIndex].assignees.map((member) => {
          optionValues.push({
            value: member,
            label: member,
          });
        });
        setoptionAssignees(optionValues);
        setpopOpen(e);
      }}
    >
      <div
        className={`absolute left-0 top-0 min-h-full min-w-56 cursor-pointer opacity-70 z-20`}
      ></div>
    </Popover>
  );
};

export default TaskModal;
