import { format, parseISO, formatDistance } from "date-fns";

type Props = {
  publishedAt: string;
  withHour?: boolean;
  dateFormat?: "normal" | "distance";
};

export const PublishDate = ({
  publishedAt,
  withHour = false,
  dateFormat,
}: Props) => {
  return (
    <time className="text-sm text-gray-700 dark:text-gray-300 font-display font-semibold italic">
      {dateFormat === "distance" ? (
        <span>
          published in{" "}
          {formatDistance(parseISO(publishedAt), new Date(), {
            addSuffix: true,
          })}
        </span>
      ) : withHour ? (
        format(parseISO(publishedAt), "dd, MMMM yyyy h:mm aaa")
      ) : (
        format(parseISO(publishedAt), "MMMM dd, yyyy")
      )}
    </time>
  );
};
