import React from 'react'
import styles from './index.module.css'
import WrapperImage from '../WrapperImage/index'
import IconFacebook from '../../assets/images/icons8-facebook-500.png'
import IconInstagram from '../../assets/images/icons8-instagram-384.png' 
import IconLinkedin from '../../assets/images/icons8-linkedin-480.png' 
import IconPhotoProfile from '../../assets/images/cat_bg_transparent.png' 

export default function index() {
  return (
    <div className={styles.container}>
      <div className="container">
        <div className={`${styles.pt50} row`}>
          <div className="col-md-7">
            <div className={styles.leftHeader}>
              <div className={styles.wrapperPhoto}>
                <img src={IconPhotoProfile} alt="Photo Profile" />
              </div>
              <div className={styles.line1} />
              <div>
                <h1 className='text-white'>
                  <h1>
                    Hanif
                  </h1>
                  <h1>
                    Kumara.
                  </h1>
                </h1>
                <div className={styles.line2} />
              </div>
              <div className="d-flex">
                <WrapperImage src={IconFacebook} height="30" width="30" alt="Icon Facebook"/>
                <div className="mx-4">
                  <WrapperImage src={IconInstagram} height="30" width="30" alt="Icon Facebook"/>
                </div>
                <WrapperImage src={IconLinkedin} height="30" width="30" alt="Icon Facebook"/>
              </div>
            </div>
          </div>
          <div className="col-md-5">
            <h1 className={styles.textDanger}>
              Ini Component Header
            </h1>
          </div>
        </div>
      </div>
    </div>
  )
}
