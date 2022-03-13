import React, { useState, useEffect } from 'react'
import { Tabs, Tab } from "react-bootstrap";

import OutletTab from './OutletTab/OutletTab'
import OrderManagementTab from './OrderManagementTab/OrderManagementTab'

export default function OutletPage() {
  const [tabs, setTabs] = useState("outlet")

  return (
    <div>
      <Tabs activeKey={tabs} onSelect={(v) => setTabs(v)}>
        <Tab eventKey="outlet" title="Outlet">
          <OutletTab />
        </Tab>

        {/* <Tab eventKey="order-management" title="Order Management">
          <OrderManagementTab/>
        </Tab>  */}

      </Tabs>
    </div>
  )
}
