import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import CardForm from "./CardForm";
import { readDeck, createCard } from '../utils/api';

export const AddCard = () => {
    const { deckId } = useParams();
    const navigate = useNavigate();
    const abortController = new AbortController();
    const initialState = {
        front: "",
        back: ""
    };
    const [card, setCard] = useState(initialState);
    const [deck, setDeck] = useState({});

    useEffect(() => {
        async function fetchData() {
            try {
                const deckResponse = await readDeck(deckId, abortController.signal);
                setDeck(deckResponse);
            } catch (error) {
                console.error("Something went wrong", error);
            }
            return () => {
                abortController.abort();
            };
        }
        fetchData();
    }, [deckId]);

    function handleSubmit(event) {
        event.preventDefault();
        const cardResponse = createCard(deckId, { ...card }, abortController.signal);
            navigate(0);
            setCard(initialState);
            return cardResponse;
        }

    function handleChange({ target }) {
        setCard({...card, [target.name]: target.value})
    }

    function handleDone() {
        navigate(`/decks/${deckId}`);
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
                <li className="breadcrumb-item active">Add Card</li>
            </ol>
            <CardForm
            card={card}
            handleChange={handleChange}
            handleDone={handleDone}
            handleSubmit={handleSubmit} />
        </div>
    );
}

export default AddCard;