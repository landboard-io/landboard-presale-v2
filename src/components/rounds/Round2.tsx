import Button from "components/buttons";
import BuyCard from "components/cards/BuyCard";
import InfoCard from "components/cards/InfoCard";
import CountDown from "components/countdown";
import Maiar from "components/icons/Maiar";
import { motion } from "framer-motion";

const variants = {
	hidden: {
		opacity: 0,
		y: -100,
	},
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			staggerChildren: 0.2,
		},
	},
};

const textVariants = {
	hidden: {
		opacity: 0,
	},
	visible: {
		opacity: 1,
	},
};

const Round1 = () => {
	return (
		<motion.div
			initial="hidden"
			animate="visible"
			variants={variants}
			transition={{ duration: 0.5 }}
			className="flex flex-col items-center gap-5 text-center">
			<CountDown />
			<motion.div variants={textVariants} className="flex flex-col gap-3 mt-5">
				<h1>
					<span className="text-purple">ROUND 2</span> - LAND TOKEN PRESALE SOON
				</h1>
				<p>Round 2 presale starts on 9 March 2022 05:00 PM GMT +02:00</p>
			</motion.div>
			<Button className="filled w-[18.75rem] mt-5 mb-8" animate>
				<Maiar /> Connect to Wallet
			</Button>
			<div className="flex flex-col gap-10 md:gap-32 md:flex-row">
				<InfoCard />
				<BuyCard />
			</div>
		</motion.div>
	);
};

export default Round1;
