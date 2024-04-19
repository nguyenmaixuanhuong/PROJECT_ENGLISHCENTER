import {combineReducers, configureStore} from "@reduxjs/toolkit"
import storage from "redux-persist/lib/storage";
import userReducer from "./UserSlice";
import ClassSlice from "./ClassSlice";
import NotifiySlice from "./NotifiySlice";
import TabSlice from "./TabSlice";
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


const persistConfig = {
    key: "users",
    version: "1",
    storage,
  };
  
  const rootReducer = combineReducers({
    user: userReducer,
    classes: ClassSlice,
    notify: NotifiySlice,
    tab: TabSlice
  });

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);