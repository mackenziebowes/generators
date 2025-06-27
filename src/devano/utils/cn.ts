import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import type { ClassValue } from "clsx";

/**
 * @description [c]lass[n]ame generator. Smoothly weaves and folds multiple css classes.
 * @param inputs Array of ClassValues
 * @see [clsx](https://www.npmjs.com/package/clsx) for ClassValue typedef - useful for conditional rendering / variations.
 * @returns A single class string.
 */
export const cn = (...inputs: ClassValue[]) => {
	return twMerge(clsx(inputs));
};
