import { Match, Switch } from "solid-js";
import { JSXElement, Accessor, Setter } from "solid-js";
import { Card, Stack, Heading, Button } from "~/devano/atoms";

export interface GenerationCard {
  trigger: () => void;
  locked: {
    get: Accessor<boolean>;
    set: Setter<boolean>;
  };
  children: JSXElement;
  title: string;
  description: JSXElement;
}

export const GenerationCard = (props: GenerationCard) => {
  const { trigger, locked, children, title, description } = props;
  return (
    <Stack direction="col" class="gap-[12px] h-full w-full">
      <Card class="w-full flex-grow pt-[12px]">
        <Heading
          as="h2"
          class="text-2xl sm:text-3xl md:text-3xl lg:text-3xl font-normal md:font-semibold"
        >
          {title}
        </Heading>
        <div class="grid grid-cols-2 gap-12px">
          <Button onclick={() => trigger()} class="w-fit">
            Roll
          </Button>
          <Switch>
            <Match when={locked.get()}>
              <Button
                onclick={() => locked.set(false)}
                class="w-fit justify-self-end"
              >
                Unlock
              </Button>
            </Match>
            <Match when={!locked.get()}>
              <Button
                onclick={() => locked.set(true)}
                class="w-fit justify-self-end"
              >
                Lock
              </Button>
            </Match>
          </Switch>
        </div>
        {description}
        {children}
      </Card>
    </Stack>
  );
};
