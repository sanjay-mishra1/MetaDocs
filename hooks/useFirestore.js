import { useState, useEffect } from "react";
import { db } from "../firebase";
import { useSession } from "next-auth/client";
const useFirestore = (docId) => {
  const [session] = useSession();
  let uid;
  if (session) uid = session?.user?.email;
  const [docs, setDocs] = useState([]);
  useEffect(() => {
    if (!uid) return null;
    var dbDoc;
    if (docId.toLowerCase().includes("form"))
      dbDoc = db
        .collection("form")
        .doc("forms")
        .collection("allforms")
        .where("createdBy", "==", uid);
    else
      dbDoc = db
        .collection("userDocs")
        .doc(uid)
        .collection(docId)
        .orderBy("timeStamp", "desc");
    try {
      var unsub;
      console.log("file type", docId);

      unsub = dbDoc.onSnapshot((snap) => {
        let documents = [];
        try {
          snap.forEach((doc) => {
            documents.push({ ...doc.data(), id: doc.id });
          });
        } catch (error) {
          //means its not an array
          documents = snap;
        }

        setDocs(documents);
      });
      return () => {
        try {
          unsub();
        } catch (error) {}
      };
    } catch (error) {
      console.log(error);
    }
  }, [uid, docId]);
  return { docs };
};
export default useFirestore;
