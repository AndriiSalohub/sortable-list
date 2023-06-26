const list = document.querySelector(".list");
const checkBtn = document.querySelector("#check");

const listItems = [];
const mostPopularAnimes = [
    "Fullmetal Alchemist",
    "Death Note",
    "Evangelion",
    "Bleach",
    "Spirited Away",
    "Your Name",
    "Attack on Titan",
    "Naruto",
    "One Piece",
    "Demon Slayer",
];

let dragStart;

const createList = () => {
    mostPopularAnimes.forEach((anime, i) => {
        const listItem = document.createElement("li");
        listItem.classList.add("list-item");
        listItem.setAttribute("data-index", i);

        listItem.innerHTML = `
          <span class="list-item__number">${i + 1}</span>
          <div class="list-item__draggable" draggable="true">
            <p class="list-item__draggable-person-name">${anime}</p>
            <i class="fas fa-grip-lines"></i>
          </div>
        `;

        listItems.push(listItem);
        list.append(listItem);
    });
};

createList();
