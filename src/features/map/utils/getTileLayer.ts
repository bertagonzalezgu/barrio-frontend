import type { Theme } from '../../theme/utils/themePreference'

const TILES_BASE_URL = 'https://basemaps.cartocdn.com/rastertiles'
const TILE_STYLE: Record<Theme, string> = { light: 'light_all', dark: 'dark_all' }
const ATTRIBUTION =
  '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, © <a href="https://carto.com/attribution/">CARTO</a>'

export function getTileLayer(theme: Theme) {
  return {
    url: `${TILES_BASE_URL}/${TILE_STYLE[theme]}/{z}/{x}/{y}{r}.png?key=${import.meta.env.VITE_CARTO_BASEMAPS_KEY}`,
    attribution: ATTRIBUTION,
    maxNativeZoom: 18,
    maxZoom: 20,
  }
}