import withPageTitle from "components/seo/PageTitle";
import Home from "./pages/Home";

export const routeNames = {
	transaction: "/transaction",
	unlock: "/unlock",
	ledger: "/ledger",
	walletconnect: "/walletconnect",
	presale: "/",
};

const routes: Array<any> = [
	{
		path: routeNames.presale,
		component: Home,
	},
];

const mappedRoutes = routes.map((route) => {
	const title = route.title ? `${route.title} • Landboard` : "Landboard";

	const requiresAuth = Boolean(route.authenticatedRoute);
	const wrappedComponent = withPageTitle(title, route.component);

	return {
		path: route.path,
		component: wrappedComponent,
		authenticatedRoute: requiresAuth,
	};
});

export default mappedRoutes;
