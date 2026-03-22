import fs from "fs"
import path from "path"

export function getMDX(relativePath: string, slug: string) {
    const filePath = path.join(
        process.cwd(),
        relativePath,
        `${slug}.mdx`
    )

    return fs.readFileSync(filePath, "utf-8")
}
