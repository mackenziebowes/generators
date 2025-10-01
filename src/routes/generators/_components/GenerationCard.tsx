import { JSXElement } from "solid-js";
import { Card, Stack, Heading, Button } from "~/devano/atoms";

export const GenerationCard = ({
  trigger,
  children,
  title,
}: {
  trigger: Function;
  children: JSXElement;
  title: string;
}) => {
  return (
    <Stack direction="col" class="gap-[12px] h-full w-full">
      <Card class="w-full flex-grow pt-[12px]">
        <Heading
          as="h2"
          class="text-2xl sm:text-3xl md:text-3xl lg:text-3xl font-normal md:font-semibold"
        >
          {title}
        </Heading>
        {children}
        <Button onclick={() => trigger()} class="w-fit justify-self-end">
          Roll
        </Button>
      </Card>
    </Stack>
  );
};
