import Link from "next/link";
import { getCategories, getJobs, getUser } from "@/lib/getData";
import Layout from "@/components/Layout";
import prisma from "@/lib/prisma";
import Jobs from "@/components/Jobs";
import { Badge, Button, List, ListItem, Card, Title } from "@tremor/react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";

export default function Home({ jobs, user, categories }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (session & !session?.user.name) {
    router.push("/setup");
  }

  return (
    <Layout>
      <section className="text-center">
        {!session ? (
          <Link href="/api/auth/signin">
            <Button color="green">Login</Button>
          </Link>
        ) : (
          <Button color="red" onClick={signOut}>
            Log out
          </Button>
        )}

        <h2 className="mb-8 text-5xl font-bold">Software Developer Jobs</h2>

        {session ? (
          <div className="my-10 ">
            <h3>
              Welcome ,{user.name}
              {user.isCompany ? (
                <Badge className="ml-4">Company</Badge>
              ) : null}{" "}
            </h3>
            <div className="flex items-center justify-center gap-4 mt-4">
              {user.isCompany ? (
                <>
                  <Link href="/new">
                    <Button>Post a new job</Button>
                  </Link>
                  <Link href="/dashboard">
                    <Button>View Jobs You Posted.</Button>
                  </Link>
                </>
              ) : (
                <Link href="/dashboard">
                  <Button>View Jobs You applied to</Button>
                </Link>
              )}
            </div>
          </div>
        ) : null}

        <div className="grid grid-cols-4 gap-2 ">
          <Jobs jobs={jobs} />
          <aside className="col-span-1 ">
            <Card>
              <Title>Browse by Category</Title>
              <List>
                {categories?.map((category) => (
                  <ListItem key={category.id}>
                    <Link href={`/jobs/category/${category.id}`}>
                      {category.name}
                    </Link>
                    <span>{category.jobs.length}</span>
                  </ListItem>
                ))}
              </List>
            </Card>
          </aside>
        </div>
      </section>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);

  let jobs = await getJobs(prisma);
  jobs = JSON.parse(JSON.stringify(jobs));
  let categories = await getCategories(prisma);
  categories = JSON.parse(JSON.stringify(categories));

  if (!session) {
    return {
      props: {
        jobs: jobs,
        categories,
      },
    };
  }

  let user = await getUser(prisma, session?.user?.id);
  user = JSON.parse(JSON.stringify(user));
  return {
    props: {
      jobs,
      user,
      categories,
    },
  };
}
