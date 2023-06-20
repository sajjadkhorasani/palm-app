'use client';

import clsx from 'clsx';
import { Label, TextInput } from 'flowbite-react';
import { Control, Controller, FieldValues, Path, RegisterOptions } from 'react-hook-form';

interface IEmailFieldProps<T extends FieldValues> {
	className?: string;
	name: Path<T>;
	control: Control<T>;
	label: string;
	rules?: RegisterOptions;
	placeholder?: string;
	[x: string]: any;
}

export const EmailField = <T extends FieldValues = any>({
	className,
	name,
	control,
	label,
	rules,
	placeholder,
	inputProps,
	...props
}: IEmailFieldProps<T>) => {
	return (
		<Controller
			name={name}
			control={control}
			rules={rules}
			render={({ field, fieldState }) => (
				<div className={clsx('relative flex flex-col justify-start items-stretch gap-2', className)} {...props}>
					<Label htmlFor={name} value={label} />
					<TextInput
						id={name}
						type="email"
						color={fieldState.error?.message ? 'failure' : 'gray'}
						placeholder={placeholder}
						helperText={fieldState.error?.message}
						{...field}
						{...inputProps}
					/>
				</div>
			)}
		/>
	);
};
