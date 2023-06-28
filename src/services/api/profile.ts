import { IProfileForm } from '@@components';

import { AxiosInstance } from '../instance';

export const editProfile = (data: IProfileForm) => AxiosInstance.put('/profile', data);
