import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';


const cardImages = [
  {"src": "/img/beach.png", matched: false},
  {"src": "/img/climb.png", matched: false},
  {"src": "/img/dzonishoot.png", matched: false},
  {"src": "/img/fall.png", matched: false},
  {"src": "/img/light.png", matched: false},
  {"src": "/img/wildoblast.png", matched: false}
]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiseOne, setChoiseOne] = useState(null)
  const [choiseTwo, setChoiseTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)


  // shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({...card, id: Math.random() }))

      setChoiseOne(null)
      setChoiseTwo(null)
      setCards(shuffledCards)
      setTurns(0)
  }

  // handle a choise
  const handleChoise = (card) => {
    choiseOne ? setChoiseTwo(card) : setChoiseOne(card)
  }

  // compare 2 selected cards
  useEffect(() => {
    
    if (choiseOne && choiseTwo) {
      setDisabled(true)
      if (choiseOne.src === choiseTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiseOne.src) {
              return {...card, matched: true}
            } else {
              return card
            }
          })
        })
        resetTurn()
      } else {
        
        setTimeout(() => resetTurn(), 1000)
      }
    }
  }, [choiseOne, choiseTwo])

  console.log(cards)

  // reset choise and increse turn
  const resetTurn = () => {
    setChoiseOne(null)
    setChoiseTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }

  // start a new game automagically
  useEffect(() => {
    shuffleCards()
  }, [])

  return (
    <div  className="App"> 
      <h1 className='logo'>Acient Love Memory</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map(card => (
          <SingleCard 
            key={card.id} 
            card={card}
            handleChoise={handleChoise}
            flipped={card === choiseOne || card === choiseTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p className='turns'>Turns: {turns}</p>
    </div>
  );
}

export default App;
