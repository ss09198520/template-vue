import defaultSettings from '@/settings'
// import i18n from '@/lang'

const DEFAULT_TITLE = defaultSettings.title || 'Vue Vuetify Admin'

export default function getPageTitle(metaTitle) {
  // const hasKey = i18n.te(`route.${key}`)
  // if (hasKey) {
  //   const pageName = i18n.t(`route.${key}`)
  //   return `${pageName} - ${title}`
  // }
  return metaTitle || DEFAULT_TITLE;
}