import { JSDOM } from "jsdom"
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

const convert = async (dto: Dto) => {
  const prefix = Array.from({ length: dto.depth }).fill("..").join("/")
  const content = await readFile(dto.path, "utf8")
  const dom = new JSDOM(content, { contentType: "text/html" })
  const getAll = <T extends HTMLElement>(selector: string) =>
    dom.window.document.querySelectorAll<T>(selector) ?? []

  for (const element of getAll<HTMLLinkElement>("head > link")) {
    element.href = prefix + element.href
  }

  for (const element of getAll<HTMLAnchorElement>("a.VPLink")) {
    const hasExt = element.href.endsWith(".html")
    const href = hasExt ? element.href : element.href + "index.html"
    element.href = prefix + href
  }

  for (const element of getAll<HTMLImageElement>("main img")) {
    element.src = prefix + element.src
  }

  await writeFile(dto.path, dom.serialize())
  // await writeFile(dto.path + "2.html", dom.serialize())
}

const dir = import.meta.dirname + "/.vitepress/dist"
const dtos = await getHtmlFileRecursive(dir)

for (const dto of dtos) {
  await convert(dto)
}
