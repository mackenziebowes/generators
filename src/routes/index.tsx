import { Component, For } from "solid-js";
import { Anchor, Heading, Page, Stack } from "~/devano/atoms";
export default function Home() {
	return (
		<Page>
			<Stack
				direction="col"
				class="justify-center h-[100%] flex-grow gap-12"
			>
				<Heading as="h1">Generators</Heading>
				<Nav />
			</Stack>
		</Page>
	);
}

const Nav: Component = () => {
	return (
		<div class="grid grid-cols-1 md:grid-cols-2 gap-[12px]">
			<div class="grid grid-cols-1 gap-[2rem]">
				<Heading as="h3">Characters</Heading>
				<Anchor href="/generators/characters">Flawed Protagonist</Anchor>
			</div>
			<div class="grid grid-cols-1 gap-[2rem]">
				<Heading as="h3">Plot</Heading>
				<Anchor href="/generators/plots">Plot Generator</Anchor>
			</div>
		</div>
	);
};
