import React from "react";
import Image from "next/image";
import { signIn } from "next-auth/client";
import Button from "@material-tailwind/react/Button";

function Login() {
  return (
    <div className="flex flex-col items-center justify-center">
      <Image
        src="https://links.papareact.com/1ui"
        height="300"
        width="550"
        objectFit="contain"
      />
      <Button
        color="blue"
        ripple="light"
        className="w-44 mt-10"
        buttonType="filled"
        onClick={signIn}
      >
        Login
      </Button>
    </div>
  );
}

export default Login;
