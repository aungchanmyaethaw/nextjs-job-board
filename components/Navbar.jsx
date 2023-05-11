import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <nav>
      <div className=" bg-neutral-900 container mx-auto max-w-[1440px] p-4 text-white">
        <Link href="/" className="text-2xl font-bold w-max hover:text-gray-400">
          TokyoDev
        </Link>
      </div>
    </nav>
  );
}
