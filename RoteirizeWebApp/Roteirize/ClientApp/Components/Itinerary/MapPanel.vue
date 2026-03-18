<template lang="pug">
div(:class="props.class")
  .rounded-lg.border.border-border.overflow-hidden(ref="mapContainerRef" style="height: 500px")
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import type { Destination } from '@/Types/itinerary'

interface Props {
  destinations: Destination[]
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  class: undefined,
})

const mapContainerRef = ref<HTMLElement | null>(null)
let map: L.Map | null = null
let markersGroup: L.LayerGroup | null = null
let polyline: L.Polyline | null = null

function updateMarkers() {
  if (!map) return
  if (markersGroup) markersGroup.clearLayers()
  if (polyline) map.removeLayer(polyline)

  markersGroup = L.layerGroup().addTo(map)
  const coords: L.LatLngExpression[] = []

  props.destinations.forEach((dest) => {
    const latlng: L.LatLngExpression = [dest.lat, dest.lng]
    coords.push(latlng)
    L.marker(latlng).bindPopup(`<b>${dest.name}</b><br>${dest.country}`).addTo(markersGroup!)
  })

  if (coords.length > 1) {
    polyline = L.polyline(coords, { color: 'hsl(var(--primary))', weight: 2, dashArray: '8 4' }).addTo(map)
  }

  if (coords.length > 0) {
    map.fitBounds(L.latLngBounds(coords), { padding: [40, 40] })
  }
}

onMounted(() => {
  if (!mapContainerRef.value) return
  map = L.map(mapContainerRef.value).setView([0, 0], 2)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
  }).addTo(map)
  updateMarkers()
})

watch(() => props.destinations, updateMarkers, { deep: true })
</script>
