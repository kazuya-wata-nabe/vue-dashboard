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

const replaceTag2 = (reg: RegExp, prefix: string, content: string): string => {
  const matched = reg.exec(content)
  if (matched === null) return content

  const [tag = "", oldPath, _] = matched
  console.debug(tag)
  const newPath = prefix + oldPath + "index.html"
  const styleTag = tag.replace(oldPath, newPath)
  return replaceTag(reg, prefix, content.replace(tag, styleTag))
}

const convert = async (dto: Dto) => {
  const assetsRegex = /[href|src]="(\/assets\/.*?)"*[^>]*>/
  const prefix = Array.from({ length: dto.depth }).fill("..").join("/")
  let content = await readFile(dto.path, "utf8")

  const asideRegex = /<aside class="VPSidebar"(.*)<\/aside>/
  const aside = asideRegex.exec(content)
  content = replaceTag(/href="\/"/, prefix, content)
  // const assetsReplaced = replaceTag(assetsRegex, prefix, "", content)
  // const asideReplaced = replaceTag2(asideRegex, prefix, content)
  // await writeFile(dto.path, asideReplaced)
}

const dir = import.meta.dirname + "/.vitepress/dist"
const dtos = await getHtmlFileRecursive(dir)

await convert(dtos[1])
// for (const dto of dtos) {
//   await convert(dto)
// }
