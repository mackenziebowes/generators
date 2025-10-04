import { Button, Card, Heading, Page, Stack } from "~/devano/atoms";
import type { Component } from "solid-js";
import { createEffect, Switch, Match } from "solid-js";
import { RoundCharacter } from "./_layouts/round";

import { CharacterProvider } from "./_components/context";

export default function Home() {
	return (
		<Page>
			<Stack
				direction="col"
				class="justify-start h-[100%] flex-grow gap-12 p-[48px] w-full"
			>
				<Heading as="h1">Roll A Character</Heading>
				<CharacterProvider>
					<Switch fallback={<RoundCharacter />}>
						<Match when={false}>
							<></>
						</Match>
					</Switch>
				</CharacterProvider>
			</Stack>
		</Page>
	);
}
