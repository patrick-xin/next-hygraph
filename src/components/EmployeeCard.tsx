import { Author } from "@/lib/types";
import Image from "next/image";

export const EmployeeCard = ({
  author: { avatar, firstName, lastName, bio },
}: {
  author: Author;
}) => {
  return (
    <div>
      <Image
        src={avatar.url}
        className="h-12 w-12 rounded-full"
        alt={`${firstName}-${lastName}-avatar`}
      />
      <div className="font-bold my-2">
        {firstName} {lastName}
      </div>
      <div className="my-2">Fashion blogger</div>
      <p className="my-6">{bio}</p>
    </div>
  );
};
