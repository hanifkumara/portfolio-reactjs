import React, { useState } from 'react'
import { Tabs, Tab } from "react-bootstrap";

import AccountInformationTab from './AccountInformationTab/AccountInformationTab'
import BusinessInformationTab from './BusinessInformationTab/BusinessInformationTab'

export default function OutletPage() {
  const [tabs, setTabs] = useState("account-information")

  return (
    <div>
      <Tabs activeKey={tabs} onSelect={(v) => setTabs(v)}>
        <Tab eventKey="account-information" title="Acount Information">
          <AccountInformationTab/>
        </Tab>

        <Tab eventKey="business-information" title="Business Information">
          <BusinessInformationTab/>
        </Tab> 

      </Tabs>
    </div>
  )
}
