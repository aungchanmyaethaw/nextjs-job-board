import Jobs from "@/components/Jobs";
import Layout from "@/components/Layout";
import { getJobsbyCategory } from "@/lib/getData";
import prisma from "@/lib/prisma";
import { useRouter } from "next/router";
import React from "react";

const Category = ({ jobs }) => {
  const router = useRouter();
  return (
    <Layout>
      <h2 className="mb-8 text-5xl font-bold"> Jobs</h2>
      {jobs.length > 0 ? (
        <Jobs jobs={jobs} />
      ) : (
        <p className="mt-4 text-lg text-center">No jobs for category</p>
      )}
    </Layout>
  );
};

export default Category;

export async function getServerSideProps(context) {
  const { id } = context.query;
  let jobs = await getJobsbyCategory(id, prisma);
  jobs = JSON.parse(JSON.stringify(jobs));
  return {
    props: {
      jobs,
    },
  };
}
