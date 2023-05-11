import React from "react";
import Navbar from "./Navbar";
import Head from "next/head";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Software Developer Jobs</title>
      </Head>
      <Navbar />
      <main className="container mx-auto max-w-[1440px] px-4 py-10">
        {children}
      </main>
    </>
  );
}
