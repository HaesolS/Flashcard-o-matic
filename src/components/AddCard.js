import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { createCard, readDeck } from "../utils/api/index";

export const AddCard = () => {
    const [deck, setDeck] = useState({});
    const { deckId } = useParams();
    const navigation = useNavigate();
    const abortController = new AbortController();
    const initialState = {
        front: "",
        back: ""
    };
    const [newCard, setNewCard] = useState(initialState);

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
    }, []);

    function handleChange({ target }) {
        setNewCard({
            ...newCard, [target.name]: target.value,
        });
    }

    function handleSubmit(event) {
        event.preventDefault();
        const response = createCard(
            deckId, { ...newCard }, abortController.signal
        );
        navigation(0);
        setNewCard(initialState);
        return response;
    }

    function handleDone() {
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
                <li className="breadcrumb-item active">Add Card</li>
            </ol>
            <form onSubmit={handleSubmit}>
                <h2>{deck.name}: Add Card</h2>
                <div className="form-group">
                    <label>Front</label>
                    <textarea id="front" name="front" className="form-control" onChange={handleChange} type="text" value={newCard.front} />
                </div>
                <div className="form group">
                    <label>Back</label>
                    <textarea id="back" name="back" className="form-control" onChange={handleChange} type="text" value={newCard.back} />
                </div>
                <button className="btn btn-secondary" onClick={() => handleDone()}>
                    Done
                </button>
                <button className="btn btn-primary" type="submit">
                    Save
                </button>
            </form>
        </div>
    );
}

export default AddCard;