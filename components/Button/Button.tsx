import React from 'react';
import { baseStyles, variantStyles } from './Button.styles';

interface ButtonProps {
	children: React.ReactNode;
	props?: React.ButtonHTMLAttributes<HTMLButtonElement>;
}

const Button = ({ children, props }: ButtonProps) => {
	return (
		<button
			className={variantStyles.primary + ' ' + baseStyles}
			{...props}
		>
			{children}
		</button>
	);
};

export default Button;
