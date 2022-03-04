import { motion } from "framer-motion/dist/framer-motion";
import Earth from "components/icons/Earth";
import Tag from "components/icons/Tag";
import User from "components/icons/User";

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
	percentage: number;
}

const Icons = [<Tag />, <Earth />, <User />];

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
					<li key={index} className="flex gap-2 items-center">
						{Icons[index]}
						{detail}
					</li>
				))}
			</ul>
			<div className="relative grid w-full h-10 mt-10 md:mt-auto place-content-center bg-purple">
				<p className="font-bold">
					{totalSold} tokens sold out ({percentage}%)
				</p>
			</div>
		</motion.div>
	);
};

export default InfoCard;
