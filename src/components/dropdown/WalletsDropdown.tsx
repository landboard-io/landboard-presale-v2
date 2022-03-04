import { DappUI } from "@elrondnetwork/dapp-core";
import Button from "components/buttons";
import Maiar from "components/icons/Maiar";
import { motion } from "framer-motion/dist/framer-motion";
import { useState } from "react";

const { ExtensionLoginButton, WebWalletLoginButton, LedgerLoginButton, WalletConnectLoginButton } = DappUI;

const subMenuAnimate = {
	enter: {
		opacity: 1,
		rotateX: 0,
		transition: {
			duration: 0.5,
		},
		display: "flex",
	},
	exit: {
		opacity: 0,
		rotateX: -15,
		transition: {
			duration: 0.5,
			delay: 0.3,
		},
		transitionEnd: {
			display: "none",
		},
	},
};

const WalletsDropdown = () => {
	const [isOpen, setIsOpen] = useState(false);

	const handleToggle = () => {
		setIsOpen(!isOpen);
	};

	return (
		<motion.div className="relative" onHoverStart={handleToggle} onHoverEnd={handleToggle} onClick={handleToggle}>
			<Button className="z-10 filled w-[14rem]" animate>
				<Maiar />
				Connect with Wallet
			</Button>
			{isOpen && (
				<motion.div
					className="wallets-dropdown"
					initial="exit"
					animate={isOpen ? "enter" : "exit"}
					variants={subMenuAnimate}>
					<ExtensionLoginButton callbackRoute="/" loginButtonText={"Extension"} />
					<WebWalletLoginButton callbackRoute="/" loginButtonText={"Web wallet"} />
					<LedgerLoginButton loginButtonText={"Ledger"} callbackRoute="/" className={"test-class_name"} />
					<WalletConnectLoginButton callbackRoute="/" loginButtonText={"Maiar"} />
				</motion.div>
			)}
		</motion.div>
	);
};

export default WalletsDropdown;
