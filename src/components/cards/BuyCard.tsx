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

const LabelButton = (props: any) => (
	<button
		type="button"
		className="text-sm uppercase bg-purple-darker rounded flex px-2 py-1 font-bold text-purple"
		{...props}>
		Max
	</button>
);

const BuyCard = () => {
	const { address, account, ...rest } = useGetAccountInfo();

	const [totalLandBalance, setTotalLandBalance] = useState(0);
	const [totalEgldBalance, setTotalEgldBalance] = useState("0");
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
		axios.get("https://api.elrond.com/economics").then((res: any) => {
			setEgldPrice(res.data.price);
		});
	}, []);

	useEffect(() => {
		if (account.address != "") {
			axios.get(`https://api.elrond.com/accounts/${account.address}/tokens`).then((res: any) => {
				if (res.data?.length > 0)
					setTotalLandBalance(res.data.filter((a: any) => a.identifier === "LAND-40f26f")[0].balance / 10 ** 18);
			});
		}
	}, [account]);

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
				{address && <span className="tiny-label">You have {totalEgldBalance} EGLD</span>}

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
