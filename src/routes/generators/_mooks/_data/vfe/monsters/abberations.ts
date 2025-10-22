import type { SizeOptions } from "../size";
import { getHitDie } from "../hp";
import { proficiencyBonusByCr, xpByCr } from "../cr";

export const rollChuul = (count: number) => {
  const int_count = Math.round(count);
  if (int_count == 0) return {};
  const cr = 4;
  const size: SizeOptions = "Large";
  const xp = xpByCr(cr);
  const hitDie = getHitDie(size);
  const pb = proficiencyBonusByCr(cr);
  const hp = () => hitDie(11) + 33;
  const ac = 16;
  const description = [
    "A perfectly obedient slave to a long collapsed aquatic empire. Amphibious, mute, psychically sensitive, kleptomaniacal, they steal and hoard magical humanoids and their artefacts. Equipped with tentacles and pinchers.",
  ];
  let healthPools: Record<"hp", number>[] = [];
  let counter = 0;
  while (counter < int_count) {
    healthPools.push({
      hp: hp(),
    });
  }
  return {
    title: "Ancient Aquatic Collector Slave",
    cr,
    size,
    xp,
    pb,
    ac,
    description,
    healthPools,
  };
};
