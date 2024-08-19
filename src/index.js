import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";

import { Provider } from "react-redux";
import { rootStore, persistor } from "./redux/config";
import "./index.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import { PersistGate } from "redux-persist/integration/react";
import { GoogleOAuthProvider } from "@react-oauth/google";

import { CometChat } from '@cometchat-pro/chat';
import config from './config';
CometChat.init(config.appID)

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Router>
        <Provider store={rootStore}>
            <PersistGate persistor={persistor}>
                <GoogleOAuthProvider clientId="704696664754-0ddkedabejc7og454sr5vtjgabhvl0ge.apps.googleusercontent.com">
                    <App />
                </GoogleOAuthProvider>
            </PersistGate>
        </Provider>
    </Router>
);
