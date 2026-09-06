// Import useState so we can store changing data
import { useState } from "react";

// Import the CSS file for this app
import "./App.css";

// GAME CARD
// Create a component that displays one game
function GameCard({ game }) {
  // Return the HTML structure for one game
  return (
    /* Create the outer Bootstrap column */
    <div className="col-12 mb-4">
      {/* Create the game card */}
      <div className="card shadow-sm">
        {/* Create a Bootstrap row */}
        <div className="row g-0">
          {/* Create the column for the game image */}
          <div className="col-3">
            {/* Display the game image */}
            <img src={game.image} className="img-fluid w-100 h-100" alt={game.name} />
          </div>

          {/* Create the column for game information */}
          <div className="col-9">
            {/* Create the card content area */}
            <div className="card-body">
              {/* Display the game name */}
              <h3 className="h5 fw-bold">{game.name}</h3>

              {/* Display the game category */}
              <p className="text-secondary">{game.category}</p>

              {/* Display the game description */}
              <p>{game.description}</p>

              {/* Display the game rating */}
              <p>⭐ {game.rating}</p>

              {/* Display the game URL as a hyperlink */}
              <a href={game.url} target="_blank">
                link
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// CATEGORY LIST
// Create a component for the category buttons
function CategoryList({ selectedCategory, setSelectedCategory }) {
  // Create the list of available categories
  const categories = ["All", "Brain", "Speed", "Leisure"];

  // Return the category section
  return (
    /* Create the category card */
    <div className="card shadow-sm p-3">
      {/* Display the category title */}
      <h2 className="h4 fw-bold mb-4">Categories</h2>

      {/* Create a flexible container for the buttons */}
      <div className="d-flex gap-2 flex-wrap">
        {/* Go through every category and create a button */}
        {categories.map((category) => (
          /* Create one button for each category */
          <button
            /* Give each button a unique key */
            key={category}

            /* Change the button style depending on the selected category */
            className={selectedCategory === category ? "btn btn-dark" : "btn btn-outline-secondary"}

            /* Change the selected category when the button is clicked */
            onClick={() => setSelectedCategory(category)}
          >
            {/* Display the category name */}
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}

// ADD GAME FORM
// Create a component for adding a new game
function AddGameForm({ games, setGames }) {
  // Store the game name entered by the user
  const [name, setName] = useState("");

  // Store the game description entered by the user
  const [description, setDescription] = useState("");

  // Store the selected category
  const [category, setCategory] = useState("");

  // Store the rating entered by the user
  const [rating, setRating] = useState("");

  // Store the uploaded image URL
  const [image, setImage] = useState("");

  // Store the game website URL
  const [url, setUrl] = useState("");

  // Create a function that runs when the form is submitted
  function addGame(event) {
    // Stop the browser from refreshing the page
    event.preventDefault();

    // Check if any required field is empty
    if (name === "" || description === "" || category === "" || rating === "" || url === "") {
      // Show an error message
      alert("Please fill in all required fields.");

      // Stop the function
      return;
    }

    // Create a new game object using the form information
    const newGame = {
      // Give the game a unique ID
      id: Date.now(),

      // Store the game name
      name: name,

      // Store the game description
      description: description,

      // Store the game category
      category: category,

      // Store the game rating
      rating: rating,

      // Store the game image
      image: image,

      // Store the game website URL
      url: url
    };

    // Add the new game to the existing games array
    setGames([...games, newGame]);

    // Clear the game name input
    setName("");

    // Clear the description input
    setDescription("");

    // Clear the category input
    setCategory("");

    // Clear the rating input
    setRating("");

    // Clear the image input state
    setImage("");

    // Clear the URL input
    setUrl("");
  }

  // Return the add game form
  return (
    /* Create the form card */
    <div className="card shadow-sm p-3">
      {/* Display the form title */}
      <h2 className="h4 fw-bold mb-4">Add New Game</h2>

      {/* Create the form and run addGame when submitted */}
      <form onSubmit={addGame}>
        {/* Create the game name row */}
        <div className="row mb-3">
          {/* Display the game name label */}
          <label className="col-4 col-form-label">Game Name</label>

          {/* Create the input column */}
          <div className="col-8">
            {/* Create the game name input */}
            <input
              type="text"
              className="form-control"
              placeholder="Enter game name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
        </div>

        {/* Create the description row */}
        <div className="row mb-3">
          {/* Display the description label */}
          <label className="col-4 col-form-label">Description</label>

          {/* Create the input column */}
          <div className="col-8">
            {/* Create the description textarea */}
            <textarea
              className="form-control"
              placeholder="Enter game description"
              rows="3"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            ></textarea>
          </div>
        </div>

        {/* Create the category row */}
        <div className="row mb-3">
          {/* Display the category label */}
          <label className="col-4 col-form-label">Category</label>

          {/* Create the select column */}
          <div className="col-8">
            {/* Create the category dropdown */}
            <select
              className="form-select"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              {/* Create the default option */}
              <option value="">Select category</option>

              {/* Create the Brain option */}
              <option value="Brain">Brain</option>

              {/* Create the Speed option */}
              <option value="Speed">Speed</option>

              {/* Create the Leisure option */}
              <option value="Leisure">Leisure</option>
            </select>
          </div>
        </div>

        {/* Create the image row */}
        <div className="row mb-3">
          {/* Display the image label */}
          <label className="col-4 col-form-label">Image</label>

          {/* Create the input column */}
          <div className="col-8">
            {/* Create the image upload input */}
            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={(event) => setImage(event.target.value)}
            />
          </div>
        </div>

        {/* Create the rating row */}
        <div className="row mb-3">
          {/* Display the rating label */}
          <label className="col-4 col-form-label">Rating</label>

          {/* Create the input column */}
          <div className="col-8">
            {/* Create the rating input */}
            <input
              type="number"
              className="form-control"
              min="1"
              max="5"
              step="0.1"
              placeholder="1 - 5"
              value={rating}
              onChange={(event) => setRating(event.target.value)}
            />
          </div>
        </div>

        {/* Create the game URL row */}
        <div className="row mb-3">
          {/* Display the URL label */}
          <label className="col-4 col-form-label">Game URL</label>

          {/* Create the input column */}
          <div className="col-8">
            {/* Create the URL input */}
            <input
              type="url"
              className="form-control"
              placeholder="https://example.com"
              value={url}
              onChange={(event) => setUrl(event.target.value)}
            />
          </div>
        </div>

        {/* Create the submit button */}
        <button type="submit" className="btn btn-dark w-100">
          + Add Game
        </button>
      </form>
    </div>
  );
}

// MAIN APP
// Create the main App component
function App() {
  // Create the games state and store the initial games
  const [games, setGames] = useState([
    // Create the first game
    {
      id: 1,
      name: "Typing Speed",
      description: "Test how quickly and accurately you can type.",
      category: "Speed",
      rating: 4.5,
      image: "typingspeed.jpg",
      url: "https://play.typeracer.com/"
    },

    // Create the second game
    {
      id: 2,
      name: "Snake game",
      description: "Control the snake, collect food and grow as long as possible.",
      category: "Leisure",
      rating: 4.8,
      image: "snake.png",
      url: "https://playsnake.org/"
    },

    // Create the third game
    {
      id: 3,
      name: "Tetris",
      description: "Arrange falling blocks to create complete lines and score points.",
      category: "Brain",
      rating: 4.6,
      image: "tetris.jpg",
      url: "https://play.tetris.com/"
    }
  ]);

  // Store the category currently selected by the user
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Show all games when All is selected
  // Otherwise show only games matching the selected category
  const filteredGames = selectedCategory === "All"
    ? games
    : games.filter((game) => game.category === selectedCategory);

  // Return the main application layout
  return (
    <>
      {/* Create the page header */}
      <header className="text-center mt-5 mb-4">
        {/* Display the website title */}
        <h1 className="fw-bold">Classic Replay</h1>

        {/* Display the website description */}
        <p className="text-secondary">Old school games for your modern laptop.</p>
      </header>

      {/* Create the main Bootstrap container */}
      <main className="container-fluid px-4">
        {/* Create the main row */}
        <div className="row g-4">

          {/* Create the left sidebar */}
          <aside className="col-12 col-lg-3">

            {/* Display the number of available games */}
            <div className="card shadow-sm p-3 mb-4">
              {/* Display the number of filtered games */}
              <h2 className="fw-bold mb-0">{filteredGames.length}</h2>

              {/* Display the text */}
              <p className="text-secondary mb-0">Games Available</p>
            </div>

            {/* Display the category component */}
            <CategoryList
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          </aside>

          {/* Create the middle section for games */}
          <section className="col-8 col-lg-6">

            {/* Create a row for the game cards */}
            <div className="row">

              {/* Go through the filtered games */}
              {/* Create one GameCard for every game */}
              {filteredGames.map((game) => (
                /* Send the game information to GameCard */
                <GameCard key={game.id} game={game} />
              ))}

            </div>
          </section>

          {/* Create the right sidebar */}
          <aside className="col-12 col-lg-3">

            {/* Display the Add Game Form */}
            <AddGameForm games={games} setGames={setGames} />

          </aside>
        </div>
      </main>
    </>
  );
}

// Export App so main.jsx can use it
export default App;