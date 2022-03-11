import Presale from "components/rounds/Presale";
import { Fragment } from "react";
import Particles from "react-tsparticles";
import particlesConfig from "../particlesConfig.json";

const Home = () => {
	return (
		<Fragment>
			<Presale />
			<div className="top-0 bottom-0 z-0 h-screen" style={{ position: "absolute" }}>
				{/* @ts-ignore */}
				{/* <Particles id="tsparticles" options={particlesConfig} height="100vh" /> */}
			</div>
		</Fragment>
	);
};

export default Home;
