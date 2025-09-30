import { Button, Heading, Page, Stack } from "~/devano/atoms";
import RollAttributes from "./_components/roll_attributes";
import RollAncestry from "./_components/roll_ancestry";
import RollGender from "./_components/roll_gender";
import RollBackground from "./_components/roll_background";
import RollMagic from "./_components/roll_magic";

export default function Home() {
  return (
    <Page>
      <Stack
        direction="col"
        class="justify-start h-[100%] flex-grow gap-12 p-[48px] w-full"
      >
        <Heading as="h1">Roll A Character</Heading>
        <div class="flex flex-col gap-[12px] md:flex-row w-full">
          <RollAttributes />
          <div class="flex flex-col gap-[12px] w-full md:max-w-[50ch]">
            <RollAncestry />
            <RollGender />
            <RollBackground />
          </div>
          <RollMagic />
        </div>
      </Stack>
    </Page>
  );
}
