import React from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

const Nav = () => {
  const { data: session, status } = useSession();
  return (
    <nav className="flex justify-between mt-8 px-6 pb-6 border-b-2 black border-black">
      <h1 className="text-2xl">CodeJam</h1>
      <div>
        {status === "authenticated" && <span className="text-sm">{session?.user?.email}</span>}
        <Link href="#" className="text-xl m-4">
          Projects
        </Link>
        {status === "authenticated" ? 
          (
            <React.Fragment>
              <Link href="/api/auth/signout" className="text-xl m-4">
                Logout
              </Link>
            </React.Fragment>
          ) :
          <Link href="/api/auth/signin" className="text-xl m-4">
            Login
          </Link> }
      </div>
    </nav>
  )
}

export default Nav