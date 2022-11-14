import { Author } from "@/lib/types";
import Image from "next/image";

type Props = {
  author: Author;
};

export const AuthorCard = ({
  author: { avatar, firstName, lastName, bio },
}: Props) => {
  return (
    <div>
      <div className="bg-brand/20 p-6 rounded">
        <div className="flex gap-4 items-center">
          <Image
            width={200}
            height={200}
            src={avatar.url}
            className="h-12 w-12 inline-block rounded-full"
            alt={`${firstName}-${lastName}-avatar`}
          />
          <div className="font-semibold">
            {firstName} {lastName}
          </div>
        </div>

        <p className="my-4">{bio}</p>
      </div>
    </div>
  );
};
