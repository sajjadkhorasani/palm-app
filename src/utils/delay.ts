export const delay = <R = any, Args = any[]>(callback: (args: Args | undefined) => R, time: number, args?: Args) => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(callback(args));
		}, time);
	});
};
