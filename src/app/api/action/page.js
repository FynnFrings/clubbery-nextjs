"use client";

import { redirect } from "next/navigation";

import { useSearchParams } from "next/navigation";

export default function Home() {
  const searchParams = useSearchParams();

  const pageNumber = searchParams.get("p") ?? "1"; // default value is "1"
  redirect("https://clubbery-release.web.app/__/auth/action?" + searchParams);

  //return <>Current Page is : {pageNumber}</>;
}