import { yupResolver } from '@hookform/resolvers/yup';
import { AnyObject, Maybe, ObjectSchema } from 'yup';
import { useForm as useRHFForm, DefaultValues } from 'react-hook-form';

export function useForm<T extends Maybe<AnyObject>>(schema?: ObjectSchema<T>, defaultValues?: DefaultValues<T>) {
	const { formState, ...form } = useRHFForm({
		// mode: 'all',
		criteriaMode: 'all',
		defaultValues,
		reValidateMode: 'onChange',
		shouldFocusError: true,
		resolver: schema && yupResolver(schema as any),
	});

	const errors = formState.errors;

	return { errors, formState, ...form };
}
