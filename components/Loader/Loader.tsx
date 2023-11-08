import React from 'react';

type CircleLoaderProps = {
	dark?: boolean;
};

const CircleLoader = ({ dark }: CircleLoaderProps) => {
	return (
		<div
			className={`inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid  ${
				dark ? 'border-dark-100 dark:border-white-100' : 'border-current'
			}  border-r-transparent dark:border-r-transparent align-[-0.5em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
      role="status`}
		>
			<span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"></span>
		</div>
	);
};

export default CircleLoader;
