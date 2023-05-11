import React from "react";
import Job from "./Job";
const Jobs = ({ jobs }) => {
  return (
    <div className="flex flex-col col-span-3 gap-4 ">
      {jobs.map((job) => (
        <Job job={job} key={job.title} />
      ))}
    </div>
  );
};

export default Jobs;
