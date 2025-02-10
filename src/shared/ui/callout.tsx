import { HTMLAttributes } from "react";

import InfoIcon from "@/shared/assets/callout-icon/info.svg";
import NoteIcon from "@/shared/assets/callout-icon/note.svg";
import WarningIcon from "@/shared/assets/callout-icon/warning.svg";
import { cn } from "../utils/cn";

const CALLOUT_STYLES = {
  note: {
    icon: NoteIcon,
    color: "*:fill-zinc-50",
    background: "bg-zinc-800",
  },
  info: {
    icon: InfoIcon,
    color: "*:fill-sky-600",
    background: "bg-sky-950",
  },
  warning: {
    icon: WarningIcon,
    color: "*:fill-yellow-600",
    background: "bg-yellow-900",
  },
} as const;

type CalloutType = keyof typeof CALLOUT_STYLES;

export interface CalloutProps extends HTMLAttributes<HTMLDivElement> {
  type: CalloutType;
}

export const Callout = ({ type = "note", children }: CalloutProps) => {
  const { icon: SVGIcon, color, background } = CALLOUT_STYLES[type];

  return (
    <div className={cn(`my-6 flex gap-4 rounded-lg px-6 py-5`, background)}>
      <SVGIcon className={cn("mt-1 max-h-5 w-5 min-w-5", color)} />
      <div className="flex w-full flex-col gap-3 *:my-0">{children}</div>
    </div>
  );
};
