import React from 'react';
import { baseStyles, variantStyles } from './Button.styles';

interface ButtonProps {
	children: React.ReactNode;
	buttonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
	onClick?: () => void;
}

const Button = ({ children, buttonProps, onClick }: ButtonProps) => {
	const { className, ...rest } = buttonProps || {};
	return (
		<button
			className={`${variantStyles.primary} ${baseStyles} ${className}`}
			{...rest}
			onClick={onClick}
		>
			{children}
		</button>
	);
};

export default Button;
