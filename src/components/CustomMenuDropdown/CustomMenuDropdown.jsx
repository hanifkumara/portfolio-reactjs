import React, { useState } from 'react'
import styles from './CustomMenuDropdown.module.css'

// forwardRef again here!
// Dropdown needs access to the DOM of the Menu to measure it
const CustomMenu = React.forwardRef(
  ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
    const [value, setValue] = useState('');

    return (
      <div
        ref={ref}
        style={style}
        className={`${className} ${styles.customMenuDropdown}`}
        aria-labelledby={labeledBy}
      >
        <ul className={`${styles.customListDropdown} list-unstyled`}>
          {React.Children.toArray(children).filter(
            (child) =>
              !value || child.props.children.toLowerCase().startsWith(value),
          )}
        </ul>
      </div>
    );
  },
);

export default CustomMenu