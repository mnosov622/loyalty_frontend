interface InputProps {
	onChange: React.ChangeEventHandler<HTMLInputElement>;
	inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}

const Input = ({ onChange, inputProps }: InputProps) => {
	return (
		<input
			onChange={onChange}
			{...inputProps}
			className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
		/>
	);
};

export default Input;
