import { logout, useGetAccountInfo, useGetLoginInfo } from "@elrondnetwork/dapp-core";
import axios from "axios";
import Maiar from "components/icons/Maiar";
import Unlock from "components/icons/Unlock";
import { AnimatePresence, motion } from "framer-motion/dist/framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from ".";

const variants = {
	hidden: {
		x: "100%",
	},
	visible: {
		x: "0%",
	},
};

const AddressButton = () => {
	const { isLoggedIn } = useGetLoginInfo();
	const { address, account } = useGetAccountInfo();
	const [totalLandBalance, setTotalLandBalance] = useState(0);
	const navigate = useNavigate();
	const isInUnlock = window.location.pathname.includes("unlock");

	const handleLogout = () => {
		logout(`${window.location.origin}`);
	};

	const handleUnlock = () => {
		if (isInUnlock) {
			navigate("/");
		} else navigate("/unlock");
	};

	useEffect(() => {
		if (account.address != "") {
			axios.get(`https://api.elrond.com/accounts/${account.address}/tokens`).then((res: any) => {
				console.log("res", res);
				if (res.data?.length > 0)
					setTotalLandBalance(res.data.filter((a: any) => a.identifier === "LAND-40f26f")[0].balance / 10 ** 18);
			});
		}
	}, [account]);

	return (
		<div className="flex">
			{!isLoggedIn && (
				<Button className="z-10 filled w-[14rem]" onClick={handleUnlock} animate>
					<Maiar />
					{isInUnlock ? "Back to Presale" : "Connect with Wallet"}
				</Button>
			)}
			<AnimatePresence>
				{isLoggedIn && (
					<div className="flex">
						<motion.div variants={variants} initial="hidden" animate="visible" className="account-button__address">
							<span className="font-bold text-purple">
								{address.slice(0, 6)}...{address.slice(-4)}
							</span>
							<div className="account-button__tag-container">
								<span className="account-button__tag">{totalLandBalance} LAND</span>
							</div>
						</motion.div>
						<Button className="filled w-[8.75rem]" onClick={handleLogout} animate>
							<Unlock />
							Disconnect
						</Button>
					</div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default AddressButton;
