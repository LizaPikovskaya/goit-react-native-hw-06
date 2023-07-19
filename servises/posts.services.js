import { addDoc, collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../config";

export const postsCollectionRef = collection(db, "posts");

export const addPostFirebase = (newPost) => {
  return addDoc(postsCollectionRef, newPost);
};
export const deletePostFirebase = (id) => {
  const postDoc = doc(db, "posts", id);
  return deleteDoc(postDoc);
};

export const getAllPostsFirebase = () => {
  return getDocs(postsCollectionRef);
};
