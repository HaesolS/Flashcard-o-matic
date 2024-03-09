import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { readDeck, deleteDeck, deleteCard } from "../utils/api/index";

export const Deck = () => {
    const [deck, setDeck] = useState({});
    const [cards, setCards] = useState([]);
    const { deckId } = useParams();
    const abortController = new AbortController();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            try {
                const deckResponse = await readDeck(deckId, abortController.signal);
                setDeck(deckResponse);
                setCards(deckResponse.cards);
            } catch (error) {
                console.error("Something went wrong", error);
            }
            return() => {
                abortController.abort();
            };
        }
        fetchData();
    }, []);

    function handleDeleteDeck(deck) {
        if (
            window.confirm(`Delete this deck? You will not be able to recover it.`)
        ) {
            navigate("/");
            return deleteDeck(deck.id, abortController.signal)
        }}

    function handleDeleteCard(card) {
        if (
            window.confirm(`Delete this card? You will not be able to recover it.`)
        ) {
            navigate(0);
            return deleteCard(card.id, abortController.signal);
        }
    }

    function handleEditDeck() {
        navigate(`/decks/${deckId}/edit`);
    }

    function handleStudy() {
        navigate(`/decks/${deckId}/study`);
    }

    function handleAddCard() {
        navigate(`/decks/${deckId}/cards/new`);
    }

    function handleEditCard(card) {
        navigate(`/decks/${deckId}/cards/${card.id}/edit`);
    }

    if (cards.length > 0) {
        return (
            <div>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="breadcrumb-item-active">{deck.name}</li>
                </ol>
                <div className="card">
                    <div className="card-body">
                        <h2 className="card-title">{deck.name}</h2>
                        <p>{deck.description}</p>
                        <button onClick={() => handleEditDeck()} className="btn btn-secondary">
                            Edit
                        </button>
                        <button onClick={() => handleStudy()} className="btn btn-primary">
                            Study
                        </button>
                        <button onClick={() => handleAddCard()} className="btn btn-primary">
                            Add Cards
                        </button>
                        <button onClick={() => handleDeleteDeck(deck)} className="btn btn-danger">
                            Delete
                        </button>
                    </div>
                </div>
                <h1>Cards</h1>
                {cards.map((card) => {
                    return (
                        <div className="card-deck" key={card.id}>
                            <div className="card">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col">{card.front}</div>
                                        <div classname="col">{card.back}</div>
                                    </div>
                                    <div classname="container row">
                                        <button onClick={() => handleEditCard(card)} className="btn btn-secondary">
                                            Edit
                                        </button>
                                        <button onClick={() => handleDeleteCard(card)} className="btn btn-danger">
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    } else {
        return null;
    }
}

export default Deck;