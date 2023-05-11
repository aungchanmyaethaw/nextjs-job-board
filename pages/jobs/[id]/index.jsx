import React from "react";
import prisma from "@/lib/prisma";
import { getJob, checkAlreadyApplied } from "@/lib/getData";
import { Button, Card } from "@tremor/react";
import Link from "next/link";
import Layout from "@/components/Layout";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
export default function JobDetail({ job, hasApplied }) {
  return (
    <Layout>
      <section className="mb-4">
        <Link href="/" className="text-xl bold text-slate-900">
          Back
        </Link>
      </section>

      <Card decoration="top" decorationColor="green" className="mb-4">
        <h2
          className="block mb-2 text-xl font-semibold underline "
          href={`/jobs/${job.id}`}
        >
          {job.title}
        </h2>
        <p className="font-normal text-gray-600">{job.description}</p>
        <p className="mt-2">
          Posted by{" "}
          <Link
            className="text-base font-medium underline"
            href={`/companies/${job.author.id}`}
          >
            {job.author.name}
          </Link>
        </p>
      </Card>
      {hasApplied ? (
        <Link className="block font-bold underline" href={`/dashboard`}>
          You already applied! Go to dashboard
        </Link>
      ) : (
        <Link href={`/jobs/${job.id}/apply`}>
          <Button>Apply for this Job</Button>
        </Link>
      )}
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { id: jobId } = context.params;
  const session = await getServerSession(context.req, context.res, authOptions);

  let job = await getJob(prisma, jobId);
  job = JSON.parse(JSON.stringify(job));

  const hasApplied = await checkAlreadyApplied(session.user.id, jobId, prisma);

  return {
    props: {
      job,
      hasApplied,
    },
  };
}
