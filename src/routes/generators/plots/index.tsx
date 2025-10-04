import { Button, Card, Heading, Page, Stack } from "~/devano/atoms";
import type { Component } from "solid-js";
import { createEffect, Switch, Match, For, onMount } from "solid-js";
import { createStore } from "solid-js/store";

import { beats as proceduralBeats } from "./_data/procedural_beats";
import { beats as dramaticBeats } from "./_data/dramatic_beats";
import { DisplayProceduralBeat } from "./_components/proceduralBeatDisplay";
import { dN } from "../_utils/dice";
import { DisplayDramaticBeat } from "./_components/dramaticBeatDisplay";

export default function Home() {
  const [beats, set_beats] = createStore<any[]>([]);
  const add_beat = (kind: "procedural" | "dramatic", beat: any) => {
    set_beats((prev) => {
      return [...prev, { kind, beat }];
    });
  };
  const addProcBeat = () => {
    const roll = dN(3);
    switch (roll) {
      default:
        add_beat("procedural", proceduralBeats.discovery({}));
        break;
      case 1:
        add_beat("procedural", proceduralBeats.gain({}));
        break;
      case 2:
        add_beat("procedural", proceduralBeats.loss({}));
        break;
    }
  };

  const addDramaBeat = () => {
    const roll = dN(10);
    if (roll <= 3) {
      add_beat("dramatic", dramaticBeats.transform({}));
    } else {
      add_beat("dramatic", dramaticBeats.develop({}));
    }
  };
  onMount(() => {
    addProcBeat();
    addDramaBeat();
  });
  return (
    <Page>
      <Stack
        direction="col"
        class="justify-start h-[100%] flex-grow gap-12 p-[48px] w-full"
      >
        <Heading as="h1">Roll A Plot</Heading>

        <div class="max-width-[80ch] flex flex-col gap-[24px]">
          <div class="w-full max-width-[80ch] flex justify-between">
            <Button onclick={addProcBeat}>Procedural</Button>
            <Button onclick={addDramaBeat}>Dramatic</Button>
          </div>
          <For each={beats}>
            {(beat) => {
              if (beat.kind == "procedural") {
                return (
                  <>
                    <DisplayProceduralBeat beat={beat.beat} />
                  </>
                );
              }
              if (beat.kind == "dramatic") {
                return (
                  <>
                    <DisplayDramaticBeat beat={beat.beat} />
                  </>
                );
              }
            }}
          </For>
        </div>
      </Stack>
    </Page>
  );
}
