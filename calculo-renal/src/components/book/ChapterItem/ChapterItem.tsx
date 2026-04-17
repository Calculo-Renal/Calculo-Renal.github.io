import Link from "next/link"
import clsx from "clsx"

export default function ChapterItem({
    title,
    href,
    active
}: {
    title: string
    href: string
    active: boolean
}) {
    return (
        <Link href={href} className="flex items-center gap-2 group">
            <span
                className={clsx(
                    "w-2 h-2 rounded-full transition-all",
                    {
                        "bg-gray-400 group-hover:bg-black": !active,
                        "bg-black scale-125": active
                    }
                )}
            />

            <span
                className={clsx("transition-all", {
                    "font-bold": active
                })}
            >
                {title}
            </span>
        </Link>
    )
}
