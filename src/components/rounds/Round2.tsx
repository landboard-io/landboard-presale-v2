import Button from "components/buttons";
import BuyCard from "components/cards/BuyCard";
import InfoCard from "components/cards/InfoCard";
import CountDown from "components/countdown";
import Maiar from "components/icons/Maiar";
import { motion } from "framer-motion/dist/framer-motion";
import { DappUI, useGetLoginInfo } from "@elrondnetwork/dapp-core";

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

const { ExtensionLoginButton, WebWalletLoginButton, LedgerLoginButton, WalletConnectLoginButton } = DappUI;

const Round1 = () => {
	const { isLoggedIn, ...rest } = useGetLoginInfo();

	console.log("rest", rest);

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
				<p>Round 2 presale starts on 15 March 2022 18:00 GMT +02:00</p>
			</motion.div>
			{!isLoggedIn && (
				<div className="flex gap-5">
					<ExtensionLoginButton callbackRoute="/" loginButtonText={"Extension"} />
					<WebWalletLoginButton callbackRoute="/" loginButtonText={"Web wallet"} />
					<LedgerLoginButton loginButtonText={"Ledger"} callbackRoute="/" className={"test-class_name"} />
					<WalletConnectLoginButton callbackRoute="/" loginButtonText={"Maiar"} />
				</div>
			)}
			{isLoggedIn && (
				<Button className="filled w-[18.75rem]" containerClassname="mt-5 mb-8" disabled animate>
					Switch Wallet
				</Button>
			)}
			<div className="flex flex-col gap-10 md:gap-32 md:flex-row">
				<InfoCard
					day={15}
					month="Mar"
					title="Round 2 - Presale Soon"
					details={[
						"Price per token: 0.0002 $EGLD",
						"Tokens supply: 2.500.000 $LAND (2.5%)",
						"Whitelisted addresses: 500",
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
