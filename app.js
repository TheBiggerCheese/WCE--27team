const players = ['Bo Allan', 'Sam Allen', 'Liam Baker', 'Harry Barnett', 'Rhett Bazzo', 'Sandy Brock', 'Tyler Brockman', 'Malakai Champion', 'Tom Cole', 'Jamie Cripps', 'Hamish Davis', 'Tyrell Dewar', 'Cooper Duff-Tytler', 'Liam Duggan', 'Willem Duursma', 'Harry Edwards', 'Matthew Flynn', 'Oliver Francou', 'Reuben Ginbey', 'Jack Graham', 'Lucca Grego', 'Tom Gross', 'Clay Hall', 'Marcus Herbert', 'Elijah Hewett', 'Brady Hough', 'Jack Hutchinson', 'Harvey Johnston', 'Tim Kelly', 'Josh Lindsay', 'Noah Long', 'Finlay Macrae', 'Ryan Maric', 'Tom McCarthy', 'Milan Murdock', 'Jacob Newton', 'Matt Owies', 'Archer Reid', 'Harley Reid', 'Deven Robertson', 'Fred Rodriguez', 'Harry Schoenberg', 'Jobe Shanahan', 'Brandon Starcevich', 'Jake Waterman', 'Bailey Williams', 'Jack Williams', 'Tylah Williams', 'Elliot Yeo', 'Tylar Young'];

const state = {
  selected: Array(23).fill(null),
  activeSlot: null
};

// Five rows of three players.
// Each row has a vertical position and three horizontal positions.
const fieldPositions = [
  [12, 33], [12, 50], [12, 67],
  [28, 33], [28, 50], [28, 67],
  [44, 33], [44, 50], [44, 67],
  [60, 33], [60, 50], [60, 67],
  [76, 33], [76, 50], [76, 67]
];

const fieldSlots = document.getElementById("fieldSlots");
const followerSlots = document.getElementById("followerSlots");
const benchSlots = document.getElementById("benchSlots");
const picker = document.getElementById("picker");
const playerSearch = document.getElementById("playerSearch");
const playerList = document.getElementById("playerList");
const closePicker = document.getElementById("closePicker");

function makeSlot(index, className, text) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = className + (state.selected[index] ? "" : " empty");
  button.textContent = state.selected[index] || text;
  button.addEventListener("click", () => openPicker(index));
  return button;
}

function render() {
  fieldSlots.innerHTML = "";
  fieldPositions.forEach((position, i) => {
    const button = makeSlot(i, "player-slot", "Select");
    button.style.left = position[1] + "%";
    button.style.top = position[0] + "%";
    fieldSlots.appendChild(button);
  });

  followerSlots.innerHTML = "";
  for (let i = 0; i < 3; i++) {
    followerSlots.appendChild(makeSlot(15 + i, "bench-slot", "Select"));
  }

  benchSlots.innerHTML = "";
  for (let i = 0; i < 5; i++) {
    benchSlots.appendChild(makeSlot(18 + i, "bench-slot", "Select"));
  }
}

function openPicker(index) {
  state.activeSlot = index;
  picker.classList.remove("hidden");
  playerSearch.value = "";
  renderPlayerList();
  setTimeout(() => playerSearch.focus(), 50);
}

function closePlayerPicker() {
  picker.classList.add("hidden");
  state.activeSlot = null;
}

function renderPlayerList() {
  const query = playerSearch.value.trim().toLowerCase();
  const currentPlayer = state.selected[state.activeSlot];

  const available = players.filter((player) => {
    const alreadyUsed = state.selected.includes(player) && player !== currentPlayer;
    const matchesSearch = player.toLowerCase().includes(query);
    return !alreadyUsed && matchesSearch;
  });

  playerList.innerHTML = "";

  if (available.length === 0) {
    playerList.innerHTML = '<div class="no-players">No players found</div>';
    return;
  }

  available.forEach((player) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "player-choice";
    button.textContent = player;
    button.addEventListener("click", () => {
      state.selected[state.activeSlot] = player;
      closePlayerPicker();
      render();
    });
    playerList.appendChild(button);
  });
}

playerSearch.addEventListener("input", renderPlayerList);
closePicker.addEventListener("click", closePlayerPicker);

picker.addEventListener("click", (event) => {
  if (event.target === picker) {
    closePlayerPicker();
  }
});

render();
