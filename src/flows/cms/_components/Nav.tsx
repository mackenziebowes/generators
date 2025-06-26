import { useCMSAdmin, CMSAdminViews } from "../Context";
import { Anchor, FlexSeparator, Heading, Stack } from "~/devano/atoms";

/**
 * I have dreams for this component - big dreams, I say!
 * I want this mf to be very different between desktop and mobile views.
 * On Mobile:
 * Side drawer, comes in from the right, vertically stacked, accessible by an absolutely positioned button near the bottom right of the screen.
 * On Desktop:
 * Sidebar, vertically stacked and placed on the left of the screen.
 * Should be styled differently depending on the current view - can use the activeClass / inactiveClass props to give tailwind styles that are merged.
 */

/**
 * Let's get started with the desktop variant:
 */
export default function AdminNav() {
	// export enum CMSAdminViews {
	// 	Id = "/cms/admin/edit/",
	// 	NewType = "/cms/admin/new/type",
	// 	NewByType = "/cms/admin/new/",
	// 	Bulk = "/cms/admin/bulk",
	// 	Dash = "/cms/admin/dashboard",
	// }

	return (
		<Stack
			direction="col"
			class="mx-2 my-1 rounded-md p-4 h-[100%] bg-(--bg-a) items-start"
		>
			<Heading as="h2">Site Name</Heading>
			<Stack
				direction="col"
				class="justify-center items-start"
			>
				<Heading as="h5">Navigation</Heading>
				<FlexSeparator direction="horizontal"></FlexSeparator>
				<Anchor
					href={CMSAdminViews.Dash}
					activeClass={
						"px-2 bg-(--fg-a) text-(--bg-e) hover:bg-(--fg-i) hover:text-(--bg-e)"
					}
					end
				>
					Dashboard
				</Anchor>
				<Anchor
					href={CMSAdminViews.NewByType}
					end
				>
					Make New Thing
				</Anchor>
				<Anchor
					href={CMSAdminViews.NewType}
					end
				>
					Make New Thing Type
				</Anchor>
			</Stack>
		</Stack>
	);
}
