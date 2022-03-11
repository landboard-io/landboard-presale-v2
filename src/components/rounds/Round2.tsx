import { useGetAccountInfo } from "@elrondnetwork/dapp-core";
import axios from "axios";
import Button from "components/buttons";
import BuyCard from "components/cards/BuyCard";
import InfoCard from "components/cards/InfoCard";
import CountDown from "components/countdown";
import PurpleWhitelist from "components/icons/PurpleWhitelist";
import { motion } from "framer-motion/dist/framer-motion";
import { useEffect, useState } from "react";

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
		// @ts-ignore
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
				<p>
					Round 2 <span className="text-purple">WHITELISTED</span> presale starts on 14 March 2022 18:00 UTC.
				</p>
				<p>
					Round 2 <span className="text-purple">PUBLIC</span> presale starts on 15 March 2022 18:00 UTC.
				</p>
			</motion.div>
			<div className="flex flex-col items-center gap-5 mt-5 mb-8 md:flex-row md:gap-10">
				<Button
					className="outline w-[18.75rem]"
					external="https://docs.google.com/forms/d/e/1FAIpQLSfo4h-Ou7uu1EKsv8b930xo9xWmk85L5s8UMAF-dE1kMlQMJQ/viewform"
					animate>
					<PurpleWhitelist /> Join Whitelist
				</Button>
			</div>
			<div className="flex flex-col gap-10 md:gap-32 md:flex-row">
				<InfoCard
					day={15}
					month="Mar"
					title="Round 2 - Presale Soon"
					details={[
						"Price per token: 0.0003 $EGLD",
						"Tokens supply: 7.500.000 $LAND (7.5%)",
						"Whitelisted addresses: 2250",
					]}
					totalSold={0}
					percentage={0}
				/>
				<BuyCard />
			</div>
		</motion.div>
	);
};

export default Round1;
