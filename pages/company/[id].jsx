import Job from "@/components/Job";
import Layout from "@/components/Layout";
import { getUser, getCompanyJobs } from "@/lib/getData";
import prisma from "@/lib/prisma";
import Link from "next/link";
import React from "react";

export default function Company({ company, jobs }) {
  console.log(company, jobs);

  return (
    <Layout>
      <section className="mb-8">
        <Link href="/" className="text-xl bold text-slate-900">
          Back
        </Link>
      </section>
      <h1 className="mt-1 mb-4 text-3xl font-bold text-center text-slate-900">
        {company.name}
      </h1>
      <h2 className="mt-3 mb-8 text-2xl font-semibold">
        Opening jobs at {company.name}
      </h2>
      <ul className="mt-3 space-y-4">
        {jobs.map((job) => (
          <Job job={job} key={job.id} />
        ))}
      </ul>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  let company = await getUser(prisma, context.params.id);
  let jobs = await getCompanyJobs(prisma, context.params.id);

  company = JSON.parse(JSON.stringify(company));
  jobs = JSON.parse(JSON.stringify(jobs));

  return {
    props: { company, jobs },
  };
}
