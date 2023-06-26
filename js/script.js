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

let dragStartIndex;

createList();

function createList() {
    mostPopularAnimes
        .map((anime) => ({ value: anime, sort: Math.random() }))
        .sort((a, b) => {
            return a.sort - b.sort;
        })
        .map((anime) => anime.value)
        .forEach((anime, i) => {
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

    addEventListeners();
}

function dragStart() {
    dragStartIndex = +this.closest("li").getAttribute("data-index");
    console.log(dragStartIndex);
}

function dragEnter() {
    this.classList.add("over");
}

function dragLeave() {
    this.classList.remove("over");
}

function dragDrop() {
    this.classList.remove("over");
    const dragEndIndex = this.getAttribute("data-index");
    swapItems(dragStartIndex, dragEndIndex);
}

function swapItems(dragStartIndex, dragEndIndex) {
    listItems.forEach((listItem) => {
        listItem.classList.remove("wrong");
    });
    const firstItem = listItems[dragStartIndex].querySelector(
        ".list-item__draggable"
    );
    const secondItem = listItems[dragEndIndex].querySelector(
        ".list-item__draggable"
    );

    listItems[dragStartIndex].appendChild(secondItem);
    listItems[dragEndIndex].appendChild(firstItem);
}

function addEventListeners() {
    const draggableItems = document.querySelectorAll(".list-item");
    const draggableZones = document.querySelectorAll(".list-item__draggable");

    draggableZones.forEach((draggableZone) => {
        draggableZone.addEventListener("dragstart", dragStart);
    });

    draggableItems.forEach((draggbleItem) => {
        draggbleItem.addEventListener("dragover", (e) => {
            e.preventDefault();
        });

        draggbleItem.addEventListener("dragenter", dragEnter);
        draggbleItem.addEventListener("dragleave", dragLeave);
        draggbleItem.addEventListener("drop", dragDrop);
    });
}

checkBtn.addEventListener("click", () => {
    listItems.forEach((listItem, i) => {
        const animeName = listItem.querySelector(
            ".list-item__draggable"
        ).innerText;

        if (animeName === mostPopularAnimes[i]) {
            listItem.classList.remove("wrong");
            listItem.classList.add("correct");
        } else {
            listItem.classList.add("wrong");
        }
    });
});
