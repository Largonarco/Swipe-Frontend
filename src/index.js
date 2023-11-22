import "./index.css";

import App from "./App";
import React from "react";
import ReactDOM from "react-dom";
import store from "./redux/store";
import { Provider } from "react-redux";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
	<BrowserRouter>
		<Provider store={store}>
			<React.StrictMode>
				<App />
			</React.StrictMode>
		</Provider>
	</BrowserRouter>,
	document.getElementById("root")
);

reportWebVitals();
