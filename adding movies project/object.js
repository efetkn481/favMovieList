const firstUserInput = document.querySelector(".first-user-input-box");
const secondUserInput = document.querySelector(".second-user-input-box");
const thirdUserInput = document.querySelector(".third-user-input-box");
const suggestionList = document.querySelector(".suggestions-list");
const addMovieButton = document.querySelector(".add-movie-button");
const listContainer = document.querySelector(".list-container");
const userInputList = document.querySelector(".user-input-list");

const moviesArray = [];

const addMovieHandler = () => {
  //adding an item
  const movieTitle = firstUserInput.value.trim();
  const movieRating = secondUserInput.value;

  if (
    (movieTitle !== "") &
    (movieRating !== "") &
    (movieRating <= 5) &
    (movieRating >= 0)
  ) {
    let newListItem = document.createElement("li");
    newListItem.textContent = `${movieTitle} ${movieRating} / 5`;
    userInputList.appendChild(newListItem);
    moviesArray.push(movieTitle);

    //removing an item
    const removeFromList = document.createElement("button");
    removeFromList.textContent = " X";
    removeFromList.classList.add("remove-from-list-button");
    newListItem.appendChild(removeFromList);
    removeFromList.addEventListener("click", () => {
      userInputList.removeChild(newListItem);
      moviesArray.pop(newListItem);
      visibilityCheck();
    });

    //showing the box if there is any item in it or making it invisible if there isn't any.
    firstUserInput.value = "";
    secondUserInput.value = "";
    listContainer.style.visibility = "visible";
  } else {
    alert("Please enter a valid title and rating.");
  }

  function visibilityCheck() {
    if (userInputList.childElementCount === 0) {
      listContainer.style.visibility = "hidden";
    }
  }
};

const searchMovieHandler = () => {
  const searchText = thirdUserInput.value;
  if (searchText !== "") {
    const filteredMovies = getFilteredMovies(searchText);
    displayFilteredSuggestions(filteredMovies);
  } else {
    suggestionList.innerHTML = "";
  }
};

const displayFilteredSuggestions = (suggestedMovie) => {
  suggestionList.innerHTML = "";
  suggestedMovie.forEach((movie) => {
    const filteredListItem = document.createElement("li");
    filteredListItem.textContent = movie;
    suggestionList.appendChild(filteredListItem);
  });
};

const getFilteredMovies = (query) => {
  console.log(moviesArray);
  return moviesArray.filter((movie) => movie.includes(query));
};

addMovieButton.addEventListener("click", addMovieHandler);
thirdUserInput.addEventListener("input", searchMovieHandler);
