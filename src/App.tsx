import { DappProvider, DappUI } from "@elrondnetwork/dapp-core";
import NotFound from "pages/404";
import { Fragment } from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import routes, { routeNames } from "routes";
import NavBar from "./components/navbar";

// @ts-ignore
const environment: "mainnet" | "devnet" | "testnet" = process.env.REACT_APP_ELROND_NETWORK ?? "mainnet";

const {
	SignTransactionsModals,
	NotificationModal,
	DappCorePages: { UnlockPage },
} = DappUI;

const App = () => {
	return (
		<Router>
			<DappProvider
				environment={environment}
				customNetworkConfig={{ name: "customConfig", apiTimeout: 6000 }}
				completedTransactionsDelay={200}>
				<Fragment>
					<NavBar />
					<main className="container">
						<NotificationModal />
						<SignTransactionsModals className="modal-card" />
						<Routes>
							<Route path={routeNames.unlock} element={<UnlockPage loginRoute={routeNames.presale} />} />
							{routes.map((route: any, index: number) => (
								<Route path={route.path} key={"route-key-" + index} element={<route.component />} />
							))}
							<Route path="*" element={<NotFound />} />
						</Routes>
						<Toaster
							toastOptions={{
								className: "z-[10000]",
								position: "bottom-right",
							}}
						/>
					</main>
				</Fragment>
			</DappProvider>
		</Router>
	);
};

export default App;
