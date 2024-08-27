import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import './style.css'
export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
}
