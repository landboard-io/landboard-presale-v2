import { motion } from "framer-motion/dist/framer-motion";
import { Fragment } from "react";

const ButtonContent = ({ disabled, link, className, type, children, external, hideComingSoon, ...rest }: any) => {
	if (external) {
		return (
			<a href={external} className={`btn ${className}`}>
				{children}
			</a>
		);
	}

	return (
		<Fragment>
			<button className={`btn ${className}`} type={type} disabled={disabled} {...rest}>
				{children}
			</button>
			{disabled && !hideComingSoon && (
				<div className="absolute p-2 text-xs rounded -right-2 z-100 bg-purple md:-right-6 -top-5">Coming Soon</div>
			)}
		</Fragment>
	);
};

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

const Button = (props: any) => {
	const { animate, containerClassname = "", ...rest } = props;

	return (
		<motion.div className={`relative ${containerClassname}`} variants={variants}>
			{<ButtonContent {...rest} />}
		</motion.div>
	);
};

export default Button;
