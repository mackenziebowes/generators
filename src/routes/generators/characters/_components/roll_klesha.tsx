import {
  createSignal,
  JSX,
  Accessor,
  Setter,
  Switch,
  Match,
  onMount,
  For,
} from "solid-js";
import { Stack, Button, Card, Heading } from "~/devano/atoms";
import { breakpoints, randomFromArray } from "../../_utils";
import { GenerationCard } from "../../_components/GenerationCard";
import {
  KleshaProfileOptions,
  KleshaProfile,
  SimpleProfile,
  Profile,
  generateKleshaProfile,
  generateFullKleshaProfile,
  generateSimpleKleshaProfila,
} from "~/routes/generators/characters/_data/kleshas";
import type { Pattern } from "../../_utils/ayurvedic";
import { ExclusiveButton } from "~/devano/components";
import { createBreakpoints } from "@solid-primitives/media";

export default function RollKlesha() {
  const [selectedKlesha, set_selectedKlesha] = createSignal<KleshaProfile>(
    generateSimpleKleshaProfila(),
  );
  const [selectedFullKlesha, set_selectedFullKlesha] = createSignal<Profile>(
    generateFullKleshaProfile(),
  );
  const [selectedKleshaType, set_selectedKleshaType] =
    createSignal<KleshaProfileOptions>("simple");
  const [hasRolled, set_hasRolled] = createSignal<boolean>(false);

  const rollKlesha = () => {
    set_hasRolled(false);
    switch (selectedKleshaType()) {
      case "simple":
        set_selectedKlesha(generateSimpleKleshaProfila());
        break;
      case "full":
        set_selectedFullKlesha(generateFullKleshaProfile());
        break;
    }
    set_hasRolled(true);
  };

  onMount(rollKlesha);

  return (
    <GenerationCard title="Flaws" trigger={rollKlesha}>
      <p>
        These Flaws help describe this character's natural responses to
        conflict, tension, and decision making. Reference these when writing
        Actions for this character.
      </p>
      <Switch>
        <Match when={hasRolled() && selectedKleshaType() == "simple"}>
          <SimpleKleshaDisplay klesha={selectedKlesha()} />
        </Match>
        <Match when={hasRolled() && selectedKleshaType() == "full"}>
          <FullKleshaDisplay klesha={selectedFullKlesha()} />
        </Match>
      </Switch>
      <KleshaSourceSelector
        get={selectedKleshaType}
        set={set_selectedKleshaType}
      />
    </GenerationCard>
  );
}

const PrimaryKleshaPatternDisplay = ({ pattern }: { pattern: Pattern }) => {
  return (
    <>
      <div class="flex flex-col gap-[12px]">
        <Heading
          as="h3"
          class="text-2xl sm:text-2xl md:text-2xl lg:text-2xl font-bold"
        >
          Primary
        </Heading>
        <p>
          Most scenarios demonstrate <br />
          this Flaw.
        </p>
        <Heading
          as="h3"
          class="text-3xl sm:text-3xl md:text-3xl lg:text-3xl font-bold"
        >
          {pattern.title}
        </Heading>
        <p>{pattern.description}</p>
      </div>
    </>
  );
};

const FallbackKleshaPatternDisplay = ({ pattern }: { pattern: Pattern }) => {
  return (
    <>
      <div class="flex flex-col gap-[12px]">
        <Heading
          as="h3"
          class="text-2xl sm:text-2xl md:text-2xl lg:text-2xl font-bold"
        >
          Fallback
        </Heading>
        <p>Scenarios that prevent the Primary Flaw use this one.</p>
        <Heading
          as="h3"
          class="text-3xl sm:text-3xl md:text-3xl lg:text-3xl font-bold"
        >
          {pattern.title}
        </Heading>
        <p>{pattern.description}</p>
      </div>
    </>
  );
};

const LatentKleshaSingleDisplay = ({ pattern }: { pattern: Pattern }) => {
  return (
    <div class="flex flex-col gap-[12px]">
      <Heading
        as="h4"
        class="text-2xl sm:text-2xl md:text-2xl lg:text-2xl font-bold"
      >
        {pattern.title}
      </Heading>
      <p>{pattern.description}</p>
    </div>
  );
};

const LatentKleshaPatternListDisplay = ({
  patterns,
}: {
  patterns: Pattern[];
}) => {
  const matches = createBreakpoints(breakpoints);
  return (
    <>
      <Heading
        as="h3"
        class="text-2xl sm:text-2xl md:text-2xl lg:text-2xl font-bold"
      >
        Latent
      </Heading>
      <p>
        The final fallbacks - the character may show these flaws more commonly
        when highly distressed.
      </p>
      <Switch>
        <Match when={matches.sm}>
          <div class="grid grid-cols-2 grid-rows-1">
            <For each={patterns}>
              {(pattern) => {
                return <LatentKleshaSingleDisplay pattern={pattern} />;
              }}
            </For>
          </div>
        </Match>
        <Match when={!matches.sm}>
          <For each={patterns}>
            {(pattern) => {
              return <LatentKleshaSingleDisplay pattern={pattern} />;
            }}
          </For>
        </Match>
      </Switch>
    </>
  );
};

const SimpleKleshaDisplay = ({ klesha }: { klesha: SimpleProfile }) => {
  const matches = createBreakpoints(breakpoints);
  return (
    <>
      <Switch>
        <Match when={matches.sm}>
          <div class="grid grid-cols-2 grid-rows-1 gap-[6px]">
            <PrimaryKleshaPatternDisplay pattern={klesha.primary} />
            <FallbackKleshaPatternDisplay pattern={klesha.fallback} />
          </div>
        </Match>
        <Match when={!matches.sm}>
          <PrimaryKleshaPatternDisplay pattern={klesha.primary} />
          <FallbackKleshaPatternDisplay pattern={klesha.fallback} />
        </Match>
      </Switch>
    </>
  );
};

const FullKleshaDisplay = ({ klesha }: { klesha: Profile }) => {
  const matches = createBreakpoints(breakpoints);
  return (
    <>
      <Switch>
        <Match when={matches.sm}>
          <div class="grid grid-cols-2 grid-rows-1">
            <div class="flex flex-col gap-[12px]">
              <PrimaryKleshaPatternDisplay pattern={klesha.primary} />
            </div>
            <div class="flex flex-col gap-[12px]">
              <FallbackKleshaPatternDisplay pattern={klesha.fallback} />
            </div>
          </div>

          <LatentKleshaPatternListDisplay patterns={klesha.latent} />
        </Match>
        <Match when={!matches.sm}>
          <div class="flex flex-col gap-[12px]">
            <PrimaryKleshaPatternDisplay pattern={klesha.primary} />
            <FallbackKleshaPatternDisplay pattern={klesha.fallback} />
            <Heading
              as="h3"
              class="text-2xl sm:text-2xl md:text-2xl lg:text-2xl font-bold"
            >
              Latent
            </Heading>
            <LatentKleshaPatternListDisplay patterns={klesha.latent} />
          </div>
        </Match>
      </Switch>
    </>
  );
};

interface KleshaSelector extends JSX.HTMLAttributes<HTMLDivElement> {
  get: Accessor<KleshaProfileOptions>;
  set: Setter<KleshaProfileOptions>;
}

const KleshaSourceSelector = (props: KleshaSelector) => {
  return (
    <Stack class="w-full flex-wrap">
      <ExclusiveButton
        condition={props.get() == "simple"}
        trigger={() => props.set("simple")}
        label="Simple"
      />
      <ExclusiveButton
        condition={props.get() == "full"}
        trigger={() => props.set("full")}
        label="Full"
      />
    </Stack>
  );
};
