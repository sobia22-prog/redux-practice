import './index.css';
import App from './App.jsx';
import store from "./redux/store";
import { StrictMode } from 'react';
import { Provider } from "react-redux";
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </StrictMode>
  </BrowserRouter>
  
)
