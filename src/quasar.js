import Vue from 'vue'

import './styles/quasar.styl'
import '@quasar/extras/roboto-font/roboto-font.css'
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/fontawesome-v5/fontawesome-v5.css'

import {
  Quasar, 
  QLayout,
  QHeader,
  QDrawer,
  QPageContainer,
  QPage,
  QToolbar,
  QToolbarTitle,
  QBtn,
  QIcon,
  QList,
  QItem,
  QItemSection,
  QItemLabel,
  QSelect,
  QSpace,
  QCard,
  QFooter,
  QTable,
  QInput,
  QScrollArea,
  QForm,
  Notify,
} from 'quasar'

Vue.use(Quasar, {
  config: {
    notify: {},
  },
  components: {
    QLayout,
    QHeader,
    QDrawer,
    QPageContainer,
    QPage,
    QToolbar,
    QToolbarTitle,
    QBtn,
    QIcon,
    QList,
    QItem,
    QItemSection,
    QItemLabel,
    QSelect,
    QSpace,
    QCard,
    QFooter,
    QTable,
    QInput,
    QScrollArea,
    QForm,
  },
  directives: {
  },
  plugins: {
    Notify
  }
 })
