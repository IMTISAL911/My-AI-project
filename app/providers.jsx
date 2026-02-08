"use client";

import { Provider, useDispatch } from "react-redux";
import {store} from "./redux/store" 
import { useEffect } from "react";
import { listenAuth } from "./redux/authSlice";


// export default function Providers({ children }) {
//   return <Provider store={store}>{children}</Provider>;
// }


function AuthLoader ({ children }) {
  const dispatch = useDispatch();

  useEffect(() =>{
    dispatch(listenAuth());
  },[]);

  return children;

}

export default function Providers({children}) {
  return(
    <Provider store={store}>
      <AuthLoader>{children}</AuthLoader>
    </Provider>
  )
}
