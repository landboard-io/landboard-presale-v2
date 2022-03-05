import { motion } from "framer-motion/dist/framer-motion";
import React from "react";

interface ProgressBarProps {
	text: string;
	percentage: number;
}

const ProgressBar = ({ text, percentage }: ProgressBarProps) => {
	return (
		<div className="relative grid w-full h-10 mt-10 border-2 md:mt-auto place-content-center border-purple">
			<p className="font-bold z-[100]">{text}</p>
			<motion.div
				className={`absolute h-full z-0 bg-purple`}
				initial={{ width: "0%" }}
				animate={{ width: percentage + "%" }}
				transition={{ delay: 0.5, duration: 0.5, ease: "easeInOut" }}
			/>
		</div>
	);
};

export default ProgressBar;
