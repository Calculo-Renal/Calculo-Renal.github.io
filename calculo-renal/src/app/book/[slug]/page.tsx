import { chapters } from "@/src/content/book"
import { getMDX } from "@/src/lib/mdx"
import { MDXRemote } from "next-mdx-remote/rsc"
import type { Metadata } from "next"
import { notFound } from "next/navigation"

interface PageProps {
    params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
    return (chapters ?? []).map((chapter) => ({
        slug: chapter.slug
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

    if(!chapter) {
        notFound()
    }

    try {
        let source = getMDX("src/content/book", chapter.slug)

        return (
            <article>
                <MDXRemote source={source} />
            </article>
        )
    } catch {
        notFound()
    }
}
