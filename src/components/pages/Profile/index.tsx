'use client';

import { Prisma } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { Card, CardBody, CardHeader } from '@material-tailwind/react';

import API from '@@services';
import { useAxios, useForm } from '@@hooks';
import { Button, EmailField, FileUploader, PasswordField, TextField } from '@@components';

import { IProfileForm, ProfileFormDefaultValue, ProfileFormSchema } from './index.schema';

interface IProfileCardProps {
	user: Prisma.UserGetPayload<true>;
}

export function ProfileCard({ user }: IProfileCardProps) {
	const router = useRouter();
	const { fetch, loading } = useAxios(API.editProfile);
	const { control, handleSubmit } = useForm<IProfileForm>(ProfileFormSchema, ProfileFormDefaultValue(user));

	const onSubmitHandler = async (data: any) => {
		try {
			const res = await fetch(data);

			if (res.data.isOk) {
				router.push('/');
			}
		} catch (err) {}
	};

	const onInValid = (err: any) => {
		console.log('ERR', err);
	};

	return (
		<Card className="w-full max-w-[24rem]">
			<CardHeader
				floated={false}
				shadow={false}
				className="m-0 grid place-items-center rounded-b-none py-8 px-4 text-center"
			>
				<FileUploader alt={`${user.firstName} Avatar`} src={user.avatar} />
			</CardHeader>
			<CardBody>
				<form
					className="relative flex flex-col justify-start items-center mt-12 gap-6"
					onSubmit={handleSubmit(onSubmitHandler, onInValid)}
				>
					<TextField name="firstName" control={control} placeholder="First Name" />
					<TextField name="lastName" control={control} placeholder="Last Name" />
					<EmailField name="email" control={control} placeholder="Email" inputProps={{ disabled: true }} />
					<PasswordField name="password" control={control} placeholder="Password" />
					<PasswordField name="repeatPassword" control={control} placeholder="Repeat Password" />
					<Button loading={loading} type="submit" variant="outlined" color="gray">
						Edit Profile
					</Button>
				</form>
			</CardBody>
		</Card>
	);
}
