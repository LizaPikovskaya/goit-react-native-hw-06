import { addDoc, collection, deleteDoc, getDocs } from "firebase/firestore";
import { db } from "../config";

const commentsCollectionRef = collection(db, "comments");

export const addCommentFirebase = (newComment) => {
  return addDoc(commentsCollectionRef, newComment);
};

export const getAllCommentsFirebase = () => {
  return getDocs(commentsCollectionRef);
};
