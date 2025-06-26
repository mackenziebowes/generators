import { A } from "@solidjs/router";
import { ButtonAnchor, Heading, Page, Stack } from "~/devano/atoms";

export default function NotFound() {
	return (
		<Page>
			<Stack
				direction="col"
				class="bg-(--bg-e) items-center justify-center h-[100vh] w-[100vh]"
			>
				<Heading as="h1">Not Found</Heading>
				<p>The requested resource does not exist.</p>
				<ButtonAnchor
					href="/"
					class="md:hidden"
				>
					Go Back
				</ButtonAnchor>
				<p class="hidden md:block">
					Press <kbd>CMD</kbd>/<kbd>Alt</kbd> + <kbd>←</kbd> to go back.
				</p>
			</Stack>
		</Page>
	);
}
