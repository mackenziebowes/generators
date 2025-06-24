import { AuthViewProvider } from "./Context";
import AuthViewContainer from "./Container";
import { useAuthPortal } from "~/global/individual/Auth";
import { Modal } from "~/devano/atoms";

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
