import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./User/userSlice";
import contentReducer from "./Content/ContentSlice";
import recipeReducer from "./Recipe/recipeSlice";




const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: ["content", "recipe"],
};


const reducers = combineReducers({
  user: userReducer,
  content: contentReducer,
  recipe: recipeReducer,
});


const persistedReducer = persistReducer(persistConfig, reducers);


const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});


const persistor = persistStore(store);

export { store, persistor };
