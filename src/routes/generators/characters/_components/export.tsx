import { Component } from "solid-js";
import { useCharacter, CharacterProvider, CharacterValue } from "./context";
import { Gender } from "./context/gender-context";
import { Attributes } from "./context/attribute-context";
import { AttributeDisplay } from "./roll_attributes";
import { DisplayMagicDetails } from "./roll_magic";
import { MagicSystem } from "../_data/magic_types";

export function exportCharacter() {
  return (
    <CharacterProvider>
      <ExportGuts />
    </CharacterProvider>
  );
}

const ExportGuts: Component = () => {
  const {
    ancestry,
    attributes,
    magic,
    gender,
    background,
    origin,
    klesha,
    samskara,
    dharma,
  } = useCharacter();
  return (
    <div class="flex flex-col gap-[12px]">
      <p>
        This character is a {gender.current.get()} {ancestry.current.get()} from{" "}
        {origin.current.get()}.
      </p>
      <p>They are currently a(n) {background.current.get()}.</p>
      <p>
        Early on, this character experienced a psychological wound. $
        {samskara.current.get().description}
      </p>
      <p>
        That event lead to them relying on ${klesha.current.get().primary.title}{" "}
        as a pattern for navigating life:
      </p>
      <p>${klesha.current.get().primary.description}</p>
      <p>
        When this character is suffering lately, it's because their duties are
        conflicting:
      </p>
      <p>
        They have ${dharma.current.get().external.description}{" "}
        <strong>AND</strong> ${dharma.current.get().internal.description} - they
        struggle to balance or prioritize these calls.
      </p>
      <p>As for attributes, here is a basic stat block:</p>
      <AttributeDisplay attributes={attributes.current.get} />
      <p>
        They might be capable of magic - if they were, here's the details of the
        magic they can use or show talent in.
      </p>
      <DisplayMagicDetails attributes={magic.current.get} />
    </div>
  );
};

function renderAttributeBlockinMd(attributes: Attributes) {
  const sections = ["\n## Attributes"];
  for (const attribute of Object.values(attributes.current.get())) {
    sections.push(`\n### ${attribute.title}`);
    sections.push(`**${attribute.buff_name}**`);
    sections.push(`${attribute.description}`);
  }
  return sections.join("\n");
}

function renderAttributeBlockinPlain(attributes: Attributes) {
  const sections = ["\nAs for their attributes..."];
  for (const attribute of Object.values(attributes.current.get())) {
    sections.push(
      `\nThey have ${attribute.buff_name} with ${attribute.title}: \n${attribute.description}`,
    );
  }
  return sections.join("\n");
}

function renderMagicBlockinMd(magic: MagicSystem) {
  const sections = ["\n## Magic:"];
  if (magic.aptitude == "Easy") {
    sections.push("They are particularly talented with these styles of magic:");
    for (const talent of magic.talents) {
      sections.push(`- ${talent}`);
    }
    sections.push(
      "\nThey are able to use the following types as well, but aren't particularly great with most of them:",
    );
    for (const entry of magic.elements) {
      sections.push(`- ${entry}`);
    }
  }
  if (magic.aptitude == "Hard") {
    sections.push("They have access to these styles of magic:");
    for (const talent of magic.elements) {
      sections.push(`- ${talent}`);
    }
  }
  return sections.join("\n");
}

function renderMagicBlockinPlain(magic: MagicSystem) {
  const sections = ["\nThis person may be able to use magic. If so..."];
  if (magic.aptitude == "Easy") {
    sections.push("They are particularly talented with these styles of magic:");
    for (const talent of magic.talents) {
      sections.push(`${talent}`);
    }
    sections.push(
      "\nThey are able to use the following types as well, but aren't particularly great with most of them:",
    );
    for (const entry of magic.elements) {
      sections.push(`${entry}`);
    }
  }
  if (magic.aptitude == "Hard") {
    sections.push("They have access to these styles of magic:");
    for (const talent of magic.elements) {
      sections.push(`${talent}`);
    }
  }
  return sections.join("\n");
}

export function generateCharacterText(
  character: CharacterValue,
  format: "plain" | "markdown" = "plain",
): string {
  const {
    ancestry,
    attributes,
    magic,
    gender,
    background,
    origin,
    klesha,
    samskara,
    dharma,
  } = character;

  // Build your content using the raw data, not HTML
  const sections = [];

  if (format === "markdown") {
    sections.push(`# Character Profile`);
    sections.push(
      `\nThis character is a **${gender.current.get()} ${ancestry.current.get()}** from **${origin.current.get()}**.`,
    );
    sections.push(`\nThey are currently a(n) **${background.current.get()}**.`);
    sections.push(`\n## Background`);
    sections.push(
      `\n**Psychological Wound:** ${samskara.current.get().description}`,
    );
    sections.push(
      `\n**Coping Mechanism:** ${klesha.current.get().primary.title} - ${klesha.current.get().primary.description}`,
    );
    sections.push(
      `\n**Conflicting Duties:** ${dharma.current.get().external.description} AND ${dharma.current.get().internal.description}`,
    );
    sections.push(renderAttributeBlockinMd(attributes));
    sections.push(renderMagicBlockinMd(magic.current.get()));
  } else {
    // Plain text version
    sections.push(`Character Profile`);
    sections.push(
      `This character is a ${gender.current.get()} ${ancestry.current.get()} from ${origin.current.get()}.`,
    );
    sections.push(`They are currently a(n) ${background.current.get()}.`);
    sections.push(
      `Early on, this character experienced a psychological wound. ${samskara.current.get().description}`,
    );
    sections.push(
      `That event lead to them relying on ${klesha.current.get().primary.title} as a pattern for navigating life:`,
    );
    sections.push(`${klesha.current.get().primary.description}`);
    sections.push(
      `However, that option isn't always available. Depending, they may rely on ${klesha.current.get().fallback.title}:`,
    );
    sections.push(`${klesha.current.get().fallback.description}`);
    sections.push(
      `When this character is suffering lately, it's because their duties are conflicting:`,
    );
    sections.push(
      `They have ${dharma.current.get().external.description} AND ${dharma.current.get().internal.description} - they struggle to balance or prioritize these calls.`,
    );
    sections.push(renderAttributeBlockinPlain(attributes));
    sections.push(renderMagicBlockinPlain(magic.current.get()));
  }

  return sections.join("\n");
}
