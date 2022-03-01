import { motion } from "framer-motion";

const variants = {
	hidden: {
		opacity: 0,
		scale: 0,
	},
	visible: {
		opacity: 1,
		scale: 1,
	},
};

const InfoCard = () => {
	return (
		<motion.div variants={variants} className="card">
			<div className="card__date">
				<span className="card__date-day">28</span>
				<span className="card__date-month">FEB</span>
			</div>
			<h2 className="w-[14rem] mt-8">Round 1 Presale Ended</h2>
			<ul className="flex flex-col gap-2 mt-10 font-medium">
				<li>Price per token: 0.0002 $EGLD</li>
				<li>Tokens supply: 2.500.000 $LAND (2.5%)</li>
				<li>Whitelisted addresses: 500</li>
			</ul>
			<div className="relative grid w-full h-10 mt-10 md:mt-auto place-content-center bg-purple">
				<p className="font-bold">2.500.000 tokens sold out (100%)</p>
			</div>
		</motion.div>
	);
};

export default InfoCard;
