import { getSession, signOut, useSession } from "next-auth/client";
import React from "react";
import Login from "../../components/Login";
import Icon from "@material-tailwind/react/Icon";
import { useRouter } from "next/dist/client/router";
import useFirestore from "../../hooks/useFirestore";
import Button from "@material-tailwind/react/Button";
import dynamic from "next/dynamic";
// import WorkBook from "../../components/WorkBook";
var WorkBook = dynamic(() => import("../../components/WorkBook"), {
  ssr: false,
});
export default function doc() {
  const [session] = useSession();
  const router = useRouter();

  if (!session) return <Login />;
  const { id } = router.query;
  const { docs } = useFirestore(id);
  console.log(docs);
  if (docs && docs === "404") {
    router.replace("/");
  }
  return (
    <>
      <header className="bg-white sticky top-0 z-50 flex justify-between items-center ">
        <span onClick={() => router.push("/")} className="cursor-pointer">
          <Icon name="description" size="3xl" color="blue" />
        </span>

        <div className="flex-grow px-2">
          {docs && docs !== "404" && <h2>{docs.fileName}</h2>}

          <div className="flex items-center text-sm space-x-1 -ml-1 h-8 text-gray-600">
            <p className="option">File</p>
            <p className="option">Edit</p>
            <p className="option">View</p>
            <p className="option">Insert</p>
            <p className="option">Format</p>
            <p className="option">Tools</p>
          </div>
        </div>
        <Button
          color="lightBlue"
          buttonType="filled"
          size="regular"
          className="hidden md:inline-flex h-10"
        >
          <Icon name="people" size="md" />
          Share
        </Button>
        <img
          className="cursor-pointer rounded-full h-10 w-10 ml-2"
          src={session.user.image}
          onClick={() => signOut()}
          alt="user logout"
        />
      </header>
      <div className="fixed">
        <WorkBook id={id} userId={session.user.email} />
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: {
      session,
    },
  };
}
