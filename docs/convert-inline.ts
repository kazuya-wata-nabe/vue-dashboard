import { JSDOM } from "jsdom"
import { writeFile, readFile, readdir } from "node:fs/promises"

type Dto = {
  source: string
  path: string
  depth: number
}

const getHtmlFileRecursive = async (source: string): Promise<Dto[]> => {
  const fileList = await readdir(source, { recursive: true })
  const htmlList = fileList.filter((file) => file.endsWith(".html"))

  return htmlList.map((html) => ({
    source: html,
    path: source + "/" + html,
    depth: html.split("/").length - 1,
  }))
}

const convert = async (dto: Dto) => {
  const prefix = dto.depth > 0 ? Array.from({ length: dto.depth }).fill("..").join("/") : "."
  const content = await readFile(dto.path, "utf8")
  const dom = new JSDOM(content, { contentType: "text/html" })
  const getAll = <T extends HTMLElement>(selector: string) =>
    dom.window.document.querySelectorAll<T>(selector) ?? []

  for (const element of getAll<HTMLLinkElement>("head > link")) {
    element.href = prefix + element.href
  }

  const anchors = [
    ...[...getAll<HTMLAnchorElement>("a.VPLink")].filter((el) => el.text !== "画面遷移図"),
    ...getAll<HTMLAnchorElement>("a.VPButton"),
    ...getAll<HTMLAnchorElement>("div.VPNavBarTitle > a.title"),
  ]
  for (const element of anchors) {
    const hasExt = element.href.endsWith(".html")
    const href = hasExt ? element.href.slice(0, -5) + "/" : element.href
    element.href = prefix + href + "index.html"
  }

  for (const element of getAll<HTMLImageElement>("main img")) {
    element.src = prefix + element.src
  }

  await writeFile(dto.path, dom.serialize())
}

const dir = import.meta.dirname + "/.vitepress/dist"
const items = await getHtmlFileRecursive(dir)
const ignores = new Set(["404.html", "README.html"])
const dtos = items.filter((item) => !ignores.has(item.source))

for (const dto of dtos) {
  console.debug(dto.source)
  await convert(dto)
}
