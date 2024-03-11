import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createCard, updateCard, readCard, readDeck } from "../utils/api/index";

export const CardForm = ({ context }) => {
    const [isEditing, setIsEditing] = useState(false);
    const { deckId, cardId } = useParams();
    const navigate = useNavigate();
    const abortController = new AbortController();
    const initialState = {
        front: "",
        back: ""
    };
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
    const [newCard, setNewCard] = useState(initialState);
    const [card, setCard] = useState(initialDeckState);
    const [deck, setDeck] = useState(initialCardState);

    useEffect(() => {
        async function fetchData() {
            try {
                const deckResponse = await readDeck(deckId, abortController.signal);
                const cardResponse = await readCard(cardId, abortController.signal)
                setDeck(deckResponse);
                setCard(cardResponse);
                if (context === "edit") {
                    setIsEditing(true);
                }
            } catch (error) {
                console.error("Something went wrong", error);
            }
            return () => {
                abortController.abort();
            };
        }
    fetchData();
    }, [context]);

    function handleSubmit(event) {
        event.preventDefault();
        let response;
        if (isEditing) {
            response = updateCard({ ...card }, abortController.signal);
            navigate(`/decks/${deckId}`);
        } else {
            response = createCard(deckId, { ...newCard }, abortController.signal);
            navigate(0);
            setNewCard(initialState);
        }
        return response;
    }

    function handleChange({ target }) {
        if (isEditing) {
            setCard({
            ...card, [target.name]: target.value})
        } else {
            setNewCard({
            ...newCard, [target.name]: target.value});
        }
    }

    function handleCancel() {
        navigate(`/decks/${deckId}`);
    }

    function handleDone() {
        navigate(`/decks/${deckId}`);
    }

    return (
            <form onSubmit={handleSubmit}>
                <h2>{isEditing ? `Edit Card` : `${deck.name}: Add Card`}</h2>
                <div className="form-group">
                    <label>Front</label>
                    <textarea
                        id="front"
                        name="front"
                        className="form-control"
                        onChange={handleChange}
                        type="text"
                        value={isEditing ? card.front : newCard.front} />
                </div>
                <div className="form group">
                    <label>Back</label>
                    <textarea
                        id="back"
                        name="back"
                        className="form-control"
                        onChange={handleChange}
                        type="text"
                        value={isEditing ? card.back : newCard.back} />
                </div>
                {isEditing ? (
                    <button className="btn btn-secondary" onClick={handleCancel}>
                        Cancel
                    </button>
                ) : (
                    <button className="btn btn-secondary" onClick={handleDone}>
                    Done
                </button>
                )}
                <button className="btn btn-primary" type="submit">
                    Save
                </button>
            </form>
    );
}

export default CardForm;