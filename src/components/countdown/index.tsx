import { useGetAccountInfo } from "@elrondnetwork/dapp-core";
import Confetti from "components/animation/Confetti";
import whitelistedAddresses from "components/cards/data.json";
import { motion } from "framer-motion/dist/framer-motion";
import useTimeUntilLaunch from "hooks/useTimeUntilLaunch";
import React, { Fragment, useEffect, useMemo, useState } from "react";
import { useLocalStorage } from "react-use";

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
	const [play, setPlay] = useLocalStorage("play", false);
	const [played, setPlayed] = useState(false);

	const { address, ...rest } = useGetAccountInfo();
	const isWhitelisted = useMemo(
		() => whitelistedAddresses.data.some((waddress: any) => waddress.address.trim() === address.trim()),
		[address]
	);
	const { days, hours, minutes, seconds, timeLeft } = useTimeUntilLaunch(isWhitelisted);

	useEffect(() => {
		if (timeLeft === 0 && !played) {
			setPlay(true);
		}
	}, [timeLeft]);

	const cards = [
		{ label: "Days", value: days },
		{ label: "Hours", value: hours },
		{ label: "Mins", value: minutes },
		{ label: "Secs", value: seconds },
	];

	return (
		<div className="countdown">
			<Confetti
				play={play ?? false}
				onComplete={() => {
					setPlay(false);
					setPlayed(true);
				}}
			/>
			{timeLeft > 0 &&
				cards.map(({ value, label }, index) => (
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
