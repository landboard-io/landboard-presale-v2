import {
	presaleDate as prodPresaleDate,
	whitelistDate as prodWhitelistDate,
	presaleEndDate as prodPresaleEndDate,
} from "config";
import { presaleDate as devPresaleDate, whitelistDate as devWhitelistDate } from "config.devnet";
import dayjs from "dayjs";
import parseMs from "parse-ms";
import useCountdown from "react-use-countdown";

const presaleDate = process.env.REACT_APP_ELROND_NETWORK === "mainnet" ? prodPresaleDate : devPresaleDate;
const presaleEndDate = prodPresaleEndDate;
const whitelistDate = process.env.REACT_APP_ELROND_NETWORK === "mainnet" ? prodWhitelistDate : devWhitelistDate;

const useTimeUntilLaunch = (isWhitelisted?: boolean) => {
	let timeUntilLaunchDate: any;
	if (isWhitelisted) {
		timeUntilLaunchDate = dayjs(whitelistDate).isBefore(dayjs()) ? presaleEndDate : whitelistDate;
	} else {
		timeUntilLaunchDate = dayjs(presaleDate).isBefore(dayjs()) ? presaleEndDate : presaleDate;
	}

	const countdown = useCountdown(() => timeUntilLaunchDate);

	return { ...parseMs(countdown), timeLeft: countdown, presaleOngoing: timeUntilLaunchDate == presaleDate };
};

export default useTimeUntilLaunch;
