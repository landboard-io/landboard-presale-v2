// @ts-nocheck
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Lottie from "react-lottie-player";

interface AnimationProps {
	play: boolean;
	onComplete: () => void;
}

const Confetti = ({ play, onComplete }: AnimationProps) => {
	const [lottieJson, setLottieJson] = useState(null);

	useEffect(() => {
		import(`./confetti.json`).then((data) => setLottieJson(data));
	}, []);

	return (
		<div className={`${play ? "confetti-animation" : "hidden"}`}>
			{lottieJson && (
				<Lottie
					animationData={lottieJson}
					style={{ width: 300, height: 300 }}
					play={play}
					onLoopComplete={onComplete}
				/>
			)}
		</div>
	);
};

export default Confetti;
