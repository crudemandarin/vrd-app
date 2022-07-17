import React from "react";
import ReactDOM from "react-dom/client";

import reportWebVitals from "./reportWebVitals";

import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons

import "./index.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./app/App";
import Dashboard from "./app/screens/Dashboard";
import TradeEntry from "./app/screens/TradeEntry";
import TradeSubmission from "./app/screens/TradeSubmission";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<App />}>
					<Route path="dashboard" element={<Dashboard />} />
					<Route path="trade-entry" element={<TradeEntry />} />
					<Route path="trade-submission" element={<TradeSubmission />} />
				</Route>
			</Routes>
		</BrowserRouter>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
