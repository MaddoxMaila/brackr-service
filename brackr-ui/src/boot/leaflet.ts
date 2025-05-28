import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// Fix default icon URLs so markers show correctly
delete (L.Icon.Default.prototype as unknown as { _getIconUrl: unknown })._getIconUrl

L.Icon.Default.mergeOptions({
  iconRetinaUrl: new URL('leaflet/dist/images/marker-icon-2x.png', import.meta.url).href,
  iconUrl: new URL('leaflet/dist/images/marker-icon.png', import.meta.url).href,
  shadowUrl: new URL('leaflet/dist/images/marker-shadow.png', import.meta.url).href,
})
