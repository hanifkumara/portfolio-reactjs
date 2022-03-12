import React, { useState, useEffect } from 'react'
import {
  Tabs,
  Tab
} from 'react-bootstrap'
import InventoryTab from './InventoryTab/InventoryTab'
import { useDispatch } from 'react-redux'
import { getAllProduct } from '../../config/redux/actions/product'
import { getAllInventory } from '../../config/redux/actions/inventory'
import { getAllIncomingStock } from '../../config/redux/actions/incomingStock'
import { getAllOutcomingStock } from '../../config/redux/actions/outcomingStock'
import { getAllOutlet } from '../../config/redux/actions/outlet'

export default function InventoryPage() {
  const dispatch = useDispatch()
  const [key, setKey] = useState('inventory')

  useEffect(() => {
    dispatch(getAllProduct())
    dispatch(getAllOutlet())
    dispatch(getAllInventory())
    dispatch(getAllIncomingStock())
    dispatch(getAllOutcomingStock())
  }, [])

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
