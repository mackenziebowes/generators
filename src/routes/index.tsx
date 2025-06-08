import { A } from "@solidjs/router";
import { createEffect } from "solid-js";
import { Button } from "~/devano/atoms/buttons/Button";
import { Heading } from "~/devano/atoms/layout/Heading";
import { Page } from "~/devano/atoms/layout/Page";
import Stack from "~/devano/atoms/layout/Stack";
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
				<Heading as="h1">Content Management</Heading>
				<Heading as="h2">By Mackenzie Bowes</Heading>
				<Button onclick={() => togglePortal()}>Log In</Button>
			</Stack>
		</Page>
	);
}
