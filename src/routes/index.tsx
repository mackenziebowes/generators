import { A } from "@solidjs/router";
import { createEffect } from "solid-js";
import { Button, Heading, Page, Stack } from "~/devano/atoms";
import { useAuthPortal } from "~/global/individual/Auth";
export default function Home() {
	const { togglePortal, state } = useAuthPortal();
	createEffect(() => {
		console.log(state.get());
	});
	return (
		<Page>
			<Stack
				direction="col"
				class="justify-center h-[100%] flex-grow gap-12"
			>
				<Heading as="h1">Blank Canvas</Heading>
			</Stack>
		</Page>
	);
}
