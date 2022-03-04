import { motion } from "framer-motion/dist/framer-motion";

const variants = {
	hidden: {
		opacity: 0,
	},
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.2,
		},
	},
};
const btnVariants = {
	hidden: {
		opacity: 0,
		scale: 0,
	},
	visible: {
		opacity: 1,
		scale: 1,
	},
};

const RoundPicker = ({ setRound, round }: any) => {
	return (
		<motion.div
			initial="hidden"
			animate="visible"
			variants={variants}
			className="relative flex items-center mb-10 mx-auto justify-between max-w-[60rem]">
			<motion.button
				variants={btnVariants}
				className={`btn round ${round === 1 ? "active" : ""}`}
				onClick={() => setRound(1)}>
				1
			</motion.button>
			<motion.button
				variants={btnVariants}
				className={`btn round ${round === 2 ? "active" : ""}`}
				onClick={() => setRound(2)}>
				2
			</motion.button>
			<span className="absolute z-0 w-full h-1.5 bg-purple-darkest"></span>
		</motion.div>
	);
};

export default RoundPicker;
