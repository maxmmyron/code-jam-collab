import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import LinkDropdown from "./components/LinkDropdown";

const Nav = () => {
  const { data: session, status } = useSession();
  return (
    <nav className="flex justify-between mt-8 px-6 pb-6 border-b-2 black border-black">
      <h1 className="text-2xl">CodeJam</h1>
      <div>
        {status === "authenticated" ? (
          // If the status is authenticated we can assume the session is not null and a username exists.
          <LinkDropdown
            title={session?.user?.name as string}
            routes={[
              {
                route: "#",
                title: "Projects",
              },
              {
                route: "/api/auth/signout",
                title: "Logout",
              },
              {
                route: "#",
                title: "Profile",
              },
              {
                route: "#",
                title: "Settings",
              },
            ]}
          />
        ) : (
          <Link href="/api/auth/signin" className="text-xl m-4">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Nav;
