import Presale from "components/rounds/Presale";
import NavBar from "./components/navbar";
import Particles from "react-tsparticles";
import particlesConfig from "./particlesConfig.json";
import { Fragment } from "react";
import { DappUI, DappProvider } from "@elrondnetwork/dapp-core";

const environment = "devnet";

const { TransactionsToastList, SignTransactionsModals, NotificationModal } = DappUI;

const App = () => {
	return (
		<DappProvider
			environment={environment}
			customNetworkConfig={{ name: "customConfig", apiTimeout: 6000 }}
			completedTransactionsDelay={200}>
			<Fragment>
				<TransactionsToastList />
				<NotificationModal />
				<SignTransactionsModals className="custom-class-for-modals" />
				<NavBar />
				<main className="container">
					<Presale />
					<div className="top-0 bottom-0 z-0 h-screen" style={{ position: "absolute" }}>
						{/* @ts-ignore */}
						<Particles id="tsparticles" options={particlesConfig} height="100vh" />
					</div>
				</main>
			</Fragment>
		</DappProvider>
	);
};

export default App;
