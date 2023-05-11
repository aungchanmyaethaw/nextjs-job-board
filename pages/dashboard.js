import React from "react";
import {
  Table,
  Title,
  Card,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text,
  Badge,
  Button,
} from "@tremor/react";
import { getServerSession } from "next-auth/next";
import Layout from "@/components/Layout";
import { authOptions } from "./api/auth/[...nextauth]";
import { getJobsPosted, getUser, getUserApplications } from "@/lib/getData";
import { useSession } from "next-auth/react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";

export default function Dashboard({ user, jobs, applications }) {
  const { data: session } = useSession();

  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  };

  async function handleClick(task, jobId) {
    await axios.patch("/api/jobs", {
      id: jobId,
      task,
    });
    refreshData();
  }

  async function handleDelete(id) {
    try {
      const result = await axios.delete(`api/jobs/${id}`);
      toast.success(result.data.message);
    } catch (error) {
      console.log(error.message);
    }
    refreshData();
  }

  return (
    <Layout>
      <section className="mt-4 text-center">
        <Title className="mb-2 text-4xl">Dashboard</Title>
        <h3>
          Welcome ,{user.name}
          {user.isCompany ? (
            <Badge color="indigo" className="ml-4">
              Company
            </Badge>
          ) : null}{" "}
        </h3>
        {session ? (
          <h3 className="mt-4 text-2xl font-semibold">
            {user.isCompany ? "Jobs Your Posted" : "Your Job Applications"}
          </h3>
        ) : null}
        {user.isCompany ? (
          <Card>
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeaderCell>Title</TableHeaderCell>
                  <TableHeaderCell>Description</TableHeaderCell>
                  <TableHeaderCell>Status</TableHeaderCell>
                  <TableHeaderCell>Applications</TableHeaderCell>
                  <TableHeaderCell>Actions</TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {jobs.map((job) => (
                  <TableRow key={job.title}>
                    <TableCell>{job.title}</TableCell>
                    <TableCell>
                      <Text>{job.description}</Text>
                    </TableCell>
                    <TableCell>
                      {job.published ? (
                        <Badge
                          color="green"
                          onClick={() => handleClick("unpublish", job.id)}
                        >
                          Published
                        </Badge>
                      ) : (
                        <Badge
                          color="red"
                          onClick={() => handleClick("publish", job.id)}
                        >
                          Unpublished
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      {job.applications.length > 0 ? (
                        <Text>{job.applications.length}</Text>
                      ) : null}
                    </TableCell>
                    <TableCell>
                      <Button color="red" onClick={() => handleDelete(job.id)}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        ) : (
          applications.map((item, index) => (
            <div key={item.id} className="flex justify-center gap-6 mt-10 mb-4">
              {
                <Card className="w-full px-4 sm:w-1/2">
                  <Link
                    href={`/jobs/${item.job.id}`}
                    className="text-xl font-bold underline"
                  >
                    {item.job.title}
                  </Link>
                  <p className="mt-3 text-base font-normal">
                    {item.coverletter}
                  </p>
                </Card>
              }
            </div>
          ))
        )}
      </section>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);

  let user = await getUser(prisma, session.user.id);
  user = JSON.parse(JSON.stringify(user));

  let jobs = [];
  let applications = [];

  if (user.isCompany) {
    jobs = await getJobsPosted(user.id, prisma);
    jobs = JSON.parse(JSON.stringify(jobs));
  } else {
    applications = await getUserApplications(user.id, prisma);
    applications = JSON.parse(JSON.stringify(applications));
  }

  return {
    props: {
      user,
      jobs,
      applications,
    },
  };
}
