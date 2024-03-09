import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { readDeck } from "../utils/api/index";

export const Study = () => {
    const { deckId } = useParams();
    const [deck, setDeck] = useState({});
    const [cards, setCards] = useState([]);
    const [cardNumber, setCardNumber] = useState(1);
    const [front, setFront] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            const abortController = new AbortController();
            try {
                const deckResponse = await readDeck(deckId, abortController.signal);
                setDeck(deckResponse);
                setCards(deckResponse.cards);
            } catch (error) {
                console.error("Something went wrong", error);
            }
            return() => {
                abortController.abort();
            }
        };
        fetchData();
    }, []);

    function flipCard() {
        if (front) {
            setFront(false);
        } else {
            setFront(true);
        }
    }

    function nextCard(index, total) {
        if (index < total) {
            setCardNumber(cardNumber + 1);
            setFront(true);
        } else {
            if (window.confirm(
                `Restart cards? Click 'cancel' to return to the home page.`
            )) {
            setCardNumber(1);
            setFront(true);
            } else {
            navigate.pushState("/");
            }
        }
    }

    function showNextButton(cards, index) {
        if (front) {
            return null;
        } else {
            return (
                <button onClick={() => nextCard(index + 1, cards.length)} className="btn btn-primary">
                    Next
                </button>
            );
        }
    }

    function enoughCards() {
        return (
            <div className="card">
                {cards.map((card, index) => {
                    if (index === cardNumber -1) {
                        return (
                            <div classname="card-body" key={card.id}>
                                <div className="card-title">
                                    {`Card ${index + 1} of ${cards.length}`}
                                </div>
                                <div className="card-text">
                                    {front ? card.front : card.back}
                                </div>
                                <button onClick={flipCard} className="btn btn-secondary">
                                    Flip
                                </button>
                                {showNextButton(cards, index)}
                            </div>
                        )
                    }
                })}
            </div>
        )
    }

    function notEnoughCards() {
        return (
            <div>
                <h2>Not enough cards.</h2>
                <p>
                    You need at least 3 cards to study. There are {cards.length} cards in this deck.
                </p>
                <Link to={`/decks/${deck.id}/cards/new`} className="btn btn-primary">
                    Add Cards
                </Link>
            </div>
        );
    }

    return (
        <div>
            <ol className="breadcrumb">
                <li classname="breadcrumb-item">
                    <Link to="/">Home</Link>
                </li>
                <li classname="breadcrumb-item">
                    <Link to={`/decks/${deckId}`}>{deck.name}</Link>
                </li>
                <li className="breadcrumb-item active">Study</li>
            </ol>
            <div>
                <h2>{`${deck.name}: Study`}</h2>
                <div>
                    {cards.length === 0
                        ? notEnoughCards() : cards.length > 2
                        ? enoughCards() : notEnoughCards()}
                </div>
            </div>
        </div>
    )
}

export default Study;