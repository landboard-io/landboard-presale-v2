import BuyCard from "components/cards/BuyCard";
import InfoCard from "components/cards/InfoCard";
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

const Round1 = () => {
	return (
		<motion.div
			initial="hidden"
			animate="visible"
			variants={variants}
			transition={{ duration: 0.5 }}
			className="flex flex-col items-center gap-5 text-center">
			<h1>
				<span className="text-purple">ROUND 1</span> - LAND TOKEN PRESALE SOLD OUT
			</h1>
			<p className="mb-10">Round 1 presale ended on 28 February 2022 05:00 PM GMT +02</p>
			<div className="flex flex-col gap-10 md:flex-row">
				<InfoCard />
				<BuyCard />
			</div>
		</motion.div>
	);
};

export default Round1;
