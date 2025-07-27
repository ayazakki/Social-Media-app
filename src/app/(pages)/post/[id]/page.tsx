import SinglePostDetails from "@/app/_components/SinglePostDetails/SinglePostDetails";
import React from "react";

interface Props {
  params: Promise<{ id: string }>;
}
export default async function page({ params }: Props) {
  const {id} = await params;
  console.log(id);
  
  return <SinglePostDetails id={id}/>;
}
