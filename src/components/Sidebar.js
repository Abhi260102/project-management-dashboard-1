"use client";
import { Avatar, Popover } from "antd";
import React, { useEffect } from "react";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { NavElement, UserElement } from "./Store";
import { useParams } from "next/navigation";
const Sidebar = () => {
  const useNavElement = NavElement((state) => state.value);
  const navChange = NavElement((state) => state.navChange);
  const userDetails = UserElement((state) => state.User);
  const setUserDetails = UserElement((state) => state.setUserData);
  const handleChange = (val) => {
    navChange(val);
  };
  console.log(useNavElement);
  return (
    <>
      <div className=" sm:min-w-[260px] sm:flex sm:flex-col hidden sm:visible  flex-row items-center justify-center sm:h-screen  bg-neutral-200">
        <div className=" w-full sm:h-[50%]  flex  sm:flex-col   items-center p-2">
          <Avatar
            style={{
              backgroundColor: "grey",
              verticalAlign: "middle",
            }}
            size={64}
            icon={<UserOutlined />}
          />

          <p className="text-neutral-700 text-xl pt-2 font-bold">
            {" "}
            {userDetails?.username}
          </p>
          <p className="text-neutral-400  font-bold">Employee</p>
        </div>
        <div className="w-full flex sm:block">
          <div
            className={
              "w-full px-2 py-5  cursor-pointer " +
              (useNavElement == "project"
                ? "  bg-[rgba(0,0,0,0.1)]  text-black font-bold"
                : "text-neutral-600")
            }
            onClick={() => handleChange("project")}
          >
            Projects
          </div>
          <div
            className={
              "w-full px-2 py-5 cursor-pointer " +
              (useNavElement == "task"
                ? "  bg-[rgba(0,0,0,0.2)] text-black font-bold"
                : "text-neutral-600")
            }
            onClick={() => handleChange("task")}
          >
            Task Manager
          </div>
          <div
            className="w-full text-center mt-10 text-2xl text-neutral-500 cursor-pointer hover:text-red-600"
            onClick={() => {
              setUserDetails({ username: "", password: "" });
            }}
          >
            {" "}
            <LogoutOutlined /> LogOut
          </div>
        </div>
      </div>
      <div className=" sm:hidden  flex bg-neutral-200 ">
        <div className="flex items-center gap-2 p-2">
          <Popover
            title="Employee"
            content={
              <div div className="flex w-full justify-between">
                <p className="text-neutral-700 text-md font-bold">
                  {userDetails?.username}
                </p>
                <div
                  className="text-md text-neutral-500 cursor-pointer hover:text-red-600"
                  onClick={() => {
                    setUserDetails({ username: "", password: "" });
                  }}
                >
                  {" "}
                  <LogoutOutlined />
                </div>
              </div>
            }
          >
            <Avatar
              style={{
                backgroundColor: "grey",
                verticalAlign: "middle",
              }}
              size={34}
              icon={<UserOutlined />}
            />
          </Popover>

          {/* <p className="text-neutral-700 text-md  font-bold">Edward</p> */}
        </div>
        <div
          className={
            "w-full px-2 py-5  cursor-pointer " +
            (useNavElement == "project"
              ? "  bg-[rgba(0,0,0,0.1)]  text-black font-bold"
              : "text-neutral-600")
          }
          onClick={() => handleChange("project")}
        >
          Projects
        </div>
        <div
          className={
            "w-full px-2 py-5 cursor-pointer " +
            (useNavElement == "task"
              ? "  bg-[rgba(0,0,0,0.2)] text-black font-bold"
              : "text-neutral-600")
          }
          onClick={() => handleChange("task")}
        >
          Task Manager
        </div>
      </div>
    </>
  );
};

export default Sidebar;
