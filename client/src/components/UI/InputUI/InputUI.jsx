import React from 'react'

export const InputUI = ({typeInpt, style, idInpt, nameInpt, valueInpt, textInpt, eventInpt}) => {
  return (
    <input type={typeInpt} className={style} id={idInpt} name={nameInpt} value={valueInpt} placeholder={textInpt} onChange={eventInpt}  />
  )
}
