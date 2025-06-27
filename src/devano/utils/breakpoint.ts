/**
 * @file breakpoint.ts
 * @module breakpoint-utils
 * @description Helpers for applying Tailwind responsive prefixes.
 */

/**
 *
 * @description Use this to quickly add 'sm:" to tailwind classes - makes the class apply to the sm band and above, by default from 40rem (640px).
 * @param classRules Tailwind rules to transform
 * @returns A Class with sm: prepended to each entry
 */
const makeSm = (classRules: string) => {
	return classRules
		.split(" ")
		.map((rule) => `sm:${rule}`)
		.join(" ");
};

/**
 * @description Use this to quickly add 'md:' to tailwind classes - makes the class apply to the md band and above, by default from 48rem (768px).
 * @param classRules Tailwind rules to transform
 * @returns A Class with md: prepended to each entry
 */
const makeMd = (classRules: string) => {
	return classRules
		.split(" ")
		.map((rule) => `md:${rule}`)
		.join(" ");
};

/**
 * @description Use this to quickly add 'lg:' to tailwind classes - makes the class apply to the lg band and above, by default from 64rem (1024px).
 * @param classRules Tailwind rules to transform
 * @returns A Class with lg: prepended to each entry
 */
const makeLg = (classRules: string) => {
	return classRules
		.split(" ")
		.map((rule) => `lg:${rule}`)
		.join(" ");
};

/**
 * @description Use this to quickly add 'xl:' to tailwind classes - makes the class apply to the xl band and above, by default from 80rem (1280px).
 * @param classRules Tailwind rules to transform
 * @returns A Class with 'xl:' prepended to each entry
 */
const makeXl = (classRules: string) => {
	return classRules
		.split(" ")
		.map((rule) => `xl:${rule}`)
		.join(" ");
};

/**
 * @description Use this to quickly add '2xl:' to tailwind classes - makes the class apply to the 2xl band and above, by default from 96rem (1536px).
 * @param classRules Tailwind rules to transform
 * @returns A Class with '2xl:' prepended to each entry
 */
const make2xl = (classRules: string) => {
	return classRules
		.split(" ")
		.map((rule) => `2xl:${rule}`)
		.join(" ");
};

/**
 * A set of utilities for applying “min-width” breakpoint prefixes.
 *
 * @namespace BreakpointMin
 * @property {function(string):string} sm   — ≥sm (40rem)
 * @property {function(string):string} md   — ≥md (48rem)
 * @property {function(string):string} lg   — ≥lg (64rem)
 * @property {function(string):string} xl   — ≥xl (80rem)
 * @property {function(string):string} '2xl' — ≥2xl (96rem)
 */
export const min = {
	sm: makeSm,
	md: makeMd,
	lg: makeLg,
	xl: makeXl,
	"2xl": make2xl,
};

/**
 *
 * @description Use this to quickly add 'max-sm:" to tailwind classes - makes the class apply below the sm band, by default from 40rem (640px).
 * @param classRules Tailwind rules to transform
 * @returns A Class with 'max-sm:' prepended to each entry
 */
const maxSm = (classRules: string) => {
	return classRules
		.split(" ")
		.map((rule) => `max-sm:${rule}`)
		.join(" ");
};

/**
 * @description Use this to quickly add 'max-md:' to tailwind classes - makes the class apply below the md band, by default from 48rem (768px).
 * @param classRules Tailwind rules to transform
 * @returns A Class with 'max-md:' prepended to each entry
 */
const maxMd = (classRules: string) => {
	return classRules
		.split(" ")
		.map((rule) => `max-md:${rule}`)
		.join(" ");
};

/**
 * @description Use this to quickly add 'max-lg:' to tailwind classes - makes the class apply below the lg band, by default from 64rem (1024px).
 * @param classRules Tailwind rules to transform
 * @returns A Class with 'max-lg:' prepended to each entry
 */
const maxLg = (classRules: string) => {
	return classRules
		.split(" ")
		.map((rule) => `max-lg:${rule}`)
		.join(" ");
};

/**
 * @description Use this to quickly add 'max-xl' to tailwind classes - makes the class apply below the xl band, by default from 80rem (1280px).
 * @param classRules Tailwind rules to transform
 * @returns A Class with 'max-xl:' prepended to each entry
 */
const maxXl = (classRules: string) => {
	return classRules
		.split(" ")
		.map((rule) => `max-xl:${rule}`)
		.join(" ");
};

/**
 * @description Use this to quickly add 'max-2xl:' to tailwind classes - makes the class apply below the 2xl band, by default from 96rem (1536px).
 * @param classRules Tailwind rules to transform
 * @returns A Class with 'max-2xl:' prepended to each entry
 */
const max2xl = (classRules: string) => {
	return classRules
		.split(" ")
		.map((rule) => `max-2xl:${rule}`)
		.join(" ");
};

/**
 * A set of utilities for applying max-width” breakpoint prefixes.
 *
 * @namespace BreakpointMin
 * @property {function(string):string} sm   — ≤sm (40rem)
 * @property {function(string):string} md   — ≤md (48rem)
 * @property {function(string):string} lg   — ≤lg (64rem)
 * @property {function(string):string} xl   — ≤xl (80rem)
 * @property {function(string):string} '2xl' — ≤2xl (96rem)
 */
export const max = {
	sm: maxSm,
	md: maxMd,
	lg: maxLg,
	xl: maxXl,
	["2xl"]: max2xl,
};
