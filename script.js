const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");
let ticketPrice = +movieSelect.value;

populateUI();

function saveMovieData(index, price) {
    localStorage.setItem('selectedMovieIndex', index);
    localStorage.setItem('selectedMoviePrice', price);
}

function updateSelectedCount() {
    const selectedSeat = document.querySelectorAll(".row .seat.selected");
    const seatsIndex = [...selectedSeat].map(function (seat) {
        return [...seats].indexOf(seat);
    });
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
    const selectedSeatCount = selectedSeat.length;
    count.innerText = selectedSeatCount;
    if (localStorage.getItem("selectedMoviePrice") === null) {
        total.innerText = selectedSeatCount * ticketPrice;
    } else {
        total.innerText = selectedSeatCount * localStorage.getItem("selectedMoviePrice");
    }
}

function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add("selected");
            }
        })
    }
    const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
    const selectedMoviePrice = localStorage.getItem("selectedMoviePrice");
    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
        //movieSelect.value = selectedMoviePrice;
        //updateSelectedCount();
    }
}

movieSelect.addEventListener("change", e => {
    ticketPrice = e.target.value;
    saveMovieData(e.target.selectedIndex, ticketPrice);
    updateSelectedCount();
})

container.addEventListener("click", e => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains("occupied")) {
        e.target.classList.toggle("selected");
        updateSelectedCount();
    }
});

updateSelectedCount();