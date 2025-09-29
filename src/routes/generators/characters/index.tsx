import { Button, Heading, Page, Stack } from "~/devano/atoms";
import RollAttributes from "./_components/roll_attributes";
export default function Home() {
  return (
    <Page>
      <Stack
        direction="col"
        class="justify-start h-[100%] flex-grow gap-12 p-[48px] w-full"
      >
        <Heading as="h1">Roll A Character</Heading>
        <div class="flex flex-col md:flex-row w-full">
          <RollAttributes />
        </div>
      </Stack>
    </Page>
  );
}
