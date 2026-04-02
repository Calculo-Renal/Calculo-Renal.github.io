"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

type Heading = {
    id: string
    text: string
    level: number
}

export default function BookIndex(): React.ReactElement {
    const [headings, setHeadings] = useState<Heading[]>([])
    const [activeId, setActiveId] = useState<string>("")
    const pathname = usePathname()

    const toHeadingId = (text: string) => {
        return text
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9\s-]/g, "")
            .replace(/\s+/g, "-")
    }

    useEffect(() => {
        const contentRoot = document.querySelector("[data-book-content]") as HTMLElement | null

        if (!contentRoot) {
            setHeadings([])
            setActiveId("")
            return
        }

        const elements = Array.from(
            contentRoot.querySelectorAll<HTMLElement>("h1, h2, h3, h4, h5, h6")
        )

        if (elements.length === 0) {
            setHeadings([])
            setActiveId("")
            return
        }

        const usedIds = new Set<string>()

        const mapped = elements.map((el) => {
            const level = Number(el.tagName.replace("H", ""))
            const text = (el.textContent || "").trim()

            if (!el.id) {
                const baseId = toHeadingId(text)
                let uniqueId = baseId || "section"
                let index = 1

                while (usedIds.has(uniqueId)) {
                    uniqueId = `${baseId || "section"}-${index}`
                    index += 1
                }

                el.id = uniqueId
            }

            usedIds.add(el.id)

            return {
                id: el.id,
                text,
                level,
            }
        })

        setHeadings(mapped)
        setActiveId(mapped[0]?.id ?? "")

        const activationOffset = 16
        let animationFrame = 0

        const updateActiveHeading = () => {
            const rootTop = contentRoot.getBoundingClientRect().top
            let currentId = mapped[0]?.id ?? ""

            for (const heading of mapped) {
                const element = document.getElementById(heading.id)

                if (!element) {
                    continue
                }

                const distanceFromTop = element.getBoundingClientRect().top - rootTop

                if (distanceFromTop <= activationOffset) {
                    currentId = heading.id
                } else {
                    break
                }
            }

            setActiveId(currentId)
        }

        const onScroll = () => {
            if (animationFrame) {
                cancelAnimationFrame(animationFrame)
            }

            animationFrame = window.requestAnimationFrame(updateActiveHeading)
        }

        contentRoot.addEventListener("scroll", onScroll, { passive: true })
        window.addEventListener("resize", onScroll)
        updateActiveHeading()

        return () => {
            contentRoot.removeEventListener("scroll", onScroll)
            window.removeEventListener("resize", onScroll)

            if (animationFrame) {
                cancelAnimationFrame(animationFrame)
            }
        }
    }, [pathname])

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault()
        document.getElementById(id)?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        })
    }

    return (
        <nav className="flex flex-col gap-2 text-md" aria-label="Índice do conteúdo">
            {headings.length > 0 && (
                <ul className="space-y-1">
                    {headings.map((heading) => (
                        <li key={heading.id}>
                            <a
                                href={`#${heading.id}`}
                                onClick={(e) => handleClick(e, heading.id)}
                                className={`flex items-center gap-2 transition-colors ${
                                    activeId === heading.id
                                        ? "text-black font-semibold"
                                        : "text-gray-500 hover:text-black"
                                }`}
                                style={{
                                    marginLeft: `${(heading.level - 1) * 12}px`,
                                }}
                                aria-current={activeId === heading.id ? "location" : undefined}
                            >
                                <span
                                    className={`rounded-full shrink-0 transition-all ${
                                        activeId === heading.id
                                            ? "w-3 h-3 bg-black"
                                            : "w-2 h-2 bg-gray-400"
                                    }`}
                                    aria-hidden="true"
                                />
                                <span className="truncate">{heading.text}</span>
                            </a>
                        </li>
                    ))}
                </ul>
            )}
        </nav>
    )
}