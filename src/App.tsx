import Presale from "components/rounds/Presale";
import NavBar from "./components/navbar";
import Particles from "react-tsparticles";
import particlesConfig from "./particlesConfig.json";
import { Fragment } from "react";

const App = () => {
	return (
		<Fragment>
			<NavBar />
			<main className="container">
				<Presale />
				<div className="top-0 bottom-0 z-0 h-screen" style={{ position: "absolute" }}>
					{/* @ts-ignore */}
					<Particles id="tsparticles" options={particlesConfig} height="100vh" />
				</div>
			</main>
		</Fragment>
	);
};

export default App;
