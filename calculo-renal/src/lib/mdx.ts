import { compileMDX } from "next-mdx-remote/rsc"
import remarkMath from "remark-math"
import rehypeKatex from "rehype-katex"
import fs from "fs"
import path from "path"

export async function getMDX(relativePath: string, slug: string) {
    const filePath = path.join(
        process.cwd(),
        relativePath,
        `${slug}.mdx`
    )

    const source = fs.readFileSync(filePath, "utf-8")

    const { content } = await compileMDX({
        source,
        options: {
            mdxOptions: {
                remarkPlugins: [remarkMath],
                rehypePlugins: [rehypeKatex],
            },
        },
    })

    return content
}
