import { object, string } from 'yup';

export interface ISignInForm {
	email: string;
	password: string;
}

export const SignInFormDefaultValue = {
	email: '',
	password: '',
};

export const SignInFormSchema = object({
	email: string().email('Email not valid!').required('Email is required!'),
	password: string().required('Password is required!'),
});
