import { Component, For, JSX } from "solid-js";
import { Anchor, Heading, Page, Stack } from "~/devano/atoms";
import { Section } from "~/routes/_components/Section";
import { OneSentenceSummary } from "./_parts/oneSentenceSummary";
import { OneParagraphSummary } from "./_parts/oneParagraphSummary";
export default function Home() {
	return (
		<Page>
			<Stack
				direction="col"
				class="justify-center h-[100%] flex-grow gap-12 p-12"
			>
				<BasicDesignB />
			</Stack>
		</Page>
	);
}

const BasicDesignB = () => {
	return (
		<>
			<Section>
				<Heading as="h1">Snowflake Guide</Heading>
			</Section>
			<OneSentenceSummary />
			<OneParagraphSummary />
		</>
	);
};
