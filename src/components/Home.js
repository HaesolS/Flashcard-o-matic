import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { listDecks, deleteDeck } from "../utils/api/index";

export const Home = () => {
    const [decks, setDecks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
        const abortController = new AbortController();
        try {
            const deckResponse = await listDecks(abortController.signal);
            setDecks(deckResponse);
        } catch (error) {
            console.error("Something went wrong", error);
        }
        return () => {
            abortController.abort();
        };
    }
    fetchData();
}, []);

    function handleDelete(deck) {
        if (
            window.confirm(
                `Delete this deck? You will not be able to recover it.`
            )
        ) {
            navigate(0);
            return deleteDeck(deck.id);
        }
    }

    return (
        <main className="container">
            <section className="row">
                <Link to="decks/new">
                    <button>
                        + Create Deck
                    </button>
                </Link>
            </section>
            <section className="row">
                {decks.map((deck) => {
                    return (
                        <div className="card" key={deck.id} style={{ width: "32rem" }}>
                        <div className="cart-title">
                            {`${deck.name}`}
                        </div>
                        <div classname="card-subtitle text-muted">
                            {`${deck.cards.length} cards`}
                        </div>
                        <div className="card-text">
                            {`${deck.description}`}
                        </div>
                        <Link className="btn btn-secondary" to={`/decks/${deck.id}`}>
                            View
                        </Link>
                        <Link className="btn btn-primary" to={`/decks/${deck.id}/study`}>
                            Study
                        </Link>
                        <button className="btn btn-danger" onClick={() => handleDelete(deck)}>
                            Delete
                        </button>
                        </div>
                    );
                })}
            </section>
        </main>
    );
}

export default Home;