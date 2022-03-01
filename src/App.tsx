import Presale from "components/rounds/Presale";
import { Fragment } from "react";
import NavBar from "./components/navbar";

const App = () => {
	return (
		<Fragment>
			<NavBar />
			<main className="container">
				<Presale />
			</main>
		</Fragment>
	);
};

export default App;
