import { getAccountBalance, refreshAccount, sendTransactions, useGetAccountInfo } from "@elrondnetwork/dapp-core";
import { Balance } from "@elrondnetwork/erdjs/out";
import axios from "axios";
import Button from "components/buttons";
import Input from "components/input";
import { contractAddress } from "config";
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

const BuyCard = () => {
	const { address, ...rest } = useGetAccountInfo();

	const timeLeft = useTimeUntilLaunch();

	const [totalEgldBalance, setTotalEgldBalance] = useState("0");
	const [egldPrice, setEgldPrice] = useState(0);
	const [egldAmount, setEgldAmount] = useState("0");
	const [landAmount, setLandAmount] = useState("0");
	const isWhitelisted = useMemo(() => whitelistedAddresses.data.some((waddress: any) => waddress.address === address), [
		address,
	]);

	const handleChangeEgldAmount = (e: any) => {
		setEgldAmount(e.target.value);
		setLandAmount((e.target.value / conversionRate).toFixed(4));
	};

	const handleChangeLandAmount = (e: any) => {
		setLandAmount(e.target.value);
		setEgldAmount((e.target.value * conversionRate).toFixed(4));
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
		axios.get("https://api.elrond.com/economics").then((res: any) => {
			setEgldPrice(res.data.price);
		});
	}, []);

	useEffect(() => {
		if (address)
			getAccountBalance(address).then((balance) => {
				setTotalEgldBalance(balance);
			});
	}, [address]);

	const disabled =
		egldAmount === "0" || landAmount === "0" || !egldAmount || !landAmount || timeLeft > 0 || !isWhitelisted;

	return (
		<motion.div variants={variants} className="pb-10 card">
			<h2 className="mb-10">Buy LAND Token</h2>
			<form className="flex flex-col gap-5 text-left" onSubmit={buyToken}>
				<Input label="YOU BUY" tag="LAND" type="number" value={landAmount} onChange={handleChangeLandAmount} />
				<Input label="YOU PAY" tag="EGLD" type="number" value={egldAmount} onChange={handleChangeEgldAmount} />
				{!isWhitelisted && (
					<span className="-mb-8 text-sm font-bold text-purple">
						You are not whitelisted. The list updates periodically.
					</span>
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
