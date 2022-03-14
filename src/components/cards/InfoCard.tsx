import { motion } from "framer-motion/dist/framer-motion";
import Earth from "components/icons/Earth";
import Tag from "components/icons/Tag";
import User from "components/icons/User";
import ProgressBar from "components/progressbar";
import PurpleUnlock from "components/icons/PurpleUnlock";

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

interface InfoCardProps {
	day: number;
	month: string;
	title: string;
	details: string[];
	totalSold: number;
	percentage: string;
}

const Icons = [<Tag />, <Earth />, <User />, <PurpleUnlock />];

const InfoCard = ({ day, month, title, details, totalSold, percentage }: InfoCardProps) => {
	return (
		<motion.div variants={variants} className="card w-[24rem]">
			<div className="card__date">
				<span className="card__date-day">{day}</span>
				<span className="card__date-month">{month}</span>
			</div>
			<h2 className="w-[14rem] mt-8">{title}</h2>
			<ul className="flex flex-col gap-5 mt-10 font-medium">
				{details.map((detail, index) => (
					<li key={index} className="flex items-center gap-2">
						{Icons[index]}
						{detail}
					</li>
				))}
			</ul>
			<ProgressBar text={`${totalSold.toFixed(2)} tokens sold out (${percentage}%)`} percentage={percentage} />
		</motion.div>
	);
};

export default InfoCard;
