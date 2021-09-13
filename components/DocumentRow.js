import React from "react";
import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import { useRouter } from "next/dist/client/router";
export default function DocumentRow({ fileName, id, date, fileType }) {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/${fileType.path}/${id}`);
  };
  return (
    <div
      className="flex items-center p-4 rounded-lg
     hover:bg-gray-100 text-gray-700 text-sm cursor-pointer"
      onClick={handleClick}
    >
      <Icon name="article" size="3xl" color="blue" />
      <p className="flex-grow pl-5 w-10 pr-10 truncate">{fileName}</p>
      <p className="pr-5 text-sm">{date?.toDate().toLocaleDateString()}</p>
      <Button
        color="gray"
        buttonType="outline"
        rounded={true}
        ripple="dark"
        iconOnly={true}
        className="border-0"
      >
        <Icon name="more_vert" size="3xl" />
      </Button>
    </div>
  );
}
// {date?.toDate().toLocalDateString()}
