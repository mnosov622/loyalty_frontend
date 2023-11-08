import React from 'react';
import { baseStyles, variantStyles } from './Button.styles';

interface ButtonProps {
	children: React.ReactNode;
	buttonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
}

const Button = ({ children, buttonProps }: ButtonProps) => {
	const { className, ...rest } = buttonProps || {};
	return (
		<button
			className={`${variantStyles.primary} ${baseStyles} ${className}`}
			{...rest}
		>
			{children}
		</button>
	);
};

export default Button;
