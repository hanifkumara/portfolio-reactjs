import React, { useState } from 'react'
import { Tabs, Tab } from "react-bootstrap";

import OutletTab from './OutletTab/OutletTab'

export default function OutletPage() {
  const [tabs, setTabs] = useState("outlet")

  return (
    <div>
      <Tabs activeKey={tabs} onSelect={(v) => setTabs(v)}>
        <Tab eventKey="outlet" title="Outlet">
          <OutletTab/>
        </Tab>

        {/* <Tab eventKey="category" title="Category">
          <ProductCategoryTab/>
        </Tab>  */}

      </Tabs>
    </div>
  )
}
