import React, { useState } from 'react'
import {
  Tabs,
  Tab
} from 'react-bootstrap'
import InventoryTab from './InventoryTab/InventoryTab'

export default function InventoryPage() {

  const [key, setKey] = useState('inventory')

  return (
    <div>
      <Tabs
        activeKey={key}
        onSelect={(k) => setKey(k)}
      >
        <Tab eventKey="inventory" title="Inventory">
          <InventoryTab />
        </Tab>
      </Tabs>
    </div>
  )
}
