import { Metadata } from "next";

type DynamicSegments = string | string[];

type NextPageParams = Record<string, DynamicSegments>;

export type NextPageProps<P extends NextPageParams> = {
  params: Promise<P>;
};

export type NextGenerateStaticParams<P extends NextPageParams> = () => Promise<
  P[]
>;

export type NextGenerateMetadata<P extends NextPageParams> = (
  props: NextPageProps<P>,
) => Promise<Metadata>;
