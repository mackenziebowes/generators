import { JSX } from "solid-js";
import { Stack } from "~/devano/atoms";
export const Section = ({ children }: { children: JSX.Element }) => {
	return (
		<div class="grid items-center py-[50dvh] w-full">
			<Stack
				direction="col"
				class="max-w-[50ch] items-start gap-4"
			>
				{children}
			</Stack>
		</div>
	);
};
