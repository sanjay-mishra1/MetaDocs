import Head from "next/head";
import Header from "../components/Header";
import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import Image from "next/image";
import { getSession, useSession } from "next-auth/client";
import Login from "../components/Login";
import Model from "@material-tailwind/react/Modal";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalFooter from "@material-tailwind/react/ModalFooter";
import React from "react";
import { db } from "../firebase";
import useFirestore from "../hooks/useFirestore";
import DocumentRow from "../components/DocumentRow";
import { fileTypes } from "../files/Lists";
import apis from "../files/apis";
export default function Home() {
  const [session] = useSession();
  const [showModel, setShowModel] = React.useState(false);
  const [input, setInput] = React.useState("");
  const [fileType, setFileType] = React.useState(fileTypes[0]);
  const { docs } = useFirestore(fileType.dbPath);
  console.log("doc found for type", fileType, docs);
  const createDocument = () => {
    if (!input) return;
    apis.createDocs(session.user.email, input, fileType.dbPath);
    setInput("");
    setShowModel(false);
  };
  if (!session) return <Login />;
  const model = (
    <Model size="sm" active={showModel} toggler={() => setShowModel(false)}>
      <ModalBody>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          className="outline-none w-full"
          placeholder="Enter name of document"
          onKeyDown={(e) => e.key === "Enter" && createDocument()}
        />
      </ModalBody>
      <ModalFooter>
        <Button
          color="blue"
          buttonType="link"
          onClick={(e) => setShowModel(false)}
          ripple="dark"
        >
          Cancel
        </Button>
        <Button color="blue" onClick={createDocument} ripple="light">
          Create
        </Button>
      </ModalFooter>
    </Model>
  );
  return (
    <div>
      <Head>
        <title>Meta Docs</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header setFileType={setFileType} />
      {model}
      <section className="bg-[#F8F9FA] pb-10 px-10">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between py-6">
            <h2 className="text-gray-700 text-lg">Start a new document</h2>
            <Button
              color="gray"
              ripple="dark"
              buttonType="outline"
              rounded={true}
              iconOnly={true}
              className="border-0"
            >
              <Icon name="more_vert" color="gray" size="3xl" />
            </Button>
          </div>
          <div>
            <div
              onClick={(e) => setShowModel(true)}
              className="relative h-52 w-40 border-2 cursor-pointer hover:border-blue-700"
            >
              <Image
                src="https://ssl.gstatic.com/docs/templates/thumbnails/docs-blank-googlecolors.png"
                layout="fill"
              />
            </div>
            <p className="mt-2 ml-2 font-semibold text-sm text-gray-700">
              Blank
            </p>
          </div>
        </div>
      </section>
      <section className="bg-white px-10 md:px-0">
        <div className="max-w-3xl mx-auto py-8 text-sm text-gray-700">
          <div className="flex items-center justify-between pb-5">
            <h2 className="font-medium flex-grow">My {fileType.name}</h2>
            <p className="mr-12">Date Created</p>
            <Icon name="folder" color="gray" size="3xl" />
          </div>

          {docs &&
            docs.map((document) => (
              <DocumentRow
                key={document.id}
                fileType={fileType}
                id={document.id}
                fileName={document.fileName}
                date={document.timeStamp}
              />
            ))}
        </div>
      </section>
    </div>
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
