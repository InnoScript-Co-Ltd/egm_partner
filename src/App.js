import React from "react";
import { RouterProvider } from "react-router-dom";
import { AppRouters } from './AppRouter';
import { Provider } from 'react-redux'
import { AppStore } from "./AppStore";

export const App = () => {

  return (
    <RouterProvider router={AppRouters}>
      <Provider store={AppStore} />
    </RouterProvider>
  )
}