'use client';

import clsx from 'clsx';
import { Input, Typography } from '@material-tailwind/react';
import { InformationCircleIcon } from '@heroicons/react/24/solid';
import { Control, Controller, FieldValues, Path, RegisterOptions } from 'react-hook-form';

interface IPasswordFieldProps<T extends FieldValues> {
	className?: string;
	name: Path<T>;
	control: Control<T>;
	label?: string;
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
	// const [state, setState] = useState(false);

	// const onClickHandler = useCallback((e: React.MouseEvent) => {
	// 	e.preventDefault();
	// 	setState((prev) => !prev);
	// }, []);

	return (
		<Controller
			name={name}
			control={control}
			rules={rules}
			render={({ field, fieldState }) => (
				<div className={clsx('relative flex flex-col justify-start items-stretch gap-2', className)} {...props}>
					{label ? (
						<Typography variant="paragraph" htmlFor={name}>
							{label}
						</Typography>
					) : null}
					<div className="w-[20rem]">
						<Input
							id={name}
							type="password"
							label={placeholder}
							error={Boolean(fieldState.error)}
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
						{/* <Button variant="text" color="gray" onClick={onClickHandler}>
							{state ? <EyeSlashIcon className="w-5 h-6 mx-2" /> : <EyeIcon className="w-5 h-6 mx-2" />}
						</Button> */}
					</div>
				</div>
			)}
		/>
	);
};
