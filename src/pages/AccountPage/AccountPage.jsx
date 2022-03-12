import React, { useState, useEffect } from 'react'
import { Tabs, Tab } from "react-bootstrap";

import AccountInformationTab from './AccountInformationTab/AccountInformationTab'
import BusinessInformationTab from './BusinessInformationTab/BusinessInformationTab'
import { getBusiness } from '../../config/redux/actions/business'
import { useDispatch } from 'react-redux'

export default function OutletPage() {
  const [tabs, setTabs] = useState("account-information")
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getBusiness())
  }, [])

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
