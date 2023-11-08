import React from 'react';
import { baseStyles, variantStyles } from './Button.styles';

interface ButtonProps {
	children: React.ReactNode;
	buttonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
}

const Button = ({ children, buttonProps }: ButtonProps) => {
	return (
		<button
			className={`${variantStyles.primary} ${baseStyles}`}
			{...buttonProps}
		>
			{children}
		</button>
	);
};

export default Button;
