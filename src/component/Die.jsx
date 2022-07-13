import React from 'react'

export default function Die(props) {
  console.log()
  return (
    <div 
        onClick = {props.isDieClicked?null:props.holdDice} 
        style = {{backgroundColor:props.isHeld?'#59E391':'white'}}
        className ='die'>
        {props.digit}
    </div>
  )
}
