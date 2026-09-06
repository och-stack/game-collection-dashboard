// Import React state
import { useState } from "react";
// Import CSS styles
import "./App.css";
// GAME CARD
// Create a component to display one game
function GameCard({ game }) {
  // Return the game card
  return (
    <div className="col-12 mb-4">
      <div className="card shadow-sm">
        <div className="row g-0">
          <div className="col-3">
            {/* Display the game image */}
            <img
              src={game.image}
              className="img-fluid w-100 h-100"
              alt={game.name}
            />
          </div>
          <div className="col-7">
            <div className="card-body">
              {/* Display the game name */}
              <h3 className="h5 fw-bold">{game.name}</h3>
              {/* Display the game category */}
              <p className="text-secondary">{game.category}</p>
              {/* Display the game rating */}
              <p>⭐ {game.rating}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
// CATEGORY LIST
// Create a component to display category buttons
function CategoryList({ selectedCategory, setSelectedCategory }) {
  // Create a list of game categories
  const categories = ["All", "Brain", "Speed", "Leisure"];
  // Return the category list
  return (
    <div className="card shadow-sm p-3">
      <h2 className="h4 fw-bold mb-4">Categories</h2>
      <div className="d-flex gap-2 flex-wrap">
        {/* Loop through every category */}
        {categories.map((category) => (
          <button
            key={category}
            className={
              selectedCategory === category
                ? "btn btn-dark"
                : "btn btn-outline-secondary"
            }
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
  // Store the game name, category, rating and image
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState("");
  const [image, setImage] = useState("");
  // Create the function to add a game
  function addGame(event) {
    // Stop the page from refreshing
    event.preventDefault();
    // Check if required fields are empty
    if (name === "" || category === "" || rating === "") {
      // Show an error message
      alert("Please fill in all required fields.");
      // Stop the function
      return;
    }
    // Create a new game object
    const newGame = {
      // Give the game a unique ID
      id: Date.now(),
      // Save the game name, category, rating, image
      name: name,
      category: category,
      rating: rating,
      image: image,
    };
    // Add the new game to the games list
    setGames([...games, newGame]);
    // Clear the game name, category, rating, image
    setName("");
    setCategory("");
    setRating("");
    setImage("");
  }
  // Return the add game form
  return (
    <div className="card shadow-sm p-3">
      <h2 className="h4 fw-bold mb-4">Add New Game</h2>
      {/* Submit the form using addGame */}
      <form onSubmit={addGame}>
        {/* GAME NAME */}
        <div className="row mb-3 align-items-center">
          <label className="col-4 col-form-label">Game Name</label>
          <div className="col-8">
            {/* Let the user enter the game name */}
            <input
              type="text"
              className="form-control"
              placeholder="Enter game name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
        </div>
        {/* CATEGORY */}
        <div className="row mb-3 align-items-center">
          <label className="col-4 col-form-label">Category</label>
          <div className="col-8">
            {/* Let the user select a category */}
            <select
              className="form-select"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              {/* Show the category options */}
              <option value="">Select category</option>
              <option value="Brain">Brain</option>
              <option value="Speed">Speed</option>
              <option value="Leisure">Leisure</option>
            </select>
          </div>
        </div>
        {/* IMAGE */}
        <div className="row mb-3 align-items-center">
          <label className="col-4 col-form-label">Image</label>
          <div className="col-8">
            {/* Let the user choose an image file */}
            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={(event) =>
                setImage(URL.createObjectURL(event.target.files[0]))
              }
            />
          </div>
        </div>
        {/* RATING */}
        <div className="row mb-3 align-items-center">
          <label className="col-4 col-form-label">Rating</label>
          <div className="col-8">
            {/* Let the user enter the rating */}
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
        {/* ADD BUTTON */}
        {/* Submit the form and add the game */}
        <button type="submit" className="btn btn-dark w-100">
          + Add Game
        </button>
      </form>
    </div>
  );
}
// MAIN APP
// Create the main application component
function App() {
  // Store all games in the application
  const [games, setGames] = useState([
    // Create the first game
    {
      id: 1,
      name: "Typing Speed",
      category: "Speed",
      rating: 4.5,
      image: "typingspeed.jpg",
    },
    // Create the second game
    {
      id: 2,
      name: "Snake game",
      category: "Leisure",
      rating: 4.8,
      image: "snake.png",
    },
    // Create the third game
    {
      id: 3,
      name: "Tetris",
      category: "Brain",
      rating: 4.6,
      image: "tetris.jpg",
    },
  ]);
  // Store the currently selected category
  const [selectedCategory, setSelectedCategory] = useState("All");
  // FILTER GAMES
  // Show all games or only games from the selected category
  const filteredGames =
    selectedCategory === "All"
      ? games
      : games.filter((game) => game.category === selectedCategory);
  // Return the main application
  return (
    <>
      {/* HEADER */}
      <header className="text-center mt-5 mb-4">
        {/* Display the website title */}
        <h1 className="fw-bold">Classic Replay</h1>
        {/* Display the website description */}
        <p className="text-secondary">
          Old school games for your modern laptop.
        </p>
      </header>
      {/* MAIN */}
      <main className="container-fluid px-4">
        <div className="row g-4">
          {/* LEFT - COUNT AND FILTER */}
          <aside className="col-12 col-lg-3">
            {/* GAME COUNT */}
            <div className="card shadow-sm p-3 mb-4">
              {/* Display the number of games */}
              <h2 className="fw-bold mb-0">{filteredGames.length}</h2>
              {/* Display the game count label */}
              <p className="text-secondary mb-0">Games Available</p>
            </div>
            {/* CATEGORY FILTER */}
            {/* Display the category buttons */}
            <CategoryList
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          </aside>
          {/* MIDDLE - GAME CARDS */}
          <section className="col-8 col-lg-6">
            {/* GAME CARDS */}
            <div className="row">
              {/* Loop through the filtered games */}
              {filteredGames.map((game) => (
                <GameCard
                  key={game.id}
                  game={game}
                />
              ))}
            </div>
          </section>
          {/* RIGHT - INPUT FORM */}
          <aside className="col-12 col-lg-3">
            {/* Display the add game form */}
            <AddGameForm
              games={games}
              setGames={setGames}
            />
          </aside>
        </div>
      </main>
    </>
  );
}
// Export App so React can use it
export default App;