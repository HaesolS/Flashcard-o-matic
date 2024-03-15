<h1>Project: Flashcard-o-matic</h1>
<p>
  A local school has decided to put together a flashcard application, <i>Flashcard-o-matic</i>, to help their students study online. Teachers will use this application to create decks of flashcards for the subjects they teach, and students will study the decks. The school needs you to build the application that the students and teachers will use.
</p>
<br>
<img src="https://github.com/HaesolS/Flashcard-o-matic/assets/147211855/711d4db8-aa25-49f1-9d3c-eb5137cb1d38">
<br>
This project is designed to test your ability to work with rendering and state management using React. Before taking on this module, you should be comfortable with the following:
<p>
<ul>
  <li>Installing packages via NPM</li>
  <li>Running tests from the command line</li>
  <li>Writing React function components</li>
  <li>Creating routes, including nested routes, using React Router</li>
  <li>Using hooks like <code>useState()</code>, <code>useParams()</code>, and <code>useHistory()</code></li>
  <li>Debugging React code through console output and using the VS Code debugger</li>
</ul>
</p>
<br>
<h2>Instructions</h2>
<br>
You are tasked with building a number of different screens for the users of the flashcard app, as summarized below:
<p>
<table>
  <tr>
    <th>Screen</th>
    <th>Path</th>
    <th>Description</th>
  </tr>
  <tr>
    <th>Home</th>
    <th><code>/</code></th>
    <th>Shows a list of decks with options to create, study, view, or delete a deck</th>
  </tr>
  <tr>
    <th>Study</th>
    <th><code>/decks/:deckId/study</code></th>
    <th>Allows the user to study the cards from a specified deck</th>
  </tr>
  <tr>
    <th>Create Deck	</th>
    <th><code>/decks/new</code></th>
    <th>Allows the user to create a new deck</th>
  </tr>
  <tr>
    <th>Deck</th>
    <th><code>/decks/:deckId</code></th>
    <th>Shows all of the information about a specified deck with options to edit or add cards to the deck, navigate to the study screen, or delete the deck</th>
  </tr>
  <tr>
    <th>Edit Deck</th>
    <th><code>/decks/:deckId/edit</code></th>
    <th>Allows the user to modify information on an existing deck</th>
  </tr>
  <tr>
    <th>Add Card</th>
    <th><code>/decks/:deckId/cards/new</code></th>
    <th>Allows the user to add a new card to an existing deck</th>
  </tr>
  <tr>
    <th>Edit Card</th>
    <th><code>/decks/:deckId/cards/:cardId/edit</code></th>
    <th>Allows the user to modify information on an existing card</th>
  </tr>
</table>
</p>
<p>All of the screens above will work on two common datasets. The datasets are related, and at times, you will need to work with both datasets to get the screens to work properly.</p>
<p>You can create the screens in any order and are encouraged to organize your code using the grouping-by-route technique you learned earlier.</p>
<p>While working on this project, you <i>should</i>:
<ul>
  <li>Use well-named variables.</li>
  <li>Build small, single-responsibility components and functions.</li>
  <li>Display a "Not found" message if the user visits a URL that does not exist.</li>
  <li>Edit only files inside of the <code>public/src/</code> directory.</li>
</ul>
</p>
<p>While working on this project, you <i>should</i> not:
<ul>
  <li>Change the names of the API functions.</li>
  <li>Edit any of the files outside of the <code>public/src/</code> directory.</li>
  <li>Change the location of any of the existing files.</li>
</ul>
</p>
<h3>API</h3>
<p>There are two datasets that are a part of this project: <code>decks</code> and <code>cards</code>.</p>
<p>You can view all the data inside of the <code>data/db.json</code> file. Each data set can be accessed via a named property in this file.</p>
<h5>Decks</h4>
<p>A Deck represents a collection of flashcards, or simply <i>cards</i>.</p>
<h5>Cards</h4>
<p>Each card represents a flashcard with a <i>front</i> , where the question is displayed, and a <i>back</i>i>, where the answer can be found. A card also contains the <i>deckId</i>i>, which matches the card to the deck that the card belongs to.</p>
<h3>Utility functions</h3>
<p>There are several utility functions exported from <code>src/utils/api/index.js</code>code> that allow you to perform create, read, update, and delete operations with the API server. You will need to select and use the appropriate functions in your React components.</p>
<p>Note that the <code>updateDeck()</code>, <code>readDeck()</code>, and <code>listDecks()</code> functions call the API server using URLs that include a query string of <code>_embed=cards</code>. The results of the API calls for these functions will contain both the deck and the cards associated with the deck, so you won't have to make additional API calls to load the cards for each deck when you use these functions.</p>
<p>Please read the documentation in the file for more information.</p>
<h3>Screens</h3>
<p>You are tasked with creating the following screens that work with the above datasets.</p>
<h4>Home</h4>
<p>The Home screen is the first page the user sees. It is displayed at <code>/</code>.</p>
<p>The Home screen has the following features:</p>
<p>
<ul>
  <li>The path to this screen should be <code>/</code>.</li>
  <li>A <b>Create Deck</b> button is shown, and clicking it brings the user to the Create Deck screen.</li>
  <li>Existing decks are each shown with the deck name, the number of cards, and a <b>Study</b>, <b>View</b>, and <b>Delete</b> button.</li>
  <li>Clicking the <b>Study</b> button brings the user to the Study screen.</li>
  <li>Clicking the <b>View</b> button brings the user to the Deck screen.</li>
  <li>Clicking the <b>Delete</b> button shows a warning message before deleting the deck.</li>
</ul>
</p>
<h5>Delete Deck prompt</h5>
<p>When the user clicks the <b>Delete</b> button, a warning message is shown and the user can click <b>OK</b> or <b>Cancel</b>. If the user clicks <b>OK</b>, the deck is deleted and the deleted deck is no longer visible on the Home screen.</p>
<p>You can use <a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/confirm">window.confirm()</a> to create the modal dialog.</p>
<h4>Study</h4>
<p>The Study screen is displayed at <code>/decks/:deckId/study</code>.</p>
<p>The Study screen has the following features:</p>
<p>
<ul>
  <li>The path to this screen should include the deckId (i.e., <code>/decks/:deckId/study</code>).</li>
  <li>You must use the <code>readDeck()</code> function from <code>src/utils/api/index.js</code> to load the deck that is being studied.</li>
  <li>There is a breadcrumb navigation bar with links to home <code>/</code>, followed by the name of the deck being studied, and finally the text <code>Study</code> (e.g., <code>Home/Rendering In React/Study</code>).</li>
  <li>The deck title (i.e., "Study: Rendering in React" ) is shown on the screen.</li>
  <li>Cards are shown one at a time, front-side first.</li>
  <li>A button at the bottom of each card "flips" it to the other side.</li>
  <li>After flipping the card, the screen shows a <b>Next</b> button (see the <b>Next</b> button section below) to continue to the next card.</li>
  <li>After the final card in the deck has been shown, a message (see the <b>Restart prompt</b> section below) is shown offering the user the opportunity to restart the deck.</li>
  <ul>
    <li>If the user does not restart the deck, they should return to the home screen.</li>
  </ul>
  <li>Studying a deck with two or fewer cards should display a "Not enough cards" message (see the "Not enough cards" section below) and a button to add cards to the deck.</li>
</ul>
</p>
<h5>Next button</h5>
<p>The <b>Next</b> button appears after the card is flipped.</p>
<h5>Restart prompt</h5>
<p>When all cards are finished, a message is shown and the user is offered the opportunity to restart the deck. If the user does not restart the deck, they return to the home screen.</p>
<p>You can use <a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/confirm">window.confirm()</a> to create the modal dialog.</p>
<h5>Not enough cards</h5>
<p>Studying a Deck with two or fewer cards should display a "Not enough cards" message and a button to add cards to the deck.</p>
<p>Clicking the <b>Add Cards</b> button should take the user to the Add Card screen.</p>
<h4>Create Deck</h4>
<p>The Home screen has a <b>Create Deck</b> button that brings the user to the Create Deck screen.</p>
<p>The Create Deck screen has the following features:</p>
<p>
<ul>
  <li>The path to this screen should be <code>/decks/new</code>.</li>
  <li>There is a breadcrumb navigation bar with a link to home <code>/</code> followed by the text <code>Create Deck</code> (i.e., <code>Home/Create Deck</code>).</li>
  <li>A form is shown with the appropriate fields for creating a new deck.</li>
  <ul>
    <li>The <code>name</code> field is an <code>&lt;input&gt;</code> field of type <code>text</code>.</li>
    <li>The <code>description</code> field is a <code><textarea></code> field that can be multiple lines of text.</li>
  </ul>
  <li>If the user clicks <b>Submit</b>, the user is taken to the Deck screen.</li>
  <li>If the user clicks <b>Cancel</b>, the user is taken to the Home screen.</li>
</ul>
</p>
<h4>Deck</h4>
<p>The Deck screen displays all of the information about a deck.</p>
<p>The Deck screen has the following features:</p>
<p>
<ul>
    <li>The path to this screen should include the <i>deckId</i> (i.e., <code>/decks/:deckId</code>).</li>
    <li>You must use the <code>readDeck()</code> function from <code>src/utils/api/index.js</code> to load the existing deck.</li>
    <li>There is a breadcrumb navigation bar with a link to home <code>/</code> followed by the name of the deck (e.g., <code>Home/React Router</code>).</li>
    <li>The screen includes the deck name (e.g., "React Router") and deck description (e.g., "React Router is a collection of navigational components that compose declaratively in your application").</li>
    <li>The screen includes <b>Edit</b>, <b>Study</b>, <b>Add Cards</b>, and <b>Delete</b> buttons. Each button takes the user to a different destination</li>
    <li>Each card in the deck:</li>
      <ul>
        <li>Is listed on the page under the "Cards" heading.</li>
        <li>Shows a question and the answer to the question.</li>
        <li>Has an <b>Edit</b> button that takes the user to the Edit Card screen when clicked.</li>
        <li>Has a <b>Delete</b> button that allows that card to be deleted.</li>
      </ul>
</ul>
</p>
<h5>Delete Card Prompt</h5>
<p>When the user clicks the <b>Delete</b> button associated with a card, a warning message is shown and the user can click <b>OK</b> or <b>Cancel</b>. If the user clicks <b>OK</b>, the card is deleted.
<p>You can use <a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/confirm">window.confirm()</a> to create the modal dialog.
<h4>Edit Deck</h4>
<p>The Edit Deck screen allows the user to modify information on an existing deck.</p>
<p>The Edit Deck screen has the following features:</p>
<p>
<ul>
  <li>The path to this screen should include the <i>deckId</i> (i.e., <code>/decks/:deckId/edit</code>).</li>
  <li>You must use the <code>readDeck()</code> function from <code>src/utils/api/index.js</code> to load the existing deck.</li>
  <li>There is a breadcrumb navigation bar with a link to home <code>/</code>, followed by the name of the deck being edited, and finally the text <code>Edit Deck</code> (e.g., <code>Home/Rendering in React/Edit Deck</code>).</li>
  <li>It displays the same form as the Create Deck screen, except it is prefilled with information for the existing deck.</li>
  <li>The user can edit and update the form.</li>
  <li>If the user clicks <b>Cancel</b>, the user is taken to the Deck screen.</li>
</ul>
</p>
<h4>Add Card</h4>
<p>The Add Card screen allows the user to add a new card to an existing deck.</p>
<p>The Add Card screen has the following features:</p>
<p>
<ul>
  <li>The path to this screen should include the <i>deckId</i> (i.e., <code>/decks/:deckId/cards/new</code>).</li>
  <li>You must use the <code>readDeck()</code> function from <code>src/utils/api/index.js</code> to load the deck that you're adding the card to.</li>
  <li>There is a breadcrumb navigation bar with a link to home <code>/</code>, followed by the name of the deck to which the cards are being added, and finally the text <code>Add Card</code> (e.g., <code>Home/React Router/Add Card</code>).</li>
  <li>The screen displays the <i>React Router: Add Card</i> deck title.</li>
  <li>A form is shown with the "front" and "back" fields for a new card. Both fields use a <code><textarea></code> tag that can accommodate multiple lines of text.</li>
  <li>If the user clicks <b>Save</b>, a new card is created and associated with the relevant deck. Then the form is cleared and the process for adding a card is restarted.</li>
  <li>If the user clicks <b>Done</b>, the user is taken to the Deck screen.</li>
</ul>
</p>
<h4>Edit Card</h4>
<p>The Edit Card screen allows the user to modify information on an existing card.</p>
<p>The Edit Card screen has the following features:</p>
<p>
<ul>
  <li>The path to this screen should include the <i>deckId</i> and the <i>cardId</i> (i.e., <code>/decks/:deckId/cards/:cardId/edit</code>).</li>
  <li>You must use the <code>readDeck()</code> function from <code>src/utils/api/index.js</code> to load the deck that contains the card to be edited. Additionally, you must use the <code>readCard()</code> function from <code>src/utils/api/index.js</code> to load the card that you want to edit.</li>
  <li>There is a breadcrumb navigation bar with a link to home <code>/</code>, followed by the name of the deck of which the edited card is a member, and finally the text <code>Edit Card :cardId</code> (e.g., <code>Home/Deck React Router/Edit Card 4</code>).</li>
  <li>It displays the same form as the Add Card screen, except it is prefilled with information for the existing card. It can be edited and updated.</li>
  <li>If the user clicks on either <b>Save</b> or <b>Cancel</b>, the user is taken to the Deck screen.</li>
</ul>
</p>
