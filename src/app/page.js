"use client";

import { redirect } from "next/navigation";
import Image from "next/image";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    redirect("/loginPage");
  }, []);
  return <></>;
}
