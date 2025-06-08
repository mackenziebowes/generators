import { useCMSAdmin, CMSAdminViews } from "./Context";
import { JSX, Suspense } from "solid-js";
import Screens from "./screens";
import AdminNav from "./_components/Nav";
import Stack from "~/devano/atoms/layout/Stack";
import { Page } from "~/devano/atoms/layout/Page";

interface ProviderProps extends JSX.HTMLAttributes<HTMLDivElement> {}

export default function CMSAdminLayout(props: ProviderProps) {
	return (
		<Suspense fallback={<Screens.Skeleton />}>
			<Page class="h-[100vh]">
				<Stack
					direction="row"
					class="w-full h-[100%] flex-grow px-4 py-2"
				>
					<AdminNav />
					{props.children}
				</Stack>
			</Page>
		</Suspense>
	);
}
