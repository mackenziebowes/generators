import type { Component, JSX } from "solid-js";
import { createEffect, Switch, Match } from "solid-js";
import { createBreakpoints } from "@solid-primitives/media";

const breakpoints = {
  sm: "640px",
  lg: "1024px",
  xl: "1280px",
};

export const Bento = ({ children }: { children: JSX.Element }) => {
  const matches = createBreakpoints(breakpoints);

  createEffect(() => {
    console.log(matches.sm); // true when screen width >= 640px
    console.log(matches.lg); // true when screen width >= 1024px
    console.log(matches.xl); // true when screen width >= 1280px
  });

  return (
    <div
      classList={{
        "text-tiny flex flex-column": true, // tiny text with flex column layout
        "text-small": matches.sm, // small text with flex column layout
        "text-base flex-row": matches.lg, // base text with flex row layout
        "text-huge": matches.xl, // huge text with flex row layout
      }}
    >
      {children}
      {/* <Switch>
        <Match when={matches.xl}>Extra Large</Match>
        <Match when={matches.lg}>Large</Match>
        <Match when={matches.sm}>Small</Match>
        <Match when={!matches.sm}>
          <div>Smallest</div>
        </Match>
      </Switch> */}
    </div>
  );
};
