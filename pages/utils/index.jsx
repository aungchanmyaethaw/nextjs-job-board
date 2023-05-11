import React from "react";
import { Button } from "@tremor/react";
import axios from "axios";

const tasks = [
  {
    label: "Clean database",
    type: "clean_database",
  },
  {
    label: "Generate 10 users and some jobs.",
    type: "generate_users_and_jobs",
  },
  {
    label: "Generate 1 job",
    type: "generate_one_job",
  },
];

const Utils = () => {
  return (
    <section className="container mx-auto mt-10">
      <h2 className="mb-10 text-4xl font-bold text-center text-slate-800">
        Data Generation
      </h2>
      <div className="flex flex-wrap justify-center gap-8 ">
        {tasks.map((task) => (
          <Button
            color="indigo"
            key={task.type}
            onClick={async () => {
              await axios.post("/api/utils", {
                task: task.type,
              });
            }}
          >
            {task.label}
          </Button>
        ))}
      </div>
    </section>
  );
};

export default Utils;
