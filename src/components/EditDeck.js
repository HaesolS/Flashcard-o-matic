import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api/index";

export const EditDeck = () => {
    const { deckId } = useParams();
    const navigate = useNavigate();
    const initialDeckState = {
        id: "",
        name: "",
        description: ""
    }
    const [deck, setDeck] = useState(initialDeckState);
    const abortController = new AbortController();

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

    function handleSubmit(event) {
        event.preventDefault();
        const response = updateDeck({ ...deck }, abortController.signal);
        navigate(`/decks/${deckId}`);
        return response;
    }

    function handleChange({ target }) {
        setDeck({
            ...deck, [target.name]: target.value,
        });
    }

    function handleCancel() {
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
                <li className="breadcrumb-item active">Edit Deck</li>
            </ol>
            <form onSubmit={handleSubmit}>
                <h1>Edit Deck</h1>
                <div className="form-group">
                    <label>Name</label>
                    <input id="name" name="name" className="form-control" onChange={handleChange} type="text" value={deck.name} />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea id="description" name="description" className="form-control" onChange={handleChange} type="text" value={deck.description} />
                </div>
                <button className="btn btn-secondary" onClick={() => handleCancel()}>
                    Cancel
                </button>
                <button className="btn btn-primary" type="submit">
                    Submit
                </button>
            </form>
        </div>
    );
}

export default EditDeck;