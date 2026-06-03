'use client'
import { Text, ThemeToggle } from "astralis-ui";
import Link from "next/link";

export default function Navbar() {

  return (
    <div className="px-10 pt-8 pb-0">
        <div className="dark:bg-white/5 py-3 px-10 w-full rounded-full flex justify-between">
          <h1 className="font-bold text-2xl">LOGO</h1>

          <div className="flex items-center gap-5">
              <Link href='/documentation'>
                <Text>Documentation</Text>
              </Link>
              <Link href=''>
                <Text>Blog</Text>
              </Link>
              <Link href=''>
                <Text>Resources</Text>
              </Link>
          </div>

          <div>
            <ThemeToggle />
          </div>
        </div>
    </div>
  )
}
