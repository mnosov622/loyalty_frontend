import { JwtPayload } from '@/types/jwtPayload';
import { jwtDecode } from 'jwt-decode';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const getDecodedTokenAndValidate = async (): Promise<JwtPayload | boolean> => {
	const cookieStore = cookies();
	const tokenFromCookies = cookieStore.get('token')?.value;
	if (!tokenFromCookies) return redirect('/login');
	const decodedToken: JwtPayload = jwtDecode(tokenFromCookies as string);

	if (decodedToken.exp * 1000 < Date.now()) {
		return redirect('/login');
	}

	return decodedToken;
};
