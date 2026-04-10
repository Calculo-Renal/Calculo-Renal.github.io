import { chapters } from "@/src/content/livro"
import type { Metadata } from "next"
import Link from "next/link"

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "Livro"
    }
}

export default async function Page() {
    return (
        <div className="px-[10vw] mt-4">
            <h1>Sumário</h1>
            
            <ul className="flex flex-col gap-2">
                {chapters.map((chapter, index) => (
                    <li key={chapter.slug}>
                        <Link 
                            href={`/livro/${chapter.slug}`}
                            className="font-text hover:underline"
                        >
                            {index + 1}. {chapter.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}
