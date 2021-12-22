import React from 'react'
import styles from './index.modules.css'

export default function index({
  width,
  height,
  src,
  alt
}) {
  console.log("props", width)
  console.log("props", height)
  console.log("props", src)
  console.log("props", alt)

  return (
    <div>
      <img width={width} height={height} src={src} alt={alt} />
    </div>
  )
}
