import React, { useState } from 'react'
import {
  Tabs,
  Tab
} from 'react-bootstrap'
import RawMaterialTab from './RawMaterialTab/RawMaterialTab'

export default function AssemblyPage() {

  const [key, setKey] = useState('inventory')

  return (
    <div>
      <Tabs
        activeKey={key}
        onSelect={(k) => setKey(k)}
      >
        <Tab eventKey="inventory" title="Inventory">
          <RawMaterialTab />
        </Tab>
      </Tabs>
    </div>
  )
}
