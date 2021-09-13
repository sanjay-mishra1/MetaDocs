import React from "react";
import dynamic from "next/dynamic";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertFromRaw, convertToRaw, EditorState } from "draft-js";
import { storeData } from "../hooks/StoreDB";
import { getData } from "../hooks/GetDB";
const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((module) => module.Editor),
  { ssr: false }
);
function TextEditor({ id, userId }) {
  const [editorState, setEditorState] = React.useState(
    EditorState.createEmpty()
  );
  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    storeData(convertToRaw(editorState.getCurrentContent()), {
      emailId: userId,
      id,
    });
  };

  React.useEffect(() => {
    console.log("inside useeffect");
    getData({ id, emailId: userId }).then((docs) => {
      console.log("inside func");
      if (docs && docs.data)
        setEditorState(
          EditorState.createWithContent(convertFromRaw(docs.data))
        );
      else console.log("data is null");
    });
  }, []);
  console.log();
  return (
    <div className="bg-[#F8F9FA] top  pb-16">
      <Editor
        toolbarClassName="editor-toolbar-top flex sticky top-0 z-50 !justify-center mx-auto"
        editorClassName="mt-6 bg-white shadow-lg max-w-5xl mx-auto mb-12 border p-6 page-height"
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
      />
    </div>
  );
}

export default TextEditor;
