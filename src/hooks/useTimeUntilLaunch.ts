import { presaleDate as prodPresaleDate, whitelistDate as prodWhitelistDate } from "config";
import { presaleDate as devPresaleDate, whitelistDate as devWhitelistDate } from "config.devnet";
import dayjs from "dayjs";
import parseMs from "parse-ms";
import useCountdown from "react-use-countdown";

const presaleDate = process.env.REACT_APP_ELROND_NETWORK === "mainnet" ? prodPresaleDate : devPresaleDate;
const whitelistDate = process.env.REACT_APP_ELROND_NETWORK === "mainnet" ? prodWhitelistDate : devWhitelistDate;

const useTimeUntilLaunch = (isWhitelisted?: boolean) => {
	let timeUntilLaunchDate: any;
	if (isWhitelisted) {
		timeUntilLaunchDate = whitelistDate;
	} else {
		timeUntilLaunchDate = presaleDate;
	}
	const countdown = useCountdown(() => timeUntilLaunchDate);

	return { ...parseMs(countdown), timeLeft: countdown };
};

export default useTimeUntilLaunch;
