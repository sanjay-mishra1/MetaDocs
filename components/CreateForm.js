import React from "react";
import { formDefault } from "../files/Lists";
import EditForm from "./forms/Form/EditForm";

export default function CreateForm({ formId, userid, userimage }) {
  return (
    <div style={{ ...formDefault }}>
      <EditForm formId={formId.id} userid={userid} userimage={userimage} />
    </div>
  );
}
