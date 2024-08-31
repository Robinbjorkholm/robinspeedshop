"use client";
import React,{useEffect} from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
function Admin() {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user?.admin === false) {
      router.push("/");
    }
  }, [session]);
  return <div>Admin</div>;
}

export default Admin;
