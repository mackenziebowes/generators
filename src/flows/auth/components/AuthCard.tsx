import AuthNav from "../components/Nav";
import { JSX, Show, splitProps } from "solid-js";
import { useAuthView } from "../Context";
import { ErrorMessage, Stack, Message, Heading } from "~/devano/atoms";

interface AuthCardProps extends JSX.HTMLAttributes<HTMLDivElement> {
	title: string;
	subtitle?: string;
	children: JSX.Element;
}

export default function AuthCard(props: AuthCardProps) {
	const { state } = useAuthView();
	const [l, rest] = splitProps(props, ["title", "children", "subtitle"]);

	return (
		<Stack
			direction="col"
			{...rest}
		>
			<Heading as="h3">{l.title}</Heading>
			<Show when={l.subtitle}>
				<Heading as="h4">{l.subtitle}</Heading>
			</Show>
			{l.children}
			<ErrorMessage when={state.err.get().length > 0}>
				<p>{state.err.get()}</p>
			</ErrorMessage>
			<Message when={state.msg.get().length > 0}>
				<p>{state.msg.get()}</p>
			</Message>
			<AuthNav />
		</Stack>
	);
}
