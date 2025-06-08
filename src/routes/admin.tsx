import { CMSAdminProvider } from "~/flows/cms/Context";
import CMSAdminLayout from "~/flows/cms/Layout";
export default function Home() {
	return (
		<>
			<CMSAdminProvider>
				<CMSAdminLayout />
			</CMSAdminProvider>
		</>
	);
}
