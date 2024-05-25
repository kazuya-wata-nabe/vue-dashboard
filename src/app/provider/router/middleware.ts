import type { RouteLocation } from "vue-router"

export const loadLayout = async (route: RouteLocation) => {
  const layout = route.meta.layout
  const dir = layout.toLocaleLowerCase()
  const file = `${layout}-layout`
  const layoutComponent = await import(`@/shared/components/layout/${dir}/${file}.vue`)
  route.meta.layout = layoutComponent.default
}
