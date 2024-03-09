import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createDeck } from "../utils/api/index";

export const CreateDeck = () => {
    const navigate = useNavigate();
    const abortController = new AbortController();
    const initialState = {
        name: "",
        description: ""
    };
    const [newDeck, setNewDeck] = useState(initialState);

    function handleChange({ target }) {
        setNewDeck({
            ...newDeck, [target.name]: target.value,
        });
    }

    function handleSubmit(event) {
        event.preventDefault();
        const response = createDeck(
            { ...newDeck }, abortController.signal
        );
        navigate("/");
        return response
    }

    function handleCancel() {
        navigate("/");
    }

    return (
        <div>
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item active">Create Deck
                </li>
            </ol>
            <form onSubmit={(event) => handleSubmit(event)}>
                <h1>CreateDeck</h1>
                <div className="form-group">
                    <label>Name</label>
                    <input id="name" name="name" className="form-control" onChange={handleChange} type="text" value={newDeck.name} />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea id="description" name="description" className="form-control" onChange={handleChange} type="text" value={newDeck.description} />
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

export default CreateDeck;