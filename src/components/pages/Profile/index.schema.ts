import { Prisma } from '@prisma/client';
import { object, ref, string } from 'yup';

export interface IProfileForm {
	firstName: string;
	lastName: string;
    email: string;
	password: string;
	repeatPassword: string;
}

export const ProfileFormDefaultValue = (user: Prisma.UserGetPayload<true>) => ({
	firstName: user.firstName || '',
	lastName: user.lastName || '',
    email: user.email,
	password: '',
	repeatPassword: '',
});

export const ProfileFormSchema = object({
	firstName: string().required('First Name is required!'),
	lastName: string().required('Last Name is required!'),
	email: string().email('Email not valid!').required('Email is required!'),
	password: string().min(8).required('Password is required!'),
	repeatPassword: string()
		.min(8)
		.required('Password is required!')
		.oneOf([ref('password'), ''], 'Passwords must match'),
});
