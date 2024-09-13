import React from "react";
import { RouterProvider } from "react-router-dom";
import { AppRouters } from './AppRouter';
import { Provider } from 'react-redux'
import { AppStore } from "./AppStore";

export const App = () => {

  return (
    <Provider store={AppStore}>
      <RouterProvider router={AppRouters} />
    </Provider>
  )
}