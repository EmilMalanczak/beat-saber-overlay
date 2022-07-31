import { roundZoomScale } from './round-zoom-scale'

import { useConfiguratorStore } from '../store/configurator'

export const getInitialZoom = (initialValues?: { width: number; height: number }) => {
  const canvas = initialValues || useConfiguratorStore.getState().canvas
  const vmin = window.innerHeight > window.innerWidth ? window.innerWidth : window.innerHeight

  const heightDimension = roundZoomScale(window.innerHeight / (canvas.height + vmin * 0.1))
  const widthDimension = roundZoomScale(window.innerWidth / (canvas.width + vmin * 0.1))

  return heightDimension > widthDimension ? widthDimension : heightDimension
}
