import { useEffect, useState } from 'react'
import { Card } from './components/Card/Card'
import { IconReset } from './components/Icons/Icon-reset'
import fruitItems from './fruits.json'
import './App.css'

export const App = () => {
  const [fruits, setFruits] = useState([])
  const [fruitOne, setFruitOne] = useState(null)
  const [fruitTwo, setFruitTwo] = useState(null)

  const chooseCard = (fruit) => {
    fruitOne ? setFruitTwo(fruit) : setFruitOne(fruit)
  }

  const initGame = () => {
    const allFruits = [...fruitItems, ...fruitItems]
      .sort(() => Math.random() - 0.5)
      .map((item) => ({ ...item, id: Math.random() }))
    setFruits(allFruits)
  }

  const resetGame = () => {
    setFruits(prevFruits => {
      return prevFruits.map(item => {
        if (item.matched) {
          return { ...item, matched: false }
        }

        return item
      })
    })

    setFruitOne(null)
    setFruitTwo(null)

    setTimeout(() => {
      initGame()
    }, 500)
  }

  useEffect(() => {
    if (fruitOne && fruitTwo) {
      if (fruitOne.src === fruitTwo.src) {
        setFruits(prevFruits => {
          return prevFruits.map(item => {
            if (item.src === fruitOne.src) {
              return { ...item, matched: true }
            } else {
              return item
            }
          })
        })
      }

      setTimeout(() => {
        setFruitOne(null)
        setFruitTwo(null)
      }, 500)
    }
  }, [fruitTwo, fruitOne])

  return (
  <div>
    <h1>Fruits Game</h1>
    {
      fruits.length ? <>
        <button className='reset' onClick={resetGame}>
            <IconReset/>
        </button >
        <div className="game-block">
          {
            fruits.map((fruit, key) => {
              return <Card
                key={key}
                chooseCard={chooseCard}
                flipped={fruit === fruitOne || fruit === fruitTwo || fruit.matched}
                fruit={fruit}
              />
            })
          }
        </div>
      </> :
      <button className='start-game' onClick={initGame}>
          GO
      </button>
    }
    <span className='writter'>by Denis Ekimov</span>
  </div>
  )
}
