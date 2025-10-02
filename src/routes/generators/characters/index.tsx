import { Button, Card, Heading, Page, Stack } from "~/devano/atoms";
import type { Component } from "solid-js";
import { createEffect, Switch, Match } from "solid-js";
import { createBreakpoints } from "@solid-primitives/media";
import { breakpoints } from "~/routes/_utils/responsive";
import RollAttributes from "./_components/roll_attributes";
import RollAncestry from "./_components/roll_ancestry";
import RollGender from "./_components/roll_gender";
import RollBackground from "./_components/roll_background";
import RollOrigin from "./_components/roll_origin";
import RollMagic from "./_components/roll_magic";
import RollSamskara from "./_components/roll_samskara";
import RollKlesha from "./_components/roll_klesha";
import RollDharma from "./_components/roll_dharma";
import { CharacterProvider } from "./_components/context";
import { useCharacter } from "./_components/context";
import { generateCharacterText } from "./_components/export";
import { copyToClipboard } from "../_utils";

export default function Home() {
  return (
    <Page>
      <Stack
        direction="col"
        class="justify-start h-[100%] flex-grow gap-12 p-[48px] w-full"
      >
        <Heading as="h1">Roll A Character</Heading>
        <CharacterProvider>
          <Bento />
        </CharacterProvider>
      </Stack>
    </Page>
  );
}

const MobileLayout = () => {
  return (
    <div class="flex flex-col gap-[12px] flex-grow w-full px-[12px] py-[24px]">
      <RollGender />
      <RollAncestry />
      <RollBackground />
      <RollOrigin />
      <RollAttributes />
      <RollMagic />
      <RollSamskara />
      <RollKlesha />
      <RollDharma />
    </div>
  );
};

const MediumLayout = () => {
  return (
    <div class="flex flex-col gap-[12px] flex-grow w-full px-[12px] py-[24px]">
      <div class="grid grid-cols-2 grid-rows-1 gap-[12px]">
        <RollGender />
        <RollOrigin />
        <RollAncestry />
        <RollBackground />
      </div>
      <RollAttributes />
      <RollMagic />
      <RollSamskara />
      <RollKlesha />
      <RollDharma />
    </div>
  );
};

const LargeLayout = () => {
  return (
    <div class="flex flex-col gap-[12px] flex-grow w-full px-[12px] py-[24px]">
      <div class="grid grid-cols-2 grid-rows-1 gap-[12px]">
        <RollGender />
        <RollOrigin />
        <RollAncestry />
        <RollBackground />
      </div>
      <div class="grid grid-cols-2 grid-rows-1 gap-[12px]">
        <RollAttributes />
        <RollMagic />
      </div>
      <div class="grid grid-cols-2 grid-rows-1 gap-[12px]">
        <RollSamskara />
        <RollKlesha />
      </div>
      <RollDharma />
    </div>
  );
};

const XLLayout = () => {
  return (
    <div class="flex flex-col gap-[12px] flex-grow w-full px-[12px] py-[24px]">
      <div class="grid grid-cols-4 grid-rows-1 gap-[12px]">
        <RollGender />
        <RollOrigin />
        <RollAncestry />
        <RollBackground />
      </div>
      <div class="grid grid-cols-3 grid-rows-1 gap-[12px]">
        <div class="grid grid-cols-1 grid-rows-1 gap-[12px]">
          <RollAttributes />
        </div>
        <div class="grid grid-cols-1 grid-rows-1 gap-[12px]">
          <RollSamskara />
          <RollKlesha />
          <RollDharma />
        </div>
        <div class="grid grid-cols-1 grid-rows-1 gap-[12px]">
          <RollMagic />
        </div>
      </div>
    </div>
  );
};

const Bento: Component = () => {
  const matches = createBreakpoints(breakpoints);
  console.dir({ matches });
  const character = useCharacter();
  const copyCharacter = (type: "plain" | "markdown" = "plain") => {
    const text = generateCharacterText(character, type);
    copyToClipboard(text);
  };
  return (
    <div class="grid grid-cols-1 w-full h-full">
      <div class="flex flex-row gap-[12px] w-full">
        <Button outline onclick={() => character.rollEverything()}>
          Roll Everything
        </Button>
        <Button outline onclick={() => character.lockEverything()}>
          Lock Everything
        </Button>
        <Button outline onclick={() => copyCharacter()}>
          Copy Text
        </Button>
        <Button outline onclick={() => copyCharacter("markdown")}>
          Copy Markdown
        </Button>
      </div>
      <Switch fallback={<MobileLayout />}>
        <Match when={matches.xl}>
          <XLLayout />
        </Match>
        <Match when={matches.lg}>
          <LargeLayout />
        </Match>
        <Match when={matches.sm}>
          <MediumLayout />
        </Match>
      </Switch>
    </div>
  );
};
