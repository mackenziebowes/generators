import { Component, For } from "solid-js";
import { Anchor, Heading, Page, Stack } from "~/devano/atoms";
export default function Home() {
  return (
    <Page>
      <Stack direction="col" class="justify-center h-[100%] flex-grow gap-12">
        <Heading as="h1">Mook Generator</Heading>
        <p>
          <strong>Mooks</strong> are generic bad guys for your story. Obstacles,
          threats, hidden dangers, etc.
        </p>
        <Nav />
      </Stack>
    </Page>
  );
}

const Nav: Component = () => {
  return (
    <div class="grid grid-cols-1 md:grid-cols-2 gap-[12px]">
      <div class="grid grid-cols-1 gap-[2rem]">
        <Heading as="h3">Monsters</Heading>
        <Anchor href="/generators/mooks/monsters/build">
          Build a Mookster
        </Anchor>
        <Anchor href="/generators/mooks/monsters/five_e">
          Vaguely 5e Mooksters
        </Anchor>
      </div>
      <div class="grid grid-cols-1 gap-[2rem]">
        <Heading as="h3">NPCs</Heading>
        <Anchor href="/generators/mooks/people/build">Build an NPC Mook</Anchor>
        <Anchor href="/generators/mooks/monsters/five_e">
          Vaguely 5e NPC Mooks
        </Anchor>
      </div>
    </div>
  );
};
