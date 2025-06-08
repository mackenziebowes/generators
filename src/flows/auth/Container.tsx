import { useAuthView, AuthPages } from "./Context";
import { Switch, Match } from "solid-js";
import Screens from "./screens";

export default function AuthViewContainer() {
	const { state } = useAuthView();
	return (
		<Switch fallback={<></>}>
			<></>
			<Match when={state.view.get() === AuthPages.Login}>
				<Screens.LogIn />
			</Match>
			<Match when={state.view.get() === AuthPages.ProcessMagicLink}>
				<Screens.Mlc />
			</Match>
			<Match when={state.view.get() === AuthPages.ResetPassword}>
				<Screens.ResetPassword />
			</Match>
			<Match when={state.view.get() === AuthPages.ConfirmNewPassword}>
				<Screens.UpdatePassword />
			</Match>
			<Match when={state.view.get() === AuthPages.Null}>
				<Screens.Redirect />
			</Match>
		</Switch>
	);
}
