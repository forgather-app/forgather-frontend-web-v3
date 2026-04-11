import type { ComponentType } from "react";
import IcFolder from "../../../assets/ic_folder.svg?react";
import IcHome from "../../../assets/ic_home.svg?react";
import IcPerson from "../../../assets/ic_person.svg?react";

export interface TabItemData {
  id: string;
  label: string;
  Icon: ComponentType;
}

export const TAB_ITEMS: TabItemData[] = [
  { id: "홈", label: "홈", Icon: IcHome },
  { id: "방명록", label: "방명록", Icon: IcFolder },
  { id: "마이", label: "마이", Icon: IcPerson },
];

export type TabType = (typeof TAB_ITEMS)[number]["id"];
