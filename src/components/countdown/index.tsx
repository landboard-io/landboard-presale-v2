import dayjs from "dayjs";
import React, { Fragment, useEffect } from "react";
import useCountDown from "react-countdown-hook";
import { motion } from "framer-motion";

const launchDate = "2022-03-05";
const interval = 1000;

const cardVariants = {
	hidden: {
		opacity: 0,
		scale: 0,
	},
	visible: {
		opacity: 1,
		scale: 1,
	},
};

const CountDown = () => {
	const timeUntilLaunchDate = dayjs(launchDate).diff(dayjs());
	const [timeLeft, { start }] = useCountDown(timeUntilLaunchDate, interval);

	useEffect(() => {
		start();
	}, []);

	const days = dayjs(timeLeft).format("D");
	const hours = dayjs(timeLeft).format("HH");
	const minutes = dayjs(timeLeft).format("m");
	const seconds = dayjs(timeLeft).format("ss");

	const cards = [
		{ label: "Days", value: days },
		{ label: "Hours", value: hours },
		{ label: "Mins", value: minutes },
		{ label: "Secs", value: seconds },
	];

	return (
		<div className="countdown">
			{cards.map(({ value, label }, index) => (
				<Fragment key={index}>
					<motion.div variants={cardVariants} className="countdown__card">
						<span className="countdown__time">{value}</span>
						<span className="countdown__measure">{label}</span>
					</motion.div>
					{index < cards.length - 1 && <motion.span variants={cardVariants}>:</motion.span>}
				</Fragment>
			))}
		</div>
	);
};

export default CountDown;
