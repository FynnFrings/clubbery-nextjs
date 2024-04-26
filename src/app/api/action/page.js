"use client";

import { redirect } from "next/navigation";

import { useSearchParams } from "next/navigation";

export default function Home() {
  const searchParams = useSearchParams();

  const pageNumber = searchParams.get("p") ?? "1"; // default value is "1"
  redirect("https://clubbery-release.web.app/__/auth/action?" + searchParams);

  //return <>Current Page is : {pageNumber}</>;
}
/*
export default async function Home({ params }) {
  const router = useRouter();
  console.log(router.query);
  redirect("/hello-nextjs" +params);
  // ...
}
*/
