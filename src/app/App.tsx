import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./common/components/Layout";
import RequireAuth from "./auth/RequireAuth";

import Splash from "./splash/splash.page";
import Dashboard from "./dashboard/dashboard.page";
import TradeEntry from "./trade/trade-entry.page";
import TradeSubmission from "./trade/trade-submission.page";
import Error404 from "./common/components/Error404";

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route path="*" element={<Error404 />} />
					<Route path="/" element={<Splash />} />
					<Route
						path="dashboard"
						element={
							<RequireAuth>
								<Dashboard />
							</RequireAuth>
						}
					/>
					<Route
						path="trade-entry"
						element={
							<RequireAuth>
								<TradeEntry />
							</RequireAuth>
						}
					/>
					<Route
						path="trade-submission"
						element={
							<RequireAuth>
								<TradeSubmission />
							</RequireAuth>
						}
					/>
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

export default App;
