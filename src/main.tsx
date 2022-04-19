import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

(async () => {
  if (process.env.NODE_ENV === "development") {
    const { worker } = await import("./api/mock/msw/browser");
    await worker.start();
  }

  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
})();
