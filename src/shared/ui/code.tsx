import { HighlightedCode, Pre } from "codehike/code";

export interface CodeProps {
  codeblock: HighlightedCode;
}

export const Code = ({ codeblock }: CodeProps) => {
  return (
    <div className="rounded-md border border-zinc-800 bg-zinc-900">
      {codeblock.meta && (
        <div className="border-b border-zinc-800 px-4 py-3 font-mono text-xs">
          {codeblock.meta}
        </div>
      )}
      <Pre className="my-0 bg-zinc-900" code={codeblock} />
    </div>
  );
};
