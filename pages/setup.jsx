import Layout from "@/components/Layout";
import { Button, Card, TextInput, Title } from "@tremor/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
export default function Setup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();
  const onSubmit = async (data) => {
    setLoading(true);
    await axios.post("/api/setup", { ...data, userId: session.user.id });
    setLoading(false);
    session.user.name = data.name;
    session.user.isCompany = data.sCompany;
    router.push("/");
  };

  return (
    <Layout>
      <Card className="max-w-md mx-auto">
        <Title>Setup your profile</Title>
        <form className="mt-3" onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            className="mt-1 mb-4"
            placeholder="Name"
            {...register("name", { required: true })}
            error={errors.name}
          />
          <div>
            <label htmlFor="isCompany">Are you a company?</label>
            <input
              className="block p-1 mt-1"
              type="checkbox"
              id="isCompany"
              {...register("isCompany", { required: false })}
            />
          </div>
          <Button className="mt-4" color="green" loading={loading}>
            Save
          </Button>
        </form>
      </Card>
    </Layout>
  );
}
