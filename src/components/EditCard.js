import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import CardForm from "./CardForm";
import { readDeck, readCard, updateCard } from '../utils/api';

export const EditCard = () => {
    const { deckId, cardId } = useParams();
    const navigate = useNavigate();
    const abortController = new AbortController();
    const initialDeckState = {
        id: "",
        name: "",
        description: ""
    };
    const initialCardState = {
        id: "",
        front: "",
        back: "",
        deckId: "",
    };
    const [card, setCard] = useState(initialCardState);
    const [deck, setDeck] = useState(initialDeckState);

    useEffect(() => {
        async function fetchData() {
            try {
                const deckResponse = await readDeck(deckId, abortController.signal);
                const cardResponse = await readCard(cardId, abortController.signal);
                setDeck(deckResponse);
                setCard(cardResponse);
            } catch (error) {
                console.error("Something went wrong", error);
            }
            return () => {
                abortController.abort();
            };
        }
    fetchData();
    }, []);

    function handleDone() {
        navigate(`/decks/${deckId}`);
    }

    function handleChange({ target }) {
        setCard({...card, [target.name]: target.value})
        }

    function handleSubmit(event) {
        event.preventDefault();
        const cardResponse = updateCard({ ...card }, abortController.signal);
            navigate(0);
            return cardResponse;
        }


    return (
        <div>
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item">
                    <Link to={`/decks/${deckId}`}>{deck.name}</Link>
                </li>
                <li className="breadcrumb-item active">Edit Card {cardId}</li>
            </ol>
            <CardForm
            card={card}
            handleChange={handleChange}
            handleDone={handleDone}
            handleSubmit={handleSubmit} />
        </div>
    );
}

export default EditCard;