import { useCMSAdmin, CMSAdminViews } from "../Context";
import CMSAdminLayout from "../Layout";
import { Switch, Match } from "solid-js";

/**
 * Disintermediary page - pulls types of things from server
 */
export default function NewThing() {
	const { state } = useCMSAdmin();

	return (
		<CMSAdminLayout>
			<></>
		</CMSAdminLayout>
	);
}
