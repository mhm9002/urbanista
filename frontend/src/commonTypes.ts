export type queryRespose = {
	code: responseCode;
	payload: any;
};

export type responseCode = {
	success: boolean;
	code: number,
	message: string
}