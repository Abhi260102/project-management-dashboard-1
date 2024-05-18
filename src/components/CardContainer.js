import React, { act, useEffect, useState } from "react";
import Card from "antd/es/card/Card";
import { Avatar, Popover } from "antd";
import { FireOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { ProjectElements } from "./Store";
import TaskModal from "./TaskModal";

const CardItem = ({
  title,
  column,
  headingColor,
  cards,
  setCards,
  selectedProjectIndex,
}) => {
  const ProjectData = ProjectElements((state) => state.ProjectData);
  const setProjectData = ProjectElements((state) => state.setProjectData);

  const [active, setActive] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleDragStart = (event, card) => {
    setDragActive(true);
    event.dataTransfer.setData("cardId", card.id);
  };
  const handleDragOver = (e) => {
    e.preventDefault();
    highlightIndicator(e);
    setActive(true);
  };
  const highlightIndicator = (e) => {
    const Indicators = getIndicators();
    cleaHighlight(Indicators);
    const ele = getNearestIndicator(e, Indicators);
    ele.element.style.opacity = "1";
  };

  const cleaHighlight = (ele) => {
    const Indicators = ele || getIndicators();

    Indicators.forEach((i) => {
      i.style.opacity = "0";
    });
  };

  const getNearestIndicator = (e, Indicators) => {
    const Distance_Offset = 50;
    const el = Indicators.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = e.clientY - (box.top + Distance_Offset);
        if (offset < 0 && offset > closest.offset)
          return { offset: offset, element: child };
        else return closest;
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        element: Indicators[Indicators.length - 1],
      }
    );
    return el;
  };

  const getIndicators = () => {
    return Array.from(document.querySelectorAll(`[data-column="${column}"]`));
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    cleaHighlight();
    setActive(false);
  };
  const handleDragEnd = (e) => {
    e.preventDefault();
    cleaHighlight();
    const cardId = e.dataTransfer.getData("cardId");
    const indicators = getIndicators();
    const { element } = getNearestIndicator(e, indicators);
    const before = element.dataset.before || "-1";

    if (before !== cardId) {
      let copy = [...cards];

      let cardTransfer = copy.find((c) => c.id === cardId);
      if (!cardTransfer) return;

      cardTransfer = { ...cardTransfer, status_code: column };
      copy = copy.filter((c) => c.id !== cardId);

      const moveToBack = before === "-1";

      if (moveToBack) {
        copy.push(cardTransfer);
      } else {
        const insertAtIndex = copy.findIndex((el) => el.id === before);
        if (insertAtIndex === undefined) return;

        copy.splice(insertAtIndex, 0, cardTransfer);
      }
      let projectTaskChange = [...ProjectData];
      projectTaskChange[selectedProjectIndex].tasks = copy;

      setProjectData(projectTaskChange);
      setCards(copy);
    }
    setDragActive(false);
    setActive(false);
  };
  function truncateString(string) {
    if (string.length <= 50) {
      return string;
    } else {
      return string.slice(0, 50) + "...";
    }
  }

  const DropIndicator = ({ beforeID, column }) => {
    return (
      <div
        data-before={beforeID || "-1"}
        data-column={column}
        className="my-0.5 h-0.5 w-full bg-violet-400 rounded-lg opacity-0"
      ></div>
    );
  };
  function getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  const filterCards =
    cards.length > 0
      ? cards?.filter((card) => {
          return card.status_code == column;
        })
      : 0;

  return (
    <div className="w-56 shrink-0">
      <div className="mb-3 flex items-center justify-between">
        <h3 className={`font-medium ${headingColor}`}>{title}</h3>
        <span className="rounded text-sm text-neutral-600 ">
          {filterCards.length}
        </span>
      </div>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDragEnd}
        className={`h-full w-full max-h-[60vh] overflow-y-scroll overflow-x-hidden rounded-lg transition-colors ${
          !active ? "bg-neutral-800/10" : "bg-blue-100"
        }`}
      >
        {filterCards.length > 0 &&
          filterCards.map((e) => {
            return (
              <>
                <DropIndicator beforeID={e.id} column={column} />

                <div
                  key={index}
                  onDragStart={(event) => handleDragStart(event, e)}
                  draggable="true"
                  className="relative rounded-lg p-[12px] w-[100%] bg-white active:cursor-grabbing border-2 border-slate-200 cursor-pointer"
                >
                  {
                    <TaskModal
                      taskDetails={e}
                      selectedProjectIndex={selectedProjectIndex}
                      column={column}
                      id={e.id}
                      setCards={setCards}
                      height={"120px"}
                    />
                  }
                  <p
                    className={`text-[14px] flex justify-between w-full  items-center ${headingColor}`}
                  >
                    {" "}
                    {e.name}{" "}
                    <abbr title={e.Project_manager} className="cursor-pointer">
                      {" "}
                      <Avatar
                        size={27}
                        style={{
                          backgroundColor: `${getRandomColor()}`,
                          color: `white`,
                        }}
                      >
                        {e.Project_manager.charAt(0)}{" "}
                      </Avatar>
                    </abbr>
                  </p>
                  <p className="text-sm p-1">{truncateString(e.description)}</p>
                  <p className="flex w-full justify-between mt-2">
                    <Avatar.Group>
                      {e.assignees.map((member, index) => (
                        <abbr
                          title={`${member}`}
                          key={index}
                          className="cursor-pointer"
                        >
                          <Avatar
                            size={27}
                            style={{
                              backgroundColor: `${getRandomColor()}`,
                              color: `white`,
                            }}
                          >
                            {member.charAt(0)}{" "}
                          </Avatar>{" "}
                        </abbr>
                      ))}
                    </Avatar.Group>
                    <Avatar
                      size={27}
                      style={{
                        backgroundColor: `${getRandomColor()}`,
                        color: `white`,
                      }}
                    >
                      {e.Review_manager.charAt(0)}{" "}
                    </Avatar>
                  </p>
                </div>
              </>
            );
          })}
        <DropIndicator beforeID="-1" column={column} />

        <div className=" relative border-2 border-neutral-300 flex items-center justify-center bg-white p-1 rounded-lg cursor-pointer ">
          {" "}
          <TaskModal
            taskDetails={undefined}
            selectedProjectIndex={selectedProjectIndex}
            column={column}
            id={"-1"}
            setCards={setCards}
            height={"40px"}
          />
          <PlusOutlined />{" "}
        </div>
      </div>
    </div>
  );
};

const CardContainer = ({ cards, setCards, selectedProjectIndex }) => {
  console.log(cards);
  return (
    <>
      <CardItem
        title="TODO"
        column="todo"
        headingColor="text-yellow-500"
        cards={cards}
        setCards={setCards}
        selectedProjectIndex={selectedProjectIndex}
      />
      <CardItem
        title="In Progress"
        column="doing"
        headingColor="text-blue-500"
        cards={cards}
        setCards={setCards}
        selectedProjectIndex={selectedProjectIndex}
      />
      <CardItem
        title="Completed"
        column="done"
        headingColor="text-emerald-500"
        cards={cards}
        setCards={setCards}
        selectedProjectIndex={selectedProjectIndex}
      />
      <CardItem
        title="Backlog"
        column="backlog"
        headingColor="text-neutral-500"
        cards={cards}
        setCards={setCards}
        selectedProjectIndex={selectedProjectIndex}
      />
      <DeleteArea
        setCards={setCards}
        selectedProjectIndex={selectedProjectIndex}
      />
    </>
  );
};

export default CardContainer;

const DeleteArea = ({ setCards, selectedProjectIndex }) => {
  const ProjectData = ProjectElements((state) => state.ProjectData);
  const setPorjectData = ProjectElements((state) => state.setProjectData);
  const [active, setActive] = useState(false);
  const handleDragOver = (e) => {
    e.preventDefault();
    setActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setActive(false);
  };

  const handleDragEnd = (e) => {
    const currCardId = e.dataTransfer.getData("cardId");

    console.log(selectedProjectIndex);
    const projects = [...ProjectData];
    const curr_project = { ...projects[selectedProjectIndex] };
    curr_project.tasks = curr_project.tasks.filter(
      (task) => task.id !== currCardId
    );
    // console.log(curr_project.tasks);
    projects[selectedProjectIndex] = curr_project;
    setPorjectData(projects);
    setCards(curr_project.tasks);
    setActive(false);
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDragEnd}
      className={`mt-0 grid h-56 self-center w-56 shrink-0 place-content-center rounded border text-3xl ${
        active
          ? "border-red-500 bg-red-100/80 text-red-500"
          : "border-neutral-500 bg-neutral-200/80 text-neutral-500"
      } `}
    >
      {active ? (
        <FireOutlined className="animate-bounce" />
      ) : (
        <DeleteOutlined />
      )}
    </div>
  );
};
