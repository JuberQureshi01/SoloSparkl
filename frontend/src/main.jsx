import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Toaster } from "react-hot-toast";
import App from "./App.jsx";
import { Provider } from 'react-redux';
import store from './store/store';

createRoot(document.getElementById("root")).render(
  <StrictMode>
     <Provider store={store}>
    <App />
    <Toaster position="top-center" reverseOrder={false} />
    </Provider>
  </StrictMode>
);
