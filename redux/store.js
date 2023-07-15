import { configureStore } from "@reduxjs/toolkit";
import { postsReducer } from "./postSlice";
// import {
//   persistReducer,
//   persistStore,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from "redux-persist";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const persistConfig = {
//   key: "posts",
//   storage: AsyncStorage,
// };

// const reducer = persistReducer(persistConfig, postsReducer);

// export const store = configureStore({
//   reducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }),
// });

// export const persistor = persistStore(store);


export const store = configureStore({
    reducer: {
        posts: postsReducer,
    }
})