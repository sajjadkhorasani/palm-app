'use client';

import Image from 'next/image';
import { useMemo, useRef, useState } from 'react';
import { Avatar, Button, Dialog, DialogBody, DialogFooter, DialogHeader, Progress } from '@material-tailwind/react';

import API from '@@services';

interface IFileUploaderProps {
	className?: string;
	alt?: string;
	src?: string | null;
}

export const FileUploader = ({ alt, src, ...props }: IFileUploaderProps) => {
	const inputRef = useRef<HTMLInputElement>(null);
	const [modal, setModal] = useState<File | null>(null);
	const [progress, setProgress] = useState<number>(0);

	const onOpenFile = (e: React.MouseEvent) => {
		e.preventDefault();
		if (inputRef && inputRef.current) {
			inputRef.current.showPicker();
		}
	};

	const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		if (e.target.files?.length) {
			setModal(e.target.files[0]);
		}
	};

	const onCloseModal = (e: React.MouseEvent) => {
		e.preventDefault();
		if (inputRef && inputRef.current) {
			inputRef.current.value = '';
		}
		setModal(null);
	};

	const onConfirmModal = async (e: React.MouseEvent) => {
		e.preventDefault();
		if (modal) {
			const formData = new FormData();
			formData.append('file', modal);
			await API.uploadFile(formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
				onUploadProgress(event) {
					setProgress(Math.round((event.loaded * 100) / (event.total as any)));
				},
			});
		}
		setProgress(0);
		onCloseModal(e);
	};

	const isLoading = useMemo(() => Boolean(progress), [progress]);

	return (
		<div className="flex flex-col justify-center items-center" {...props}>
			{modal ? (
				<Dialog open={Boolean(modal)} handler={() => {}}>
					<DialogHeader>Accept Your Profile</DialogHeader>
					<DialogBody className="flex flex-col justify-center items-center" divider>
						Are You Sure to Change Your Profile Avatar ?
						<Avatar className="mt-4" size="xxl" src={URL.createObjectURL(modal)} />
						Preview
					</DialogBody>
					<DialogFooter>
						<Button disabled={isLoading} className="mr-1" variant="text" color="red" onClick={onCloseModal}>
							<span>Cancel</span>
						</Button>
						<Button
							disabled={isLoading}
							variant={!isLoading ? 'gradient' : 'outlined'}
							color={!isLoading ? 'green' : 'gray'}
							onClick={onConfirmModal}
						>
							{!isLoading ? (
								<span>Confirm</span>
							) : (
								<Progress className="w-12" size="sm" value={progress} />
							)}
						</Button>
					</DialogFooter>
				</Dialog>
			) : null}
			<Image
				priority
				className="cursor-pointer"
				alt={alt || 'default-product.webp'}
				src={src || '/default-product.webp'}
				width={350}
				height={360}
				onClick={onOpenFile}
			/>
			<input
				ref={inputRef}
				onChange={onChangeHandler}
				type="file"
				accept="image/png, image/jpg, image/jpeg"
				hidden
				{...inputRef}
			/>
		</div>
	);
};
