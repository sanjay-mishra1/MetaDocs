import { db } from "../firebase";
export const getData = async (credentials) => {
  try {
    return db
      .collection("userDocs")
      .doc(credentials.emailId)
      .collection(credentials.path)
      .doc(credentials.id)
      .get()
      .then((doc) => {
        return doc.data();
      });
  } catch (error) {
    return null;
  }
};
