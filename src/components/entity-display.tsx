"use client";

import { Entity } from "@/db/schema";
import { useEffect, useState } from "react";
import Title from "./title";
import Link from "next/link";

export default function EntityDisplay({ id }: { id: string }) {
  const [data, setData] = useState<Entity>();
  useEffect(() => {
    fetch(`/api/entity?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setData(data[0]);
      });
  }, [id]);

  return (
    <div>
      <Title>{data?.name}</Title>
      <h2>{data?.type}</h2>
      <p>{data?.description}</p>
      <h2 className="mt-2">Address</h2>
      <p>{data?.address1}</p>
      <p>{data?.address2}</p>
      <p>
        {data?.city}, {data?.state} {data?.zip}
      </p>
      <p>{data?.country}</p>
      <h2 className="mt-2">Contact</h2>
      <Link href={data?.url || " "}>
        <p>{data?.url}</p>
      </Link>
      <h2 className="mt-2">Hours</h2>
      <ul>{data?.hours?.map((hour, index) => <p key={index}>{hour}</p>)}</ul>
      <p className="text-xs">({data?.utc} minutes from UTC)</p>
    </div>
  );
}
