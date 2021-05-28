import React, { useEffect } from 'react'

const Alert = ({msg, type, removeAlert , list}) => {
  
  useEffect(() => {
    const timeout = setTimeout(() =>{
      removeAlert(); 
    }, 3000);
  }, [list]);

  return <p className={`alert alert-${type}`}>{msg}</p>
}

export default Alert
