import React from "react";
import { Link, useParams } from "react-router-dom";
import CardForm from "./CardForm";

export const AddCard = (deck) => {
    const { deckId } = useParams();

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
            <CardForm context={"add"}/>
        </div>
    );
}

export default AddCard;