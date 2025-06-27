# Changelog

## Utils

- Added (and stashing) utils from `devano/utils/breakpoints.ts` - tooling for applying breakpoint utils to classes.

My dream responsive API looks something like this:

```typescript Example.tsx
import { cn, min, max } from "~/devano/utils";

export const Example = (props: JSX.HTMLAttributes<HTMLDivElement>) => {
	const xs = "px-12 py-6 font-bold text-(--color15) bg-(--color4) text-[24px]"; // colors bubble up!
	const md = min.md("px-18 text-[32px]");
	const lg = min.lg("px-24 py-12 text-[48px] font-extrabold"); // py bubbles up!
	const xl = min.xl("px-28 text-[64px] font-black");
	const exampleCn = cn([xs, md, lg, xl]);
	return <div class={exampleCn}>{props.children}</div>;
};
```

Look! Everything declared in one place 😍 self-documenting complex responsive styles.

- Also, now that there's more than one util, barrel exported them (as in example).
- Performed find and replace to update existing cn imports.

### Tragedy Strikes, Anguish Abounds (inject-tw-hint script)

This, of course, doesn't trigger Tailwinds JIT scanner.

We added a `scripts` folder to hold scripts!
And added `"tw-hint-single"` and `"tw-hint"` to `package.json` to use ts-morph to find these utils and replace them with flat tailwind classes.

#### Failure Mode

The structure of tw-hint-single and tw-hint don't accept nested args - need to think more about how to get that working, for now, don't try it lol

## Contexts

- Added WIP AlertProvider to the global context registry - includes it's own portal.
