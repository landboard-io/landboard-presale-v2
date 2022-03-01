import Logo from "../icons/Logo";

const NavBar = () => {
	return (
		<div className="relative flex items-center justify-between px-5 py-5 md:py-8 md:px-[7.5rem] z-[1000]">
			<a className="cursor-pointer" href="https://landboard.io/">
				<Logo />
			</a>
		</div>
	);
};

export default NavBar;
