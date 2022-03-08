import dayjs from "dayjs";
import { useEffect } from "react";
import useCountDown from "react-countdown-hook";

const interval = 1000;
const whitelistDate = process.env.REACT_APP_WHITELIST_DATE;
const presaleDate = process.env.REACT_APP_PRESALE_DATE;

const useTimeUntilLaunch = () => {
	let timeUntilLaunchDate;
	if (dayjs().isBefore(dayjs(whitelistDate))) {
		timeUntilLaunchDate = dayjs(whitelistDate).diff(dayjs());
	} else {
		timeUntilLaunchDate = dayjs(presaleDate).diff(dayjs());
	}

	const [timeLeft, { start, pause }] = useCountDown(timeUntilLaunchDate, interval);

	const onFocus = () => {
		start();
	};

	const onBlur = () => {
		pause();
	};

	useEffect(() => {
		window.addEventListener("focus", onFocus);
		window.addEventListener("blur", onBlur);

		onFocus();

		return () => {
			window.removeEventListener("focus", onFocus);
			window.removeEventListener("blur", onBlur);
		};
	}, []);

	useEffect(() => {
		start();
	}, []);

	return timeLeft;
};

export default useTimeUntilLaunch;
