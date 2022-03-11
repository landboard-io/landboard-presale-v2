import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label: string;
	tag: string;
	LabelButton?: React.ReactNode;
}

const Input = ({ label, tag, name, LabelButton, ...rest }: InputProps) => {
	return (
		<label className="input-container" htmlFor={name}>
			<div className="flex justify-between items-center w-full">
				<span className="font-bold uppercase">{label}</span>
				{LabelButton}
			</div>
			<input type="text" {...rest} />
			<span className="tag">{tag}</span>
		</label>
	);
};

export default Input;
