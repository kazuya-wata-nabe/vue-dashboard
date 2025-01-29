import { writeFile, readFile, readdir } from "node:fs/promises"

type Dto = {
  path: string
  depth: number
}

const getHtmlFileRecursive = async (source: string): Promise<Dto[]> => {
  const fileList = await readdir(source, { recursive: true })
  const htmlList = fileList.filter((file) => file.endsWith("index.html"))

  return htmlList.map((html) => ({
    path: source + "/" + html,
    depth: html.split("/").length - 1,
  }))
}

const replaceTag = (reg: RegExp, prefix: string, content: string): string => {
  const matched = reg.exec(content)
  if (matched === null) return content

  const [tag = "", oldPath, _] = matched
  const newPath = prefix + oldPath
  const styleTag = tag.replace(oldPath, newPath)
  return replaceTag(reg, prefix, content.replace(tag, styleTag))
}

const replaceAside = (reg: RegExp, prefix: string, content: string): string => {
  const matched = reg.exec(content)
  if (matched === null) return content

  const [tag = "", oldPath, _] = matched
  const newPath = prefix + oldPath
  const styleTag = tag.replace(oldPath, newPath)
  return replaceAside(reg, prefix, content.replace(tag, styleTag))
}

const convert = async (dto: Dto) => {
  const assetsRegex = /[href|src]="(\/assets\/.*?)"*[^>]*>/g
  const asideRegex = /<a class="VPLink link link" href="\/*\/" *>/g
  const prefix = Array.from({ length: dto.depth }).fill("..").join("/")
  const content = await readFile(dto.path, "utf8")

  const assetsReplaced = replaceTag(assetsRegex, prefix, content)
  const asideReplaced = replaceAside(asideRegex, prefix, assetsReplaced)
  await writeFile(dto.path, asideReplaced)
}

const dir = import.meta.dirname + "/.vitepress/dist"
const dtos = await getHtmlFileRecursive(dir)

await convert(dtos[1])
// for (const dto of dtos) {
// }
