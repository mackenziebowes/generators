import { JSX, Component } from "solid-js";
import { Stack, Heading } from "~/devano/atoms";
import { Section } from "~/routes/_components/Section";
export const OneParagraphSummary: Component = () => {
	return (
		<>
			<Stack
				direction="col"
				class="max-w-[60ch] items-start gap-4"
			>
				<Section>
					<Heading as="h2">Your One Paragraph Summary:</Heading>
					<p>
						The one paragraph summary is the second of ten simple steps to write
						a novel.
					</p>
				</Section>
				<Section>
					<Heading as="h3">From The Book</Heading>
					<p>
						The mnemonic for this step written in the book is reproduced here
						for memory support purposes.
					</p>
					<ol>
						<li>1) Give yourself one hour for this task.</li>
						<li>2) Write one paragraph with five sentences as follows:</li>
						<ul class="ml-4">
							<li>a) Explain the setting and introduce the lead characters.</li>
							<li>
								b) Explain the first quarter of the book up to the first
								disaster, where the hero commits to the story.
							</li>
							<li>
								c) Explain the second quarter of the book up to the second
								disaster, where the hero changes their mode of operations.
							</li>
							<li>
								d) Explain the third quarter of the book up to the third
								disaster, which forces the hero to commit to the ending.
							</li>
							<li>
								e) Explain the fourth quarter of the book, where the hero has
								the final confrontation and either wins or loses or both.
							</li>
						</ul>
						<li>3) Focus on the disasters and the decisions that follow.</li>
						<li>
							4) Don't try to figure out how to solve all the problems, save
							that for later. Focus on the big picture.
						</li>
					</ol>
				</Section>
				<Section>
					<>
						<Heading as="h3">Category</Heading>
						<p>
							It defines the category of book, which covers explicity a
							psychographic rather than demographic profile - for example,
							'romantic thriller set in world war 2' is a category. It attracts
							people that like romantic thrillers set in world war 2.
						</p>
						<p>
							This seems stupidly simple, and it is, but it works by keeping
							everyone - the author, the editors, the world, the audience, the
							publishers - focused.
						</p>
					</>
				</Section>
				<Section>
					<Heading as="h3">Characters</Heading>
					<p>
						The one sentence summary also introduces the characters involved.
					</p>
					<p>
						The lead characters are not simply defined by characterization, but
						also <em>goals</em>. The sentence must describe the one thing they
						want most - survival, usually, but sometimes comfort, status,
						freedom, etc.
					</p>
				</Section>
				<Section>
					<Heading as="h3">Imagery</Heading>
					<p>
						However, those are abstract needs and wants - goals are always
						something one can take a picture of.
					</p>
					<p>
						For example, if they want to survive a situation, does that mean
						escape and returning home?
						<br />
						Escape and building a new life elsewhere?
						<br />
						Defeating their nemesis that won't rest until they die?
					</p>
					<p>Be specific.</p>
				</Section>
				<Section>
					<Heading as="h3">Get started</Heading>
					<p>
						You should complete this task in <em>exactly</em> one hour.
					</p>
					<p>If you finish early, spend your time creating variations.</p>
					<p>
						Generally, people like <em>exciting</em> stories - stories are an
						opportunity to learn how to handle dangerous situations safely.
						<br />
						That's valuable to everyone.
					</p>
					<p>See if you can raise the stakes.</p>
					<p>
						However, if you <em>fail</em> to write a single sentence in an
						entire hour, take a break for an entire day and come back tomorrow
						to try again.
					</p>
				</Section>
			</Stack>
		</>
	);
};
