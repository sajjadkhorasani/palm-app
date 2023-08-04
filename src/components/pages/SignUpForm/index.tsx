'use client';

import { signIn } from 'next-auth/react';

import API from '@@services';
import { useAxios, useForm } from '@@hooks';
import { Button, EmailField, PasswordField, TextField } from '@@components';

import { ISignUpForm, SignUpFormDefaultValue, SignUpFormSchema } from './index.schema';

export function SignUpForm() {
	const { fetch, loading } = useAxios(API.signUp);
	const { control, handleSubmit } = useForm<ISignUpForm>(SignUpFormSchema, SignUpFormDefaultValue);

	const onSubmitHandler = async ({ repeatPassword, ...data }: ISignUpForm) => {
		try {
			await fetch(data);

			signIn(undefined, { callbackUrl: '/' });
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
			<TextField name="firstName" control={control} placeholder="First Name" />
			<TextField name="lastName" control={control} placeholder="Last Name" />
			<EmailField name="email" control={control} placeholder="Email" />
			<PasswordField preview name="password" control={control} placeholder="Password" />
			<PasswordField name="repeatPassword" control={control} placeholder="Repeat Password" />
			<Button loading={loading} type="submit" variant="outlined" color="gray">
				Sign Up
			</Button>
		</form>
	);
}
