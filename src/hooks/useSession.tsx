import { useContext } from 'react';

import { SessionContext } from '@@contexts';

export const useSession = () => {
	return useContext(SessionContext);
};
