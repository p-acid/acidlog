import dayjs, { ConfigType } from "dayjs";

export const getRelativeDate = (date: ConfigType) => {
  return dayjs().to(dayjs(date));
};
