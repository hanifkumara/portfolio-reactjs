import React from 'react'

import { useSelector } from 'react-redux'

export default function DevPage() {
  const dataState = useSelector((state) => state)

  console.log("dataState", dataState)

  return (
    <div>
      <h1>Hello this is dev page</h1>
    </div>
  )
}
