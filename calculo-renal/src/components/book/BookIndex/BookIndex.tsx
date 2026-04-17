"use client"

import { chapters } from "@/src/content/livro"
import { usePathname } from "next/navigation"
import ChapterItem from "@/src/components/book/ChapterItem/ChapterItem"
import ChapterSections from "@/src/components/book/ChapterSections/ChapterSections"

export default function BookIndex() {
    const pathname = usePathname()

    return (
        <ul className="space-y-1">
            {chapters.map((chapter) => {
                const href = `/livro/${chapter.slug}/`
                const active = pathname.startsWith(href)

                return (
                    <li key={chapter.slug}>
                        <ChapterItem
                            title={chapter.title}
                            href={href}
                            active={active}
                        />

                        {active && <ChapterSections />}
                    </li>
                )
            })}
        </ul>
    )
}