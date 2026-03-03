// "use client";

// import { Provider, useDispatch } from "react-redux";
// import {store} from "./redux/store" 
// import { useEffect } from "react";
// import { listenAuth } from "./redux/authSlice";
// // import { useDispatch } from "react-redux";

// function AuthLoader ({ children }) {
//   // const dispatch = useDispatch();
//   const dispatch = useDispatch();

//   useEffect(() =>{
//     store.dispatch(listenAuth());
//   },[dispatch]);

//   return children;

// }

// export default function Providers({children}) {
//   return(
//     <Provider store={store}>
//       <AuthLoader>{children}</AuthLoader>
//     </Provider>
//   )
// }



"use client";

import { Provider, useDispatch } from "react-redux";
import {store} from "./redux/store" 
import { useEffect } from "react";
import { listenAuth } from "./redux/authSlice";

export default function Providers({ children }) {
  useEffect(() => {
    store.dispatch(listenAuth()); // ⭐ CRITICAL
  }, []);

  return <Provider store={store}>{children}</Provider>;
}