const initialBusiness = {
  business: {
    BusinessAccount: {
      email: '',
      password: ''
    }
  }
}

const businessReducer = (state = initialBusiness, action) => {
  console.log("action businessReducer", action.payload)
  switch(action.type){
    case 'SET_BUSINESS':
    return {
        ...state,
        business: action.payload
    }
  }
  return state
} 

export default businessReducer