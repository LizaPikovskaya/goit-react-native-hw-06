import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA0dvaXMYfYH6MXLFJcH6iIcuRmnfvNrkI",
  authDomain: "react-native-project-392805.firebaseapp.com",
  projectId: "react-native-project-392805",
  storageBucket: "react-native-project-392805.appspot.com",
  messagingSenderId: "111678258997",
  appId: "1:111678258997:web:0fb777c9c4aa1ab253d67c",
  measurementId: "G-5YHYYDL98D",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);





// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

// const firebaseConfig = {
//   apiKey: "AIzaSyA0dvaXMYfYH6MXLFJcH6iIcuRmnfvNrkI",
//   authDomain: "react-native-project-392805.firebaseapp.com",
//   projectId: "react-native-project-392805",
//   storageBucket: "react-native-project-392805.appspot.com",
//   messagingSenderId: "111678258997",
//   appId: "1:111678258997:web:0fb777c9c4aa1ab253d67c",
//   measurementId: "G-5YHYYDL98D"
// };

// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);


