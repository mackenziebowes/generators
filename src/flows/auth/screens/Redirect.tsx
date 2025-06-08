import { onMount } from "solid-js";
import { useAuthPortal } from "~/global/individual/Auth";

export default function Redirect() {
	const { togglePortal } = useAuthPortal();
	onMount(() => {
		togglePortal();
	});
	return <></>;
}
