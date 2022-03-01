import React, { Fragment } from "react";

const RoundPicker = ({ setRound, round }: any) => {
	return (
		<div className="relative flex items-center justify-between">
			<button className={`btn round ${round === 1 ? "active" : ""}`} onClick={() => setRound(1)}>
				1
			</button>
			<button className={`btn round ${round === 2 ? "active" : ""}`} onClick={() => setRound(2)}>
				2
			</button>
			<span className="absolute z-0 w-full h-1.5 bg-purple"></span>
		</div>
	);
};

export default RoundPicker;
