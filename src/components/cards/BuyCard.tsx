import Button from "components/buttons";
import Input from "components/input";
import React from "react";

const BuyCard = () => {
	return (
		<div className="pb-10 card">
			<h2 className="mb-10">Buy LAND Token</h2>
			<form className="flex flex-col gap-5 text-left">
				<Input label="YOU PAY" tag="EGLD" type="number" />
				<Input label="YOU GET" tag="LAND" type="number" />
				<Button className="filled w-[16.875rem]" containerClassname="mt-5" type="submit" disabled>
					BUY $LAND
				</Button>
			</form>
		</div>
	);
};

export default BuyCard;
