import {
	DappUI,
	denominate,
	getAccountBalance,
	refreshAccount,
	sendTransactions,
	useGetAccountInfo,
} from "@elrondnetwork/dapp-core";
import { Balance } from "@elrondnetwork/erdjs/out";
import axios from "axios";
import Button from "components/buttons";
import Input from "components/input";
import { contractAddress as mainnetContractAddress } from "config";
import { contractAddress as devnetContractAddress } from "config.devnet";
import dayjs from "dayjs";
import { motion } from "framer-motion/dist/framer-motion";
import useTimeUntilLaunch from "hooks/useTimeUntilLaunch";
import { useEffect, useMemo, useState } from "react";
import useCountDown from "react-countdown-hook";
import whitelistedAddresses from "./data.json";

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

const conversionRate = 0.0003;
const contractAddress =
	process.env.REACT_APP_ELROND_NETWORK === "mainnet" ? mainnetContractAddress : devnetContractAddress;
const environment =
	process.env.REACT_APP_ELROND_NETWORK === "mainnet" ? "" : process.env.REACT_APP_ELROND_NETWORK + "-";

const LabelButton = (props: any) => (
	<button
		type="button"
		className="flex px-2 py-1 text-sm font-bold uppercase rounded bg-purple-darker text-purple"
		{...props}>
		Max
	</button>
);

const BuyCard = () => {
	const { address, account, ...rest } = useGetAccountInfo();

	const [totalLandBalance, setTotalLandBalance] = useState(0);
	const [egldPrice, setEgldPrice] = useState(0);
	const [egldAmount, setEgldAmount] = useState("0");
	const [landAmount, setLandAmount] = useState("0");
	const isWhitelisted = useMemo(
		() => whitelistedAddresses.data.some((waddress: any) => waddress.address.trim() === address.trim()),
		[address]
	);

	const timeLeft = useTimeUntilLaunch(isWhitelisted);

	const handleChangeEgldAmount = (e: any) => {
		if (e.target.value <= 1) {
			setEgldAmount(e.target.value);
			setLandAmount((e.target.value / conversionRate).toFixed(4));
		}
	};

	const handleChangeLandAmount = (e: any) => {
		if (e.target.value <= 3333.3333) {
			setLandAmount(e.target.value);
			setEgldAmount((e.target.value * conversionRate).toFixed(4));
		}
	};

	const buyToken = async (e: any) => {
		e.preventDefault();
		const tx = {
			value: Balance.egld(landAmount),
			data: "buy",
			receiver: contractAddress,
		};
		await refreshAccount();
		await sendTransactions({
			transactions: tx,
		});
	};

	useEffect(() => {
		axios.get(`https://${environment}api.elrond.com/economics`).then((res: any) => {
			setEgldPrice(res.data.price);
		});
	}, []);

	useEffect(() => {
		if (account.address != "") {
			axios.get(`https://${environment}api.elrond.com/accounts/${account.address}/tokens`).then((res: any) => {
				if (res.data?.length > 0)
					setTotalLandBalance(res.data.filter((a: any) => a.identifier === "LAND-40f26f")[0].balance / 10 ** 18);
			});
		}
	}, [account]);

	const totalEgldBalance = useMemo(() => (account ? parseInt(account.balance) / 10 ** 18 : 0).toFixed(4), [account]);
	const disabled =
		egldAmount === "0" || landAmount === "0" || !egldAmount || !landAmount || timeLeft > 0 || !isWhitelisted;

	return (
		<motion.div variants={variants} className="pb-10 card">
			<h2 className="mb-10">Buy LAND Token</h2>
			<form className="flex flex-col gap-5 text-left" onSubmit={buyToken}>
				<Input label="YOU BUY" tag="LAND" type="number" value={landAmount} onChange={handleChangeLandAmount} />
				{address && <span className="tiny-label">You have {totalLandBalance} LAND</span>}
				<Input
					label="YOU PAY"
					tag="EGLD"
					type="number"
					value={egldAmount}
					onChange={handleChangeEgldAmount}
					LabelButton={
						<LabelButton
							onClick={() =>
								handleChangeEgldAmount({ target: { value: parseInt(totalEgldBalance) < 1 ? totalEgldBalance : 1 } })
							}
						/>
					}
				/>
				{address && (
					<p className="tiny-label">
						<span>Minimum buy 0.2 $EGLD</span>
						<span>You have {totalEgldBalance} EGLD</span>
						<span>
							You will receive 20% unlocked and 80% locked tokens (
							<a href="https://twitter.com/landboard_io/status/1494239023094767619?s=21">see vesting period here</a>)
						</span>
					</p>
				)}

				{!isWhitelisted && address && (
					<span className="-mb-8 text-sm font-bold">You are not whitelisted. The list updates periodically.</span>
				)}
				{isWhitelisted && <span className="-mb-8 text-sm font-bold text-purple">You are whitelisted!</span>}
				<Button
					className="w-full filled"
					containerClassname="mt-5"
					type="submit"
					disabled={disabled || !isWhitelisted}
					hideComingSoon>
					BUY $LAND
				</Button>
				<span className="text-xs font-bold">1 EGLD= ${egldPrice} | 1 EGLD = 3333 LAND</span>
			</form>
		</motion.div>
	);
};

export default BuyCard;
