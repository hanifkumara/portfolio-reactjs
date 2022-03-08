const initialProductCategory = {
  allProductCategory: []
}

const productCategoryReducer = (state = initialProductCategory, action) => {
  console.log("action productCategoryReducer", action.payload)
  switch(action.type){
    case 'SET_ALL_PRODUCT_CATEGORY':
    return {
        ...state,
        allProductCategory: action.payload
    }
  }
  return state
} 

export default productCategoryReducer