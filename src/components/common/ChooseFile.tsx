'use client';

import clsx from 'clsx';
import Image from 'next/image';
import { useRef } from 'react';
import { Button, IconButton, Typography } from '@material-tailwind/react';
import { InformationCircleIcon, TrashIcon } from '@heroicons/react/24/solid';
import { Control, Controller, FieldValues, Path, RegisterOptions } from 'react-hook-form';

interface IChooseFileProps<T extends FieldValues> {
	className?: string;
	name: Path<T>;
	control: Control<T>;
	label?: string;
	rules?: RegisterOptions;
	placeholder?: string;
	[x: string]: any;
}

export const ChooseFile = <T extends FieldValues = any>({
	className,
	name,
	control,
	label,
	rules,
	placeholder,
	inputProps,
	...props
}: IChooseFileProps<T>) => {
	const inputRef = useRef<HTMLInputElement>(null);

	const onOpenFile = (e: React.MouseEvent) => {
		e.preventDefault();
		if (inputRef && inputRef.current) {
			inputRef.current.showPicker();
		}
	};

	const onChangeHandler = (onChange: (newVal: any) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		if (e.target.files?.length) {
			onChange(e.target.files[0]);
		}
	};

	return (
		<Controller
			name={name}
			control={control}
			rules={rules}
			render={({ field: { value, onChange }, fieldState }) => {
				return (
					<div
						className={clsx('relative flex flex-col justify-start items-stretch gap-2', className)}
						{...props}
					>
						{label ? (
							<Typography variant="paragraph" htmlFor={name}>
								{label}
							</Typography>
						) : null}
						<div className="w-[20rem] flex flex-col justify-start items-center gap-4">
							{value ? (
								<div className="relative w-[350px]">
									<Image
										priority
										className="cursor-pointer"
										alt={'default.png'}
										src={URL.createObjectURL(value)}
										width={350}
										height={360}
									/>
									<IconButton
										color="red"
										variant="text"
										className="!absolute top-0 left-0"
										onClick={() => onChange(undefined as any)}
									>
										<TrashIcon className="w-6 h-6 text-red-500" />
									</IconButton>
								</div>
							) : null}
							<Button onClick={onOpenFile}>Choose Image</Button>
							<input
								hidden
								id={name}
								ref={inputRef}
								type="file"
								accept="image/png, image/jpg, image/jpeg"
								onChange={onChangeHandler(onChange)}
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
				);
			}}
		/>
	);
};
