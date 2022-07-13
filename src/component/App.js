import '../App.css';
import React, { useEffect, useState } from 'react';
import Heading from './Heading';
import Instruction from './Instruction';
import Die from './Die';
import Button from './Button';
import Confetti from 'react-confetti'

export default function App() {

  const ranArrayGen = () => {
    let temp = [];
    for (let i = 0; i < 10; i++) {
      const ranTemp = Math.floor(Math.random() * 6 + 1)
      temp.push({ value: ranTemp, isHeld: false, id: i })
    }
    return temp;
  }

  const [dieDigit, setDieDigit] = useState(ranArrayGen())
  const [tenzies, setTenzies] = useState(false)
  const [isDieClicked, setIsDieClicked] = useState(false)
  const [clickedDigit, setClickedDigit] = useState(0)

  useEffect(() => {
    const first_die = dieDigit[0].value
    let flag = true
    for (let i = 0; i < 10; i++) {
      if (dieDigit[i].value === first_die && dieDigit[i].isHeld) {
        continue
      }
      else {
        flag = false
        break
      }
    }
    if (flag) {
      setTenzies(true)
    }
  }, [dieDigit])

  const holdDice = (id) => {
    setIsDieClicked(true)
    setClickedDigit(dieDigit[id].value)
    const temp = dieDigit[id].value
    setDieDigit((prev) => {
      prev[id].isHeld = true
      for (let i = 0; i < 10; i++) {
        if (temp === prev[i].value) {
          prev[i].isHeld = true
        }
      }
      return [...prev]
    })
  }

  const die = dieDigit.map((die) => {
    return <Die key={die.id} isDieClicked={isDieClicked} holdDice={() => holdDice(die.id)} digit={die.value} isHeld={die.isHeld} />
  })

  const handleRoll = () => {
    if (tenzies) {
      setDieDigit(ranArrayGen())
      setTenzies(false)
      setIsDieClicked(false)
      setClickedDigit(0)
    }
    else {
      setDieDigit((prev) => {
        for (let i = 0; i < 10; i++) {
          if (prev[i].isHeld) {
            continue
          }
          else {
            const temp = Math.floor(Math.random() * 6 + 1)
            prev[i].value = temp
            if (temp === clickedDigit) {
              prev[i].isHeld = true
            }
          }
        }
        return [...prev]
      })
    }
  }



  return (

    <div className='container'>
      {tenzies && <Confetti />}
      <Heading />
      <Instruction />
      <div className='die-container'>
        {die}
      </div>
      <Button buttonText={tenzies ? 'New Game' : 'Roll'} handleRoll={handleRoll} />
    </div>
  )
}