import { Entity } from "@/db/schema";
import Link from "next/link";
import ReviewDisplay from "./review-display";

export default async function EntityDisplay({ id }: { id: string }) {
  const res = await fetch(`http:/localhost:3000/api/entity?id=${id}`);
  const rawData = await res.json();
  const data: Entity = rawData[0];

  return (
    <div>
      <h2>{data?.displayType}</h2>
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
      <ReviewDisplay entity_id={id} />
    </div>
  );
}
