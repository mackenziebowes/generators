import { Button, Heading, Page, Stack } from "~/devano/atoms";
import type { Component } from "solid-js";
import { createEffect, Switch, Match } from "solid-js";
import { createBreakpoints } from "@solid-primitives/media";
import RollAttributes from "./_components/roll_attributes";
import RollAncestry from "./_components/roll_ancestry";
import RollGender from "./_components/roll_gender";
import RollBackground from "./_components/roll_background";
import RollOrigin from "./_components/roll_origin";
import RollMagic from "./_components/roll_magic";

export default function Home() {
  return (
    <Page>
      <Stack
        direction="col"
        class="justify-start h-[100%] flex-grow gap-12 p-[48px] w-full"
      >
        <Heading as="h1">Roll A Character</Heading>
        <div class="flex flex-row gap-[12px] w-full">
          <Button outline>Roll Everything</Button>
        </div>
        <Bento />
        {/* <div class="flex flex-col gap-[12px] md:flex-row flex-grow w-full">
          <div class="flex flex-col gap-[12px] w-full flex-grow md:max-w-[50ch]">
            <RollGender />
            <RollAncestry />
            <RollBackground />
            <RollOrigin />
          </div>
          <RollAttributes />
          <RollMagic />
        </div> */}
      </Stack>
    </Page>
  );
}

const breakpoints = {
  sm: "640px",
  lg: "1024px",
  xl: "1280px",
};

const MobileLayout = () => {
  return (
    <div class="flex flex-col gap-[12px] flex-grow w-full px-[12px] py-[24px]">
      <RollGender />
      <RollAncestry />
      <RollBackground />
      <RollOrigin />
      <RollAttributes />
      <RollMagic />
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
    </div>
  );
};

const Bento: Component = () => {
  const matches = createBreakpoints(breakpoints);

  createEffect(() => {
    console.log(matches.sm); // true when screen width >= 640px
    console.log(matches.lg); // true when screen width >= 1024px
    console.log(matches.xl); // true when screen width >= 1280px
  });
  return (
    <>
      <Switch fallback={<MobileLayout />}>
        <Match when={matches.xl}>
          <Heading as="h2">XL!</Heading>
        </Match>
        <Match when={matches.lg}>
          <Heading as="h2">Large!</Heading>
        </Match>
        <Match when={matches.sm}>
          <Heading as="h2">Medium!</Heading>
          <MediumLayout />
        </Match>
      </Switch>
    </>
  );
};
