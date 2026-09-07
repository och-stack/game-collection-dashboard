// Import useState so we can store changing data
// Import useEffect to run code after the component renders or when data changes
import { useEffect, useState } from "react";
import "./App.css";

// GAME CARD
// Create a component that displays one game
function GameCard({ game }) {
  return (
    <div className="col-12 mb-4">
      <div className="card shadow-sm">
        <div className="row g-0">

          {/* Game image */}
          <div className="col-3">
            <img
              src={game.image}
              className="img-fluid w-100 h-100"
              alt={game.name}
            />
          </div>

          {/* Game information */}
          <div className="col-9 p-3">
            <h3 className="h5 fw-bold">{game.name}</h3>
            <p className="text-secondary">{game.category}</p>
            <p>{game.description}</p>
            <p>⭐ {game.rating}</p>
            <a href={game.url} target="_blank">link</a>
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
  // Store the game information entered by the user
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState("");
  const [image, setImage] = useState("");
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
      // Store the game information
      name: name,
      description: description,
      category: category,
      rating: rating,
      image: image,
      url: url
    };

    // Add the new game to the existing games array
    setGames([...games, newGame]);
    // Clear the game information
    setName("");
    setDescription("");
    setCategory("");
    setRating("");
    setImage("");
    setUrl("");
  }

  // Return the add game form
  return (
    /* Create the form card */
    <div className="card shadow-sm p-3">
      <h2 className="h4 fw-bold mb-4">Add New Game</h2>
      {/* Create the form and run addGame when submitted */}
      <form onSubmit={addGame}>
        <div className="row mb-3">
          <label className="col-4 col-form-label">Game Name</label>
          <div className="col-8">
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
          <label className="col-4 col-form-label">Description</label>
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
          <label className="col-4 col-form-label">Category</label>
          <div className="col-8">
            {/* Create the category dropdown */}
            <select
              className="form-select"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              {/* Create the default option */}
              <option value="">Select category</option>
              <option value="Brain">Brain</option>
              <option value="Speed">Speed</option>
              <option value="Leisure">Leisure</option>
            </select>
          </div>
        </div>

        {/* Create the image row */}
        <div className="row mb-3">
          <label className="col-4 col-form-label">Image</label>
          <div className="col-8">
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
          <label className="col-4 col-form-label">Rating</label>
          <div className="col-8">
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
          <label className="col-4 col-form-label">Game URL</label>
          <div className="col-8">
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
  // Set website title and favicon
  useEffect(() => {
    document.title = "Loading Room";

    const favicon = document.createElement("link");
    favicon.rel = "icon";
    favicon.href = "/favicon.png";
    document.head.appendChild(favicon);
  }, []);

  // Create the games state and store the initial games
  const [games, setGames] = useState([
    // Create the first game
    {
      id: 1,
      name: "Typing Speed",
      description: "Test how quickly and accurately you can type.",
      category: "Speed",
      rating: 4.5,
      image: "/typingspeed.jpg",
      url: "https://play.typeracer.com/"
    },

    // Create the second game
    {
      id: 2,
      name: "Snake game",
      description: "Control the snake, collect food and grow as long as possible.",
      category: "Leisure",
      rating: 4.8,
      image: "/snake.png",
      url: "https://playsnake.org/"
    },

    // Create the third game
    {
      id: 3,
      name: "Tetris",
      description: "Arrange falling blocks to create complete lines and score points.",
      category: "Brain",
      rating: 4.6,
      image: "/tetris.jpg",
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
      <header className="text-center mt-5 mb-4">
        <img src="/favi.png" alt="favicon" />
        <h1 className="fw-bold">Loading Room</h1>
        <p className="text-secondary">Your next game is loading.</p>
      </header>

      {/* Create the main Bootstrap container */}
      <main className="container-fluid px-4">
        <div className="row g-4">
          {/* Create the left sidebar */}
          <aside className="col-12 col-lg-3">

            {/* Display the number of available games */}
            <div className="card shadow-sm p-3 mb-4">
              {/* Display the number of filtered games */}
              <h2 className="fw-bold mb-0">{filteredGames.length}</h2>
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