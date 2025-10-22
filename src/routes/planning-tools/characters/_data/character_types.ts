import { DraftField } from "~/routes/planning-tools/_data/types";

type LockedBasicBio = {
  first_name: string;
  last_name: string;
  birthday: string;
  height: string;
  weight: string;
  ethnic_heritage: string;
  eye_color: string;
  hair_color: string;
  role: string;
};

type DraftBasicBio = {
  first_name: DraftField<string>;
  last_name: DraftField<string>;
  birthday: DraftField<string>;
  height: DraftField<string>;
  weight: DraftField<string>;
  ethnic_heritage: DraftField<string>;
  eye_color: DraftField<string>;
  hair_color: DraftField<string>;
  role: DraftField<string>;
};

type LockedValues = string[];

type DraftValues = DraftField<string>[];

type LockedAmbitions = string[];

type DraftAmbitions = DraftField<string>[];

type LockedExtraCharacteristic = {
  label: string;
  value: string;
};

type DraftExtraCharacteristic = {
  label: string;
  value: DraftField<string>;
};

export type LockedCharacter = LockedBasicBio &
  LockedValues &
  LockedAmbitions & {
    characteristics: LockedExtraCharacteristic[];
  };

export type DraftCharacter = DraftBasicBio &
  DraftValues &
  DraftAmbitions & {
    characteristics: DraftExtraCharacteristic[];
  };
