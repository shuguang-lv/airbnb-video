'use client'

import 'leaflet/dist/leaflet.css'

import L from 'leaflet'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'
import React from 'react'
import { MapContainer, Marker, TileLayer } from 'react-leaflet'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment, @typescript-eslint/prefer-ts-expect-error
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x.src,
  iconUrl: markerIcon.src,
  shadowUrl: markerShadow.src,
})

interface MapProps {
  center?: number[]
}

const url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'

const Map: React.FC<MapProps> = ({ center }) => (
      <MapContainer
        center={center as L.LatLngExpression || [51, -0.09]}
        className="h-[35vh] rounded-lg"
        scrollWheelZoom={false}
        zoom={center ? 4 : 2}
      >
        <TileLayer
          attribution={attribution}
          url={url}
        />
        {center ? <Marker position={center as L.LatLngExpression} /> : null}
      </MapContainer>
)

export default Map
