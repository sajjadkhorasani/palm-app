'use client';

import { Button } from '@material-tailwind/react';
import { useRouter } from 'next/navigation';

import API from '@@services';
import { useForm } from '@@hooks';
import { EmailField, PasswordField } from '@@components';

import { ISignInForm, SignInFormDefaultValue, SignInFormSchema } from './index.schema';

export const SignInForm = () => {
	const router = useRouter();
	const { control, handleSubmit } = useForm<ISignInForm>(SignInFormSchema, SignInFormDefaultValue);

	const onSubmitHandler = async (data: ISignInForm) => {
		try {
			await API.signIn(data);

			router.replace('/home');
		} catch (err) {}
	};

	const onInValid = (err: any) => {
		console.log('ERR', err);
	};

	return (
		<form
			className="relative flex flex-col justify-start items-stretch gap-6"
			onSubmit={handleSubmit(onSubmitHandler, onInValid)}
		>
			<EmailField name="email" control={control} placeholder="Email" />
			<PasswordField name="password" control={control} placeholder="Password" />
			<Button type="submit" variant="outlined" color="gray">
				Sign In
			</Button>
		</form>
	);
};
