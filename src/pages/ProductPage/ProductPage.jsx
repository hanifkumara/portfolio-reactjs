import React, { useState } from 'react'
import { Tabs, Tab } from "react-bootstrap";

import ProductTab from './ProductTab/ProductTab'
import ProductCategoryTab from './ProductCategoryTab/ProductCategoryTab';

export default function ProductPage() {
  const [tabs, setTabs] = useState("product")

  return (
    <div>
      <Tabs activeKey={tabs} onSelect={(v) => setTabs(v)}>
        <Tab eventKey="product" title="Product">
          <ProductTab/>
        </Tab>

        <Tab eventKey="category" title="Category">
          <ProductCategoryTab/>
        </Tab> 
        {/* <Tab eventKey="product-convertion" title="Product Convertion">
          <ProductConvertion
            allOutlets={allOutlets}
            refresh={refresh}
            handleRefresh={handleRefresh}
          />
        </Tab> */}

      </Tabs>
    </div>
  )
}
