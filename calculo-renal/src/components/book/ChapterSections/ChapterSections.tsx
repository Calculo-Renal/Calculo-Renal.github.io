"use client"

import { useEffect, useState } from "react"

type Heading = {
    id: string
    text: string
    level: number
}

function slugify(text: string) {
    return text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-")
}

export default function ChapterSections() {
    const [headings, setHeadings] = useState<Heading[]>([])

    useEffect(() => {
        const elements = Array.from(
            document.querySelectorAll("h2, h3, h4, h5, h6")
        )

        const counters: Record<string, number> = {
            h2: 0,
            h3: 0,
            h4: 0,
            h5: 0,
            h6: 0
        }

        const levels = ["h2", "h3", "h4", "h5", "h6"]

        const mapped = elements.map((el) => {
            const tag = el.tagName.toLowerCase()

            counters[tag]++

            const index = levels.indexOf(tag)
            const number = levels
                .slice(0, index + 1)
                .map((lvl) => counters[lvl])
                .filter((n) => n > 0)
                .join(".")

            const text = el.textContent || ""
            const id = `${number}-${slugify(text)}`

            el.id = id

            return {
                id,
                text: `${number} - ${text}`,
                level: index
            }
        })

        setHeadings(mapped)
    }, [])

    const indent = ["ml-0", "ml-3", "ml-6", "ml-9", "ml-12"]

    return (
        <ul className="ml-4 space-y-1">
            {headings.map((h) => (
                <li key={h.id} className={indent[h.level]}>
                    <a
                        href={`#${h.id}`}
                        className="text-sm text-gray-600 hover:text-black"
                    >
                        {h.text}
                    </a>
                </li>
            ))}
        </ul>
    )
}
