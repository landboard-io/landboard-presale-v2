import { useGetAccountInfo } from "@elrondnetwork/dapp-core";
import axios from "axios";
import Button from "components/buttons";
import BuyCard from "components/cards/BuyCard";
import whitelistedAddresses from "components/cards/data.json";
import InfoCard from "components/cards/InfoCard";
import CountDown from "components/countdown";
import PurpleWhitelist from "components/icons/PurpleWhitelist";
import { contractAddress as mainnetContractAddress } from "config";
import { contractAddress as devnetContractAddress } from "config.devnet";
import { motion } from "framer-motion/dist/framer-motion";
import useTimeUntilLaunch from "hooks/useTimeUntilLaunch";
import { useEffect, useMemo, useState } from "react";

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

const contractAddress =
	process.env.REACT_APP_ELROND_NETWORK === "mainnet" ? mainnetContractAddress : devnetContractAddress;
const environment =
	process.env.REACT_APP_ELROND_NETWORK === "mainnet" ? "" : process.env.REACT_APP_ELROND_NETWORK + "-";

const Round1 = () => {
	const { address, ...rest } = useGetAccountInfo();

	const [totalSold, setTotalSold] = useState(0);

	const isWhitelisted = useMemo(
		() => whitelistedAddresses.data.some((waddress: any) => waddress.address.trim() === address.trim()),
		[address]
	);
	const { timeLeft, presaleOngoing } = useTimeUntilLaunch(isWhitelisted);

	useEffect(() => {
		const id = setInterval(() => {
			axios.get(`https://${environment}api.elrond.com/accounts/${contractAddress}/tokens`).then((res: any) => {
				if (res.data?.length > 0) {
					const tokens = res.data;
					const totalLandSold =
						1_500_000 -
						tokens.filter((a: any) => a?.identifier === "LAND-40f26f" || a?.ticker === "LAND-40f26f")[0].balance /
							10 ** 18;
					const totalLKLandSold =
						6_000_000 -
						tokens.filter((a: any) => a?.identifier === "LKLAND-6cf78e" || a?.ticker === "LKLAND-6cf78e")[0].balance /
							10 ** 18;
					setTotalSold(totalLandSold + totalLKLandSold);
				}
			});
		}, 5000);
		return () => clearInterval(id);
	}, [address]);

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
					<span className="text-purple">ROUND 2</span> - LAND TOKEN PRESALE NOOOW
				</h1>
				<p>Round 2 presale ends on 30 March 2022 18:00 UTC.</p>
			</motion.div>
			<div className="flex flex-col items-center gap-5 mt-5 mb-8 md:flex-row md:gap-10">
				<Button
					className="outline w-[18.75rem]"
					external="https://docs.google.com/spreadsheets/d/1sfwjZSrhFwviyHGRhwJf9cAUda8ZVSuCv4POD3aZads"
					animate>
					<PurpleWhitelist /> See Whitelist
				</Button>
			</div>
			<div className="flex flex-col gap-10 md:gap-32 md:flex-row">
				<InfoCard
					day={15}
					month="Mar"
					title={`Round 2 - Presale ${timeLeft > 0 ? "Soon" : "Now"}`}
					details={[
						"Price per token: 0.0003 $EGLD",
						"Tokens supply: 7.500.000 $LAND (7.5%)",
						"Minimum buy 0.2: $EGLD ",
						"1 EGLD spent = 1 tile aidrop",
					]}
					totalSold={totalSold}
					percentage={((totalSold / 7_500_000) * 100).toFixed(2)}
				/>
				<BuyCard />
			</div>
		</motion.div>
	);
};

export default Round1;
