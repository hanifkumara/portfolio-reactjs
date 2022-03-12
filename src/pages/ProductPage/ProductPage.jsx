import React, { useEffect, useState } from 'react'
import { Tabs, Tab } from "react-bootstrap";

import ProductTab from './ProductTab/ProductTab'
import ProductCategoryTab from './ProductCategoryTab/ProductCategoryTab';
import { getAllProduct } from '../../config/redux/actions/product'
import { useDispatch } from 'react-redux'

export default function ProductPage() {
  const [tabs, setTabs] = useState("product")
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllProduct())
  }, [])

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
