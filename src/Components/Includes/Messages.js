import React from 'react'

const Messages = ({show, success, message}) => {
  return (
    {show} &&
        <p className={success ? `App__success` : `App__failure`}>{message}</p> 
  )
}

export default Messages