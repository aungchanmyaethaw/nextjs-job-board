import React, { useState } from "react";
import Layout from "@/components/Layout";
import { TextInput, Button } from "@tremor/react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
const New = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const onSubmit = async (data) => {
    setLoading(true);
    await axios.post("/api/jobs", { ...data, userId: session.user.id });
    setLoading(false);

    router.push("/dashboard");
  };

  return (
    <Layout>
      <section className="max-w-lg mx-auto">
        <h2 className="text-xl font-medium text-slate-800">Post new job</h2>
        <form
          className="flex flex-col gap-8 mt-3"
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextInput
            placeholder="Job title"
            {...register("title", { required: true })}
          />

          <TextInput
            placeholder="Salary"
            {...register("salary", { required: true })}
          />
          <TextInput
            placeholder="Location"
            {...register("location", { required: true })}
          />
          <textarea
            className="px-4 py-2 mt-1 text-sm border rounded-md shadow-sm focus:outline-none focus:ring-blue-200 focus:ring"
            placeholder="Job description"
            {...register("description", { required: true })}
          />
          <Button color="indigo" loading={loading}>
            Save
          </Button>
        </form>
      </section>
    </Layout>
  );
};

export default New;
