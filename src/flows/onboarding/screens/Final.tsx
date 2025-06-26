import {
	Stack,
	Card,
	Heading,
	CheckboxInput,
	ButtonAnchor,
	ErrorMessage,
} from "~/devano/atoms";
import { useOnboarding } from "../Context";
import { createSignal, createEffect } from "solid-js";

export default function Final() {
	const { state } = useOnboarding();
	const valid = () => {
		return state.agreedToTerms.get() && state.confirmed.get();
	};
	return (
		<Stack direction="col">
			<Card>
				<Heading as="h2">You made it!</Heading>
				<p>
					Howdy partner! Welcome to the final stretch of this here journey.
					Saddle up and let's ride!
				</p>
				<p>
					If you need help, visit our support center or reach out to us at
					support@example.com. We're here to assist you!
				</p>
				<ButtonAnchor
					href="#"
					disabled={!valid()}
				>
					Ramble on...
				</ButtonAnchor>
			</Card>
		</Stack>
	);
}
