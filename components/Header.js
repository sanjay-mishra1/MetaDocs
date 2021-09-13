import React from "react";
import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import { signOut, useSession } from "next-auth/client";
import Image from "next/image";
import UserTab from "./UserTab";
function Header({ setFileType }) {
  const [session] = useSession();
  const [showTabs, setShowTabs] = React.useState(false);
  return (
    <React.Fragment>
      <header className="sticky top-0 z-50 flex items-center px-4 h-16  shadow-md bg-white">
        <Button
          color="gray"
          ripple="dark"
          buttonType="outline"
          rounded={true}
          onClick={() => setShowTabs(!showTabs)}
          iconOnly={true}
          className="h-10 w-10 border-0 mr-2"
        >
          <Icon color="black" name="menu" size="2xl" />
        </Button>

        <Image src="/app_icon.png" width="40" height="40" />

        <p className="ml-2 text-gray-700 text-2xl">Docs</p>
        <div
          className="flex md:mx-20 flex-grow items-center px-5 py-2
       bg-gray-100 text-gray-600 rounded-lg mx-5 focus-within:text-gray-600 focus-within:shadow-md"
        >
          <Icon name="search" size="2xl" color="black" />
          <input
            type="text"
            placeholder="Search"
            className="flex-grow px-5 text-base bg-transparent outline-none w-3/4"
          />
        </div>

        <img
          name="apps"
          onClick={signOut}
          loading="lazy"
          className="cursor-pointer h-8 w-8 rounded-full ml-2"
          src={session?.user?.image}
          size="2xl"
        />
      </header>
      <UserTab
        showTabs={showTabs}
        setShowTabsFn={setShowTabs}
        setFileType={setFileType}
        userCreds={{ name: session.user.name, image: session.user.image }}
      />
    </React.Fragment>
  );
}

export default Header;
