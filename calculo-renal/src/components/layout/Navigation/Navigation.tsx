"use client"

import { navItems } from "@/src/components/layout/Navigation/navItems"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Navigation(): React.ReactElement {
    const pathname = usePathname()
    
    return (
        <nav className="flex gap-4">
            {navItems.map((item) => (
                <Link 
                href={item.href} 
                key={item.href}
                className={`flex font-heading items-center text-lg ${
                    (pathname === item.href || pathname === item.href + "/") ?
                    "font-bold" :
                    ""
                }`}
                >   
                    {item.label}
                </Link>
            ))}
        </nav>
    )
}