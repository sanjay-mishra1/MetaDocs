import { db } from "../firebase";
export const storeData = (data, credentials) => {
  console.log("storing data", data);
  try {
    db.collection("userDocs")
      .doc(credentials.emailId)
      .collection(credentials.path)
      .doc(credentials.id)
      .update({ data: data })
      .then((data) => {
        console.log(data);
      });
  } catch (error) {
    console.log(error);
  }
};
