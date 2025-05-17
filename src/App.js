import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";

const App = () => {
  return (
    <div className="bg-gray-950">
      <AppRoutes />
    </div>
  );
};

export default App;