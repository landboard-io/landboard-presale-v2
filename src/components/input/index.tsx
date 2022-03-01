import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label: string;
	tag: string;
}

const Input = ({ label, tag, name, ...rest }: InputProps) => {
	return (
		<label className="input-container" htmlFor={name}>
			<span className="font-bold uppercase">{label}</span>
			<input type="text" {...rest} />
			<span className="tag">{tag}</span>
		</label>
	);
};

export default Input;
