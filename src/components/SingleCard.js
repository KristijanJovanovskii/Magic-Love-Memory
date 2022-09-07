import './SingleCard.css';

export default function SingleCard({ card, handleChoise, flipped, disabled }) {

    const handleClick = () => {
        if (!disabled) { // IS NOT disabled
            handleChoise(card)
        }
    }

    return (
        <div className="card">
            <div className={flipped ? "flipped" : ""}>
                <img className="front" src={card.src} alt="card front"/>
                <img 
                    className="back"
                    src="/img/card-back.png" 
                    onClick={handleClick} 
                    alt="card back"
                />
            </div>
        </div>
    )
}