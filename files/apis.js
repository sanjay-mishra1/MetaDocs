import { db } from "../firebase";
import firebase from "firebase";

export default {
  async createDocs(userid, name, dbPath) {
    if (dbPath === "form")
      return await this.createForm({
        createdBy: userid,
        name: name,
        description: "",
        fileName: name,
      });
    else
      return await db
        .collection("userDocs")
        .doc(userid)
        .collection(dbPath)
        .add({
          fileName: name,
          timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then((data) => {
          return data;
        });
  },
  async getForms(userId) {
    return await db
      .collection("form")
      .doc("forms")
      .collection("allforms")
      .where("userid", "==", userId)
      .orderBy("createdAt", "desc")
      .get()
      .then((doc) => {
        let arr = [];
        if (!doc.empty) {
          doc.forEach((item) => {
            arr.push({ ...item.data(), _id: item.id });
          });
        }
        return arr;
      });
  },

  async createForm(data) {
    console.log(data);
    return await db
      .collection("form")
      .doc("forms")
      .collection("allforms")
      .add(data)
      .then((res) => {
        return res;
      });
  },

  async getForm(formId) {
    return await db
      .collection("form")
      .doc("forms")
      .collection("allforms")
      .doc(formId)
      .get()
      .then((doc) => {
        console.log((doc, doc.data()));
        if (doc.exists) return { _id: doc.id, ...doc.data(), status: 200 };
        else return { status: 404 };
      });
  },

  async autoSave(data) {
    console.log(data);
    if (data.formId) {
      let id = data.formId;
      delete data["formId"];
      return await db
        .collection("form")
        .doc("forms")
        .collection("allforms")
        .doc(id)
        .update(data)
        .then((res) => {
          return { questions: data.questions };
        })
        .catch((err) => {
          console.log(err);

          return null;
        });
    } else return null;
  },

  async submitResponse(data) {
    console.log(data);
    if (data.formId) {
      return await db
        .collection("form")
        .doc("forms")
        .collection("responses")
        .add(data)
        .then((res) => {
          return { questions: data.questions };
        })
        .catch((err) => {
          console.log(err);

          return null;
        });
    } else return null;
  },

  async getResponse(formId) {
    //  console.log(formId);
    return await db
      .collection("form")
      .doc("forms")
      .collection("responses")
      .where("formId", "==", formId)
      .get()
      .then((doc) => {
        let arr = [];
        if (!doc.empty) {
          doc.forEach((item) => {
            arr.push({ ...item.data(), _id: item.id });
          });
        }
        return arr;
      });
  },
  async uploadImage(data) {
    return {};
  },
};
