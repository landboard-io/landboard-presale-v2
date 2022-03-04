import Logo from "../icons/Logo";
import { motion } from "framer-motion/dist/framer-motion";
import Twitter from "components/icons/Twitter";
import Telegram from "components/icons/Telegram";
import Whitelist from "components/icons/Whitelist";
import Button from "components/buttons";
import PurpleWhitelist from "components/icons/PurpleWhitelist";
import { DappUI, useGetLoginInfo } from "@elrondnetwork/dapp-core";
import WalletsDropdown from "components/dropdown/WalletsDropdown";
import Unlock from "components/icons/Unlock";
import { logout, useGetAccountInfo } from "@elrondnetwork/dapp-core";

const scaleInVariants = {
	hidden: {
		opacity: 0,
		scale: 0,
	},
	visible: {
		opacity: 1,
		scale: 1,
	},
};

const NavBar = () => {
	const { address } = useGetAccountInfo();

	const handleLogout = () => {
		logout(`${window.location.origin}`);
	};

	const isLoggedIn = Boolean(address);

	return (
		<div className="relative flex items-center justify-between px-5 py-5 md:py-8 md:px-[7.5rem] z-[1000]">
			<a className="cursor-pointer" href="https://landboard.io/">
				<Logo />
			</a>
			<div className="ml-auto flex gap-5 md:gap-10 justify-center items-center">
				<motion.a variants={scaleInVariants} href="https://twitter.com/landboard_io" className="uppercase">
					<Twitter />
				</motion.a>
				<motion.a variants={scaleInVariants} href="https://t.me/landboardio" className="uppercase">
					<Telegram />
				</motion.a>
				{!isLoggedIn && <WalletsDropdown />}
				{isLoggedIn && (
					<Button className="filled w-[14rem]" onClick={handleLogout} animate>
						<Unlock />
						Disconnect
					</Button>
				)}
			</div>
		</div>
	);
};

export default NavBar;
