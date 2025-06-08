import { createSignal } from "solid-js";
import { AuthViewProvider } from "./Context";
import AuthViewContainer from "./Container";
import { useAuthPortal } from "~/global/individual/Auth";
import { Portal } from "solid-js/web";
import { Show } from "solid-js";
import Modal from "~/devano/atoms/layout/Modal";

const AuthPortal = () => {
	const { state } = useAuthPortal();

	return (
		<>
			<Modal
				when={state.get()}
				close={() => state.set(false)}
			>
				<AuthViewProvider>
					<AuthViewContainer />
				</AuthViewProvider>
			</Modal>
		</>
	);
};

export default AuthPortal;
