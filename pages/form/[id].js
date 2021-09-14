import { Button, Typography } from "@material-ui/core";
import React from "react";
import { useSession, getSession } from "next-auth/client";
import { useRouter } from "next/dist/client/router";
import dynamic from "next/dynamic";
import Login from "../../components/Login";
var CreateForm = dynamic(() => import("../../components/CreateForm"), {
  ssr: false,
});
function UserForm() {
  const [session] = useSession();
  const router = useRouter();

  if (!session) return <Login />;
  return (
    <CreateForm
      userid={session.user.email}
      formId={router.query}
      userimage={session?.user?.image}
    />
  );
}

export default UserForm;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: {
      session,
    },
  };
}
