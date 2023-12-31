'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';

import { useForm } from '@@hooks';
import { Button, EmailField, PasswordField } from '@@components';

import { ISignInForm, SignInFormDefaultValue, SignInFormSchema } from './index.schema';

export function SignInForm() {
	const searchParams = useSearchParams();
	const [loading, setLoading] = useState(false);
	const { control, handleSubmit } = useForm<ISignInForm>(SignInFormSchema, SignInFormDefaultValue);

	const callbackUrl = searchParams.get('callbackUrl') || '/home';

	const onSubmitHandler = async (data: any) => {
		setLoading(true);
		try {
			await signIn('credentials', { redirect: true, ...data, callbackUrl });
		} catch (err) {
		} finally {
			setLoading(false);
		}
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
			<Button loading={loading} type="submit" variant="outlined" color="gray">
				Sign In
			</Button>
		</form>
	);
}
