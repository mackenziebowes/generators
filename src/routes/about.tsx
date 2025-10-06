import { Component, For } from "solid-js";
import { Anchor, Heading, Page, Stack } from "~/devano/atoms";
export default function Home() {
  return (
    <Page>
      <Stack direction="col" class="justify-center h-[100%] flex-grow gap-12">
        <Heading as="h1">About</Heading>
        <Heading as="h2">The name: "Ex Alea"</Heading>
        <p>
          Ex Alea is Latin - literally, "from gambling." This represents the
          random nature of the prompts in this site. Writing tools that work
          because of gambling mechanics.
        </p>
        <Nav />
      </Stack>
    </Page>
  );
}

const Nav: Component = () => {
  return (
    <div class="grid grid-cols-3">
      <div class="grid grid-cols-1 gap-[2rem]">
        <Heading as="h3">Characters</Heading>
        <Anchor href="/generators/characters">Flawed Protagonist</Anchor>
      </div>
      <div class="grid grid-cols-1 gap-[2rem]">
        <Heading as="h3">Plot</Heading>
        <Anchor href="/generators/plot">Plot Generator</Anchor>
      </div>
    </div>
  );
};
