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

const convert = async (dto: Dto, command: string) => {
  const prefix = dto.depth > 0 ? Array.from({ length: dto.depth }).fill("..").join("/") : "."
  const content = await readFile(dto.path, "utf8")
  const dom = new JSDOM(content, { contentType: "text/html" })

  const getAll = <T extends HTMLElement>(selector: string) =>
    dom.window.document.querySelectorAll<T>(selector) ?? []

  const script = dom.window.document.createElement("script")
  script.innerHTML = command
  dom.window.document.body.append(script)

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

const dir = import.meta.dirname + "/.vitepress"
const items = await getHtmlFileRecursive(dir + "/dist")
const ignores = new Set(["404.html", "README.html"])
const dtos = items.filter((item) => !ignores.has(item.source))
let command = `
`

const source = await readFile(dir + "/theme/custom-doc.vue", "utf8")
const lines = source.split("\n")
const scriptEnd = lines.findIndex((s) => s.startsWith("</script>"))
for (let line of lines.slice(1, scriptEnd)) {
  line = line.replace(/\((.*): .*\)/, "($1)")
  command += line + "\n"
}
command += `
document
 .querySelector(".toggle-wrapper > button")
 ?.addEventListener("click", run)
`

for (const dto of dtos) {
  console.debug(dto.source)
  await convert(dto, command)
}
