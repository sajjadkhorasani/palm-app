import { useState } from 'react';
import { AxiosResponse } from 'axios';

export const useAxios = (fetcher: (data: any) => Promise<AxiosResponse<any, any>>) => {
	const [loading, setLoading] = useState(false);

	const fetch = async (data: any) => {
		setLoading(true);
		try {
			const response = await fetcher(data);
			return response as any;
		} catch (err) {
			return err;
		} finally {
			setLoading(false);
		}
	};

	return { fetch, loading };
};
