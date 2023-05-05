import React from 'react'

export const ButtonUI = ({typeBtn,style, text, onClicks}) => {
  return (
    <button type={typeBtn} className={style} onClick={onClicks}>{text}</button>
  )
}
