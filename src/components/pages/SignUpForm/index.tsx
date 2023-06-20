'use client';

import { Button } from 'flowbite-react';
import { useRouter } from 'next/navigation';

import API from '@@services';
import { useForm } from '@@hooks';
import { EmailField, PasswordField, TextField } from '@@components';

import { ISignUpForm, SignUpFormDefaultValue, SignUpFormSchema } from './index.schema';

export const SignUpForm = () => {
	const router = useRouter();
	const { control, handleSubmit } = useForm<ISignUpForm>(SignUpFormSchema, SignUpFormDefaultValue);

	const onSubmitHandler = async ({ repeatPassword, ...data }: ISignUpForm) => {
		try {
			await API.signUp(data);

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
			<TextField name="firstName" control={control} label="First Name" placeholder="Your First Name" />
			<TextField name="lastName" control={control} label="Last Name" placeholder="Your Last Name" />
			<EmailField name="email" control={control} label="Email" placeholder="Enter Email Account" />
			<PasswordField name="password" control={control} label="Password" placeholder="Enter Your Password" />
			<PasswordField
				name="repeatPassword"
				control={control}
				label="Repeat Password"
				placeholder="Enter Your Password"
			/>
			<Button type="submit" className="mt-8 mx-2" color="light">
				Sign Up
			</Button>
		</form>
	);
};
