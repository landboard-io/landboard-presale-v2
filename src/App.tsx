import NavBar from "./components/navbar";
import { Fragment } from "react";
import { DappUI, DappProvider } from "@elrondnetwork/dapp-core";
import { routeNames } from "routes";
import routes from "routes";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import NotFound from "pages/404";

// @ts-ignore
const environment: "mainnet" | "devnet" | "testnet" = process.env.REACT_APP_ELROND_NETWORK ?? "mainnet";

const {
	TransactionsToastList,
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
						<TransactionsToastList />
						<NotificationModal />
						<SignTransactionsModals className="custom-class-for-modals" />
						<Routes>
							<Route path={routeNames.unlock} element={<UnlockPage loginRoute={routeNames.presale} />} />
							{routes.map((route: any, index: number) => (
								<Route path={route.path} key={"route-key-" + index} element={<route.component />} />
							))}
							<Route path="*" element={<NotFound />} />
						</Routes>
					</main>
				</Fragment>
			</DappProvider>
		</Router>
	);
};

export default App;
