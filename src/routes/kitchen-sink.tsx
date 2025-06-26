import * as Atoms from "~/devano/atoms";
import * as Comp from "~/devano/components";

export default function KitchenSink() {
	return (
		<Atoms.Page>
			<Atoms.PageInner>
				<Atoms.Stack
					direction="col"
					class="gap-3 items-center"
				>
					<Atoms.Card
						title="Accordion"
						class="w-full"
					>
						<Atoms.Heading as="h4">Single</Atoms.Heading>
						<Comp.Accordion
							type="single"
							defaultValue="1"
						>
							<Comp.AccordionItem
								id="1"
								title="First Child"
							>
								<p>First Child of Accordion</p>
							</Comp.AccordionItem>
							<Comp.AccordionItem
								id="2"
								title="Second Child"
							>
								<p>Second Child of Accordion</p>
							</Comp.AccordionItem>
						</Comp.Accordion>
						<Atoms.Heading as="h4">Multi</Atoms.Heading>
						<Comp.Accordion
							type="multi"
							defaultValue="1"
						>
							<Comp.AccordionItem
								id="1"
								title="First Child"
							>
								<p>First Child of Accordion</p>
							</Comp.AccordionItem>
							<Comp.AccordionItem
								id="2"
								title="Second Child"
							>
								<p>Second Child of Accordion</p>
							</Comp.AccordionItem>
							<Comp.AccordionItem
								id="3"
								title="Third Child"
							>
								<p>Third Child of Accordion</p>
							</Comp.AccordionItem>
						</Comp.Accordion>
					</Atoms.Card>
					<Atoms.Card
						title="Avatar"
						class="w-full"
					>
						<p>Basic Avatar</p>
						<Comp.Avatar size={48} />
						<p>Named Avatar without image</p>
						<Comp.Avatar
							name="Mackenzie Bowes"
							size={48}
						/>
						<p>Avatar With Image</p>
						<Comp.Avatar
							src="https://i.pravatar.cc/48"
							size={48}
						/>
					</Atoms.Card>
					<Atoms.Card
						title="Badge"
						class="w-full"
					>
						<p>Badges have two axes: Semantic + Priority</p>
						<p>Medium Priority (default):</p>
						<div class="flex  w-full flex-wrap gap-[6px]">
							<Comp.Badge label="Default" />
							<Comp.Badge
								type="destructive"
								label="Destructive"
							/>
							<Comp.Badge
								type="success"
								label="Success"
							/>
							<Comp.Badge
								type="warning"
								label="Warning"
							/>
							<Comp.Badge
								type="info"
								label="Info"
							/>
						</div>
						<p>High Priority:</p>
						<div class="flex w-full flex-wrap gap-[6px]">
							<Comp.Badge
								priority="high"
								label="Default"
							/>
							<Comp.Badge
								type="destructive"
								priority="high"
								label="Destructive"
							/>
							<Comp.Badge
								type="success"
								priority="high"
								label="Success"
							/>
							<Comp.Badge
								type="warning"
								priority="high"
								label="Warning"
							/>
							<Comp.Badge
								type="info"
								priority="high"
								label="Info"
							/>
						</div>
						<p>Low Priority:</p>
						<div class="flex w-full flex-wrap gap-[6px]">
							<Comp.Badge
								priority="low"
								label="Default"
							/>
							<Comp.Badge
								type="destructive"
								priority="low"
								label="Destructive"
							/>
							<Comp.Badge
								type="success"
								priority="low"
								label="Success"
							/>
							<Comp.Badge
								type="warning"
								priority="low"
								label="Warning"
							/>
							<Comp.Badge
								type="info"
								priority="low"
								label="Info"
							/>
						</div>
					</Atoms.Card>
				</Atoms.Stack>
			</Atoms.PageInner>
		</Atoms.Page>
	);
}
