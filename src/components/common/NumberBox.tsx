'use client';

import clsx from 'clsx';
import { Input, Typography } from '@material-tailwind/react';
import { InformationCircleIcon } from '@heroicons/react/24/solid';
import { Control, Controller, FieldValues, Path, RegisterOptions } from 'react-hook-form';

interface INumberBoxProps<T extends FieldValues> {
	className?: string;
	name: Path<T>;
	control: Control<T>;
	label?: string;
	rules?: RegisterOptions;
	placeholder?: string;
	[x: string]: any;
}

export const NumberBox = <T extends FieldValues = any>({
	className,
	name,
	control,
	label,
	rules,
	placeholder,
	inputProps,
	...props
}: INumberBoxProps<T>) => {
	const onChangeHandler = (onChange: (newVal: number) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		const value = +e.target.value;
		if (!Number.isNaN(value)) {
			onChange(value);
		}
	};

	return (
		<Controller
			name={name}
			control={control}
			rules={rules}
			render={({ field: { value, onChange, ...field }, fieldState }) => (
				<div className={clsx('relative flex flex-col justify-start items-stretch gap-2', className)} {...props}>
					{label ? <Typography variant="paragraph">{label}</Typography> : null}
					<div className="w-[20rem]">
						<Input
							id={name}
							type="text"
							label={placeholder}
							error={Boolean(fieldState.error)}
							value={value}
							onChange={onChangeHandler(onChange as any)}
							{...field}
							{...inputProps}
						/>
						{fieldState.error ? (
							<Typography
								variant="small"
								color="red"
								className="flex items-center gap-1 font-normal mt-2"
							>
								<InformationCircleIcon className="w-4 h-4 text-red-500 -mt-px" />
								{fieldState.error?.message}
							</Typography>
						) : null}
					</div>
				</div>
			)}
		/>
	);
};
