import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import { Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import Study from "../components/Study";
import CreateDeck from "../components/CreateDeck";
import Deck from "../components/Deck";
import EditDeck from "../components/EditDeck";
import AddCard from "../components/AddCard";
import EditCard from "../components/EditCard";

function Layout() {
  return (
    <div>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<Home />} />
            <Route path="/decks/new" element={<CreateDeck />} />
            <Route path="/decks/:deckId" element={<Deck />} />
            <Route path="/decks/:deckId/study" element={<Study />} />
            <Route path="/decks/:deckId/edit" element={<EditDeck />} />
            <Route path="/decks/:deckId/cards/:cardId/edit" element={<EditCard />} />
            <Route path="/decks/:deckId/cards/new" element={<AddCard />} />
        </Routes>
      </div>
    </div>
  );
}

export default Layout;
