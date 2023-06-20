'use client';

import clsx from 'clsx';
import { useCallback, useState } from 'react';
import { Button, Label, TextInput } from 'flowbite-react';
import { EnvelopeIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import { Control, Controller, FieldValues, Path, RegisterOptions } from 'react-hook-form';

interface IPasswordFieldProps<T extends FieldValues> {
	className?: string;
	name: Path<T>;
	control: Control<T>;
	label: string;
	rules?: RegisterOptions;
	placeholder?: string;
	[x: string]: any;
}

export const PasswordField = <T extends FieldValues = any>({
	className,
	name,
	control,
	label,
	rules,
	placeholder,
	inputProps,
	...props
}: IPasswordFieldProps<T>) => {
	const [state, setState] = useState(false);

	const onClickHandler = useCallback((e: React.MouseEvent) => {
		e.preventDefault();
		setState((prev) => !prev);
	}, []);

	return (
		<Controller
			name={name}
			control={control}
			rules={rules}
			render={({ field, fieldState }) => (
				<div className={clsx('relative flex flex-col justify-start items-stretch gap-2', className)} {...props}>
					<Label htmlFor={name} value={label} />
					<div className="flex flex-row justify-start items-start grow gap-1">
						<div>
							<TextInput
								id={name}
								type={state ? 'text' : 'password'}
								color={fieldState.error?.message ? 'failure' : 'gray'}
								placeholder={placeholder}
								helperText={fieldState.error?.message}
								{...field}
								{...inputProps}
							/>
						</div>
						<Button color="light" onClick={onClickHandler}>
							{state ? <EyeSlashIcon className="w-5 h-6 mx-2" /> : <EyeIcon className="w-5 h-6 mx-2" />}
						</Button>
					</div>
				</div>
			)}
		/>
	);
};
