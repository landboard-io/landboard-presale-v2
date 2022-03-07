import { Fragment } from "react";
import { useLocation } from "react-router-dom";

const NotFound = () => {
	const { pathname } = useLocation();
	return (
		<Fragment>
			<h1>Page not found</h1>
			<span>{pathname}</span>
		</Fragment>
	);
};

export default NotFound;
