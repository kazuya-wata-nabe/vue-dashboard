import { createVuetify } from "vuetify"
import "vuetify/styles"

export const vuetify = createVuetify({
  components: {},
  defaults: {
    VTextField: {
      variant: "outlined",
    },
    VInput: {
      variant: "outlined",
    },
  },
})
