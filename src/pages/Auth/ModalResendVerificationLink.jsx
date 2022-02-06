import React from 'react'
import {
  Modal,
  Spinner
} from 'react-bootstrap'

const ModalResendVerificationLink = ({
  showModal,
  handleCloseModal,
  handleSendVerificationLink,
  accountBusiness,
  loadingModal
}) => {
  return (
    <div>
      <Modal centered show={showModal && accountBusiness.email ? true : false} onHide={handleCloseModal} size='md'>
        <Modal.Body>
          <div className="my-2 mx-2">
            <h4 className="mb-4">{accountBusiness.email}</h4>
            <div>Verification link not sent yet ? 
              <span 
                style={{cursor: 'pointer'}} 
                className={`${loadingModal ? 'text-muted' : 'text-primary'} ms-2"`}
                onClick={() => {
                  if(!loadingModal){
                    console.log("JIKA LOADING NYA FALSE")
                    handleSendVerificationLink(accountBusiness.email, accountBusiness.businessId)
                  } else {
                    console.log("JIKA LOADING NYA TRUE")
                  }
                }}
              > Resend code
              {loadingModal ? (
                <Spinner className="ms-2" animation="border" role="status" size="sm" />
              ): null}
              </span>
            </div>
            {/* <div className="d-grid gap-2">
              <button className="btn btn-primary" type="button" disabled={loadingModal} onClick={() => handleSendVerificationLink(accountBusiness.email, accountBusiness.businessId)}>Resend Link Verification
              {loadingModal ? (
                <Spinner className="ms-2" animation="border" role="status" size="sm" />
              ): null}
              </button>
            </div> */}
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default ModalResendVerificationLink