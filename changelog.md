# Changelog

## Versioning

Added versioning to package.json, starting at 0.0.2 because reasons (ideally, one increment per commit, but I'm not bouncing out of writing mode to count previous commits. We'll just start at 2 for fun.).

## Changelog

Now, commits will have changelogs to summarize what's... changed... obviously

## Palette

I wrote a [color system cli](https://news.ycombinator.com/from?site=github.com/mackenziebowes) recently that exports CSS Variables to the root.
Some `devano/atoms` have been rewritten to inherit these variables, all the new `devano/components` use them already.

Note to self: need to make a Deko default palette to ship with this repo.

## Cleanup

Rewrote Devano Atoms to be barrel exported, had to dance around the app and fix imports.

## Components

Started working on ShadCN => Solid port.
Added:

- src/devano/components
  - Accordion, which handles single/multi modes and a boolean flag for full collapsibility (Needs Refactor to offer AccordionItem AND AccordionTrigger)
  - Avatar, which gracefully handles a non-accessible image
  - Badge, which potentially improves on ShadCN badges by offering semantic flags ("destructive", "info", etc) as well as priority flags ("high"/"med"/"low")

Ready for:

- Tabs, yknow, like horizontal / vertical conditional rendering with always-visible labels
- Breadcrumbs, interrogating the Solid router for the path back to root

## Time Tracking

Added `time.toml` for tracking how long I spend on various improvements.

I use the [Insert Date String](https://marketplace.visualstudio.com/items?itemName=jsynowiec.vscode-insertdatestring) extension to timestamp start and end points, plus a comment to explain wtf I was doing during that time.

Times are in PST.

## Index

Rewrote the index to be more improvement agnostic

## Kitchen Sink

Early days of a Storybook-style explorer for the `devano/components` lib
