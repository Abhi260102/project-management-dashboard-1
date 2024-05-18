"use client";
import Sidebar from "@/components/Sidebar";
import { NavElement, UserElement } from "@/components/Store";
import { useRouter } from "next/navigation";

export default function RootLayout({ Tasks, Projects }) {
  const router = useRouter();

  const UserDetails = UserElement((state) => state.User);
  const useNavElement = NavElement((state) => state.value);

  if (UserDetails.username === "") router.push("/loginPage");

  return (
    <div className="sm:flex">
      <Sidebar />
      {useNavElement === "task" && Tasks}
      {useNavElement === "project" && Projects}
    </div>
  );
}
