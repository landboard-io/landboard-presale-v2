import { motion } from "framer-motion/dist/framer-motion";

const Telegram = () => {
	return (
		<motion.svg
			whileHover={{ scale: 1.2 }}
			width="25"
			height="26"
			viewBox="0 0 25 26"
			fill="none"
			xmlns="http://www.w3.org/2000/svg">
			<path
				d="M21.526 4.02464L3.05729 11.1465C1.79687 11.6528 1.80416 12.3559 2.82604 12.6694L7.5677 14.1486L18.5385 7.22672C19.0573 6.9111 19.5312 7.08089 19.1417 7.42672L10.2531 15.4486H10.251L10.2531 15.4496L9.92604 20.3371C10.4052 20.3371 10.6167 20.1173 10.8854 19.858L13.1885 17.6184L17.9792 21.1569C18.8625 21.6434 19.4969 21.3934 19.7167 20.3392L22.8615 5.51839C23.1833 4.22777 22.3687 3.64339 21.526 4.02464Z"
				fill="white"
			/>
		</motion.svg>
	);
};

export default Telegram;
