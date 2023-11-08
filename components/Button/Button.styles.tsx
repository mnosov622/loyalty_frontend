type VariantProps = 'primary' | 'secondary';

export const baseStyles =
	'py-2 px-4 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2';

export const variantStyles: Record<VariantProps, string> = {
	primary: 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500',
	secondary:
		'bg-white text-indigo-600 hover:bg-gray-50 focus:ring-indigo-500 border border-gray-300',
};
