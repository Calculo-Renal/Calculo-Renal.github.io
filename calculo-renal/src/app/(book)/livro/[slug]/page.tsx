import { chapters } from "@/src/content/livro"
import { getMDX } from "@/src/lib/mdx"
import { MDXRemote } from "next-mdx-remote/rsc"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid"
import BookIndex from "@/src/components/book/BookIndex/BookIndex"

interface PageProps {
    params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
    return (chapters ?? []).map((chapter, index) => ({
        slug: chapter.slug,
        number: index + 1
    }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params
    const chapter = chapters.find((item) => item.slug === slug)

    if (!chapter) {
        notFound()
    }

    return {
        title: chapter.title
    }
}

export default async function Page({ params }: PageProps) {

    const { slug } = await params
    const chapter = chapters.find((item) => item.slug === slug)

    if (!chapter) {
        notFound()
    }

    const index = chapters.findIndex((item) => item.slug === slug)
    const prevChapter = index > 0 ? chapters[index - 1] : null
    const nextChapter = index < chapters.length - 1 ? chapters[index + 1] : null

    try {
        let baseFolder = "src/content/livro"
        let content = await getMDX(baseFolder, chapter.slug)

        return (
            <section className="grid grid-rows-1 grid-cols-[20%_80%] max-w-screen min-h-0 max-h-full">
                <aside className="flex flex-col justify-between gap-8 p-8 shadow-2xl">
                    <div className="flex flex-col gap-2 font-heading">
                        <span className="text-4xl font-bold">Índice</span>
                        <BookIndex />
                    </div>

                    <div className="flex flex-col gap-2">
                        {prevChapter ?
                            <Link
                                href={`/livro/${prevChapter.slug}`}
                                className="
                                    inline-flex self-start font-heading gap-2 items-center
                                    transition-transform duration-200 hover:-translate-x-2
                                "
                            >
                                <ArrowLeftIcon
                                    width={24}
                                />
                                <div className="flex flex-col">
                                    <small className="font-bold">Anterior</small>
                                    <span>{prevChapter.title}</span>
                                </div>
                            </Link> : null
                        }
                        {nextChapter ?
                            <Link
                                href={`/livro/${nextChapter.slug}`}
                                className="
                                    inline-flex self-end font-heading gap-2 items-center
                                    transition-transform duration-200 hover:translate-x-2
                                "
                            >
                                <div className="flex flex-col text-right">
                                    <small className="font-bold">Próximo</small>
                                    <span>{nextChapter.title}</span>
                                </div>
                                <ArrowRightIcon
                                    width={24}
                                />
                            </Link> : null
                        }
                    </div>
                </aside>
                <article data-book-content className="px-[10vw] pt-6 overflow-scroll scroll-smooth">
                    {content}
                </article>
            </section>
        )
    } catch {
        notFound()
    }
}
