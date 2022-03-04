import { getAccountBalance, useGetAccountInfo } from "@elrondnetwork/dapp-core";
import Button from "components/buttons";
import Input from "components/input";
import { motion } from "framer-motion/dist/framer-motion";
import { useEffect, useState } from "react";

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

	const [totalEgldBalance, setTotalEgldBalance] = useState("0");
	const [egldAmount, setEgldAmount] = useState("0");
	const [landAmount, setLandAmount] = useState("0");

	const handleChangeEgldAmount = (e: any) => {
		setEgldAmount(e.target.value);
		setLandAmount((e.target.value / conversionRate).toFixed(4));
	};

	const handleChangeLandAmount = (e: any) => {
		setLandAmount(e.target.value);
		setEgldAmount((e.target.value * conversionRate).toFixed(4));
	};

	useEffect(() => {
		if (address)
			getAccountBalance(address).then((balance) => {
				console.log("balance", balance);
				setTotalEgldBalance(balance);
			});
	}, [address]);

	const disabled = egldAmount === "0" || landAmount === "0" || !egldAmount || !landAmount;

	return (
		<motion.div variants={variants} className="pb-10 card">
			<h2 className="mb-10">Buy LAND Token</h2>
			<form className="flex flex-col gap-5 text-left">
				<Input label="YOU BUY" tag="LAND" type="number" value={landAmount} onChange={handleChangeLandAmount} />
				<Input label="YOU PAY" tag="EGLD" type="number" value={egldAmount} onChange={handleChangeEgldAmount} />
				<Button
					className="filled w-[16.875rem]"
					containerClassname="mt-5"
					type="submit"
					disabled={disabled}
					hideComingSoon>
					BUY $LAND
				</Button>
				<span className="text-xs font-bold">1 EGLD= $133 | 1 EGLD = 443333 LAND</span>
			</form>
		</motion.div>
	);
};

export default BuyCard;
