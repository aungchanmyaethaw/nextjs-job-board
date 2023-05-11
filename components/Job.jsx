import { Card } from "@tremor/react";
import React from "react";
import Link from "next/link";
const Job = ({ job }) => {
  return (
    <Card decoration="top" decorationColor="green">
      <Link
        className="block mb-2 text-xl font-semibold underline "
        href={`/jobs/${job.id}`}
      >
        {job.title}
      </Link>
      <p className="font-normal text-gray-600 line-clamp-1">
        {job.description}
      </p>
      <p className="mt-2">
        Posted by{" "}
        <Link
          className="text-base font-medium underline"
          href={`/company/${job.author.id}`}
        >
          {job.author.name}
        </Link>
      </p>
    </Card>
  );
};

export default Job;
