import React from "react";
import { Link, useParams } from "react-router-dom";
import CardForm from "./CardForm";

export const EditCard = (deck) => {
    const { deckId, cardId } = useParams();

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
            <CardForm context={"edit"}/>
        </div>
    );
}

export default EditCard;