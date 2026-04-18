import type { ComponentType } from "react";
import IcFolder from "../../../assets/ic_folder.svg?react";
import IcHome from "../../../assets/ic_home.svg?react";
import IcPerson from "../../../assets/ic_person.svg?react";

export const TAB_ITEMS = [
  { id: "홈", label: "홈", Icon: IcHome },
  { id: "방명록", label: "방명록", Icon: IcFolder },
  { id: "마이", label: "마이", Icon: IcPerson },
] as const satisfies ReadonlyArray<{
  id: string;
  label: string;
  Icon: ComponentType;
}>;

export type TabType = (typeof TAB_ITEMS)[number]["id"];
export type TabItemData = (typeof TAB_ITEMS)[number];
