export interface JwtPayload {
	id: string;
	email: string;
	firstName: string;
	iat: number;
	exp: number;
	roles: string[];
}
