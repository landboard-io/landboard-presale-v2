import AddressButton from "components/buttons/AddressButton";
import Telegram from "components/icons/Telegram";
import Twitter from "components/icons/Twitter";
import { motion } from "framer-motion/dist/framer-motion";
import Logo from "../icons/Logo";

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
		<div className="flex relative flex-col gap-[2rem] justify-center md:flex-row items-center md:justify-between px-5 py-5 md:py-8 md:px-[7.5rem] z-[1000]">
			<div className="flex justify-between w-full ">
				<a className="cursor-pointer" href="https://landboard.io/">
					<Logo />
				</a>
				<div className="md:ml-auto flex gap-5 md:gap-10 justify-center items-center">
					<motion.a variants={scaleInVariants} href="https://twitter.com/landboard_io" className="uppercase">
						<Twitter />
					</motion.a>
					<motion.a variants={scaleInVariants} href="https://t.me/landboardio" className="uppercase">
						<Telegram />
					</motion.a>
				</div>
			</div>
			<AddressButton />
		</div>
	);
};

export default NavBar;
