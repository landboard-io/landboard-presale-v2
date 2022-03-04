import Logo from "../icons/Logo";
import { motion } from "framer-motion";
import Twitter from "components/icons/Twitter";
import Telegram from "components/icons/Telegram";
import Whitelist from "components/icons/Whitelist";
import Button from "components/buttons";
import PurpleWhitelist from "components/icons/PurpleWhitelist";

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
				<Button
					containerClassname="hidden md:flex"
					className="outline w-40 md:w-60"
					external="https://docs.google.com/forms/d/e/1FAIpQLSfo4h-Ou7uu1EKsv8b930xo9xWmk85L5s8UMAF-dE1kMlQMJQ/viewform"
					animate>
					<PurpleWhitelist /> Join Whitelist
				</Button>
			</div>
		</div>
	);
};

export default NavBar;
