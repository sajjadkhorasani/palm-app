import toast from 'react-hot-toast';

export const toastErrors = (err: any) => {
	toast.error(new Error(err).message, {
		duration: 4000,
		position: 'bottom-left',
	});
};
