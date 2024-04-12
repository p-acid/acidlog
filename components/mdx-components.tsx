import { ReactNode } from "react";

import MdxImage from "@/components/mdx-image";
import { Source } from "@/lib/route";
import type { MDXComponents } from "mdx/types";
import { useMDXComponent } from "next-contentlayer/hooks";
import Image from "next/image";

interface MdxProps {
  base: string;
  code: string;
  components?: MDXComponents;
}

export function Mdx({ base, code, components }: MdxProps) {
  const Component = useMDXComponent(code);

  return (
    <Component
      components={{
        a: (props) => <a target="_blank" {...props} />,
        Image: (props) => <MdxImage base={base} {...props} />,
        Video: ({ filename, ...rest }) => (
          <video controls width="100%" {...rest}>
            <source src={`${base}/${filename}`} type="video/mp4" />
          </video>
        ),
        Callout: ({
          type = "note",
          children,
        }: {
          type: CalloutType;
          children: ReactNode;
        }) => {
          const { filename, background } = CALLOUT_INFOS[type];
          return (
            <div
              className={`flex gap-4 px-6 py-5 rounded-lg my-6 ${background}`}
            >
              <Image
                className="m-0 mt-[2px] w-6 h-6"
                src={`${Source.Image.CalloutIcon}/${filename}`}
                alt="callout_icon"
                width={24}
                height={24}
              />
              <div className="callout-content">{children}</div>
            </div>
          );
        },
        ...components,
      }}
    />
  );
}

const CALLOUT_INFOS = {
  note: {
    filename: "note.png",
    background: "bg-zinc-300 dark:bg-zinc-800",
  },
  info: {
    filename: "info.png",
    background: "bg-green-200 dark:bg-green-950",
  },
  warning: {
    filename: "warning.png",
    background: "bg-orange-200 dark:bg-yellow-900",
  },
};

type CalloutType = keyof typeof CALLOUT_INFOS;
