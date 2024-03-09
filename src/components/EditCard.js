import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { readCard, readDeck, updateCard } from "../utils/api/index";

export const EditCard = () => {
    const { deckId, cardId } = useParams();
    const navigation = useNavigate();
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
    const [card, setCard] = useState(initialDeckState);
    const [deck, setDeck] = useState(initialCardState);

    useEffect(() => {
        async function fetchData() {
            try {
                const deckResponse = await readDeck(deckId, abortController.signal);
                const cardResponse = await readCard(cardId, abortController.signal)
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

    function handleChange({ target }) {
        setCard({
            ...card, [target.name]: target.value,
        });
    }

    function handleSubmit(event) {
        event.preventDefault();
        const response = updateCard({ ...card }, abortController.signal)
        navigation.navigate(`/decks/${deckId}`);
        return response;
    }

    function handleCancel() {
        navigation.navigate(`/decks/${deckId}`);
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
            <form onSubmit={handleSubmit}>
                <h2>Edit Card</h2>
                <div className="form-group">
                    <label>Front</label>
                    <textarea id="front" name="front" className="form-control" onChange={handleChange} type="text" value={card.front} />
                </div>
                <div className="form-group">
                    <label>Back</label>
                    <textarea id="back" name="back" className="form-control" onChange={handleChange} type="text" value={card.back} />
                </div>
                <button className="btn btn-secondary" onClick={() => handleCancel()}>
                    Cancel
                </button>
                <button className="btn btn-primary" type="submit">
                    Save
                </button>
            </form>
        </div>
    );
}

export default EditCard;