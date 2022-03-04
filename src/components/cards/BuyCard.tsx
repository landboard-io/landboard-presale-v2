import Button from "components/buttons";
import Input from "components/input";
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

const BuyCard = () => {
	// add conversion from land to egld
	return (
		<motion.div variants={variants} className="pb-10 card">
			<h2 className="mb-10">Buy LAND Token</h2>
			<form className="flex flex-col gap-5 text-left">
				<Input label="YOU PAY" tag="EGLD" type="number" />
				<Input label="YOU GET" tag="LAND" type="number" />
				<Button className="filled w-[16.875rem]" containerClassname="mt-5" type="submit" disabled>
					BUY $LAND
				</Button>
			</form>
		</motion.div>
	);
};

export default BuyCard;
