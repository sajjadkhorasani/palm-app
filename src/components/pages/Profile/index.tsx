'use client';

import Image from 'next/image';
import { Prisma } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { Button, Card, CardBody, CardHeader } from '@material-tailwind/react';

import API from '@@services';
import { useForm } from '@@hooks';
import { EmailField, PasswordField, TextField } from '@@components';

import { IProfileForm, ProfileFormDefaultValue, ProfileFormSchema } from './index.schema';

interface IProfileCardProps {
	user: Prisma.UserGetPayload<true>;
}

export const ProfileCard = ({ user }: IProfileCardProps) => {
	const router = useRouter();
	const { control, handleSubmit } = useForm<IProfileForm>(ProfileFormSchema, ProfileFormDefaultValue(user));

	const onSubmitHandler = async (data: IProfileForm) => {
		try {
			await API.editProfile(data);

			router.replace('/home');
		} catch (err) {}
	};

	const onInValid = (err: any) => {
		console.log('ERR', err);
	};

	return (
		<Card className="w-full max-w-[24rem]">
			<CardHeader
				color="blue"
				floated={false}
				shadow={false}
				className="m-0 grid place-items-center rounded-b-none py-8 px-4 text-center"
			>
				<Image
					alt={`${user.firstName} Avatar`}
					src={user.avatar || '/default-product.webp'}
					width={350}
					height={360}
				/>
			</CardHeader>
			<CardBody>
				<form
					className="relative flex flex-col justify-start items-stretch mt-12 gap-6"
					onSubmit={handleSubmit(onSubmitHandler, onInValid)}
				>
					<TextField name="firstName" control={control} placeholder="First Name" />
					<TextField name="lastName" control={control} placeholder="Last Name" />
					<EmailField disabled name="email" control={control} placeholder="Email" />
					<PasswordField name="password" control={control} placeholder="Password" />
					<PasswordField name="repeatPassword" control={control} placeholder="Repeat Password" />
					<Button type="submit" variant="outlined" color="gray">
						Edit Profile
					</Button>
				</form>
			</CardBody>
		</Card>
	);
};

export * from './index.schema';
