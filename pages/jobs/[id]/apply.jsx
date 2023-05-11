import Layout from "@/components/Layout";
import { getJob } from "@/lib/getData";
import { Button } from "@tremor/react";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

const Apply = ({ job }) => {
  const [coverletter, setCoverletter] = useState("");
  const [loading, setLoading] = useState(false);

  const { data: session } = useSession();

  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    await axios.post("/api/application/", {
      coverletter,
      job: job.id,
      userId: session.user.id,
    });
    setLoading(false);

    router.push("/dashboard");
  };

  if (!session) {
    return null;
  }

  return (
    <Layout>
      {" "}
      <section className="max-w-lg mx-auto mb-4 ">
        <div>
          <Link href="/" className="text-xl bold text-slate-900">
            Back
          </Link>
          <h2 className="my-4 text-2xl font-bold text-center">{job.title}</h2>
          <p className="font-normal"> {job.description}</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8">
          <textarea
            className="w-full px-4 py-2 font-medium border rounded outline-none"
            rows={6}
            placeholder="Enter your cover letter"
            value={coverletter}
            onChange={(e) => setCoverletter(e.target.value)}
            required
          ></textarea>
          <div className="flex justify-end mt-6">
            <Button color="green" type="submit" loading={loading}>
              Apply
            </Button>
          </div>
        </form>
      </section>
    </Layout>
  );
};

export default Apply;

export async function getServerSideProps(context) {
  const { id } = context.params;

  let job = await getJob(prisma, id);
  job = JSON.parse(JSON.stringify(job));

  return {
    props: {
      job,
    },
  };
}
