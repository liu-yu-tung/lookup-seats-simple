// Declare a variable to store the fetched data
let cachedSeatsData = null;

function showInitialState() {
    document.getElementById("status").textContent = "請輸入票根影廳及座位";
    document.getElementById("newAudi").textContent = "-";
    document.getElementById("newSeat").textContent = "-";
}

async function fetchJSONData() {
    return fetch("./seats.json")
        .then((res) => {
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res.json();
        })
        .then((data) => {
            console.log("fetch complete");
            return data;
        })
        .catch((error) => {
            console.error("Unable to fetch data:", error);
        });
}

function setText(seats, oldAudi, oldSeat) {
    console.log("setText called");
    const value = seats[`${oldAudi}`] && seats[`${oldAudi}`][`${oldSeat}`];
    if (value !== undefined) {
        console.log("correct audi and seat");
        document.getElementById("status").textContent = "查詢成功";
        if (value["newAudi"] == "") {
            document.getElementById("newAudi").textContent = value["newSeat"];
            document.getElementById("newSeat").textContent = value["newSeat"];
        } else {
            document.getElementById("newAudi").textContent = JSON.stringify(value["newAudi"]).substring(1).slice(0, -1) + " 廳";
            document.getElementById("newSeat").textContent = JSON.stringify(value["newSeat"]).substring(1).slice(0, -1);
        }
    }
}

async function displayValue() {
    console.log("button clicked");
    const oldAudi = document.getElementById("oldAudi").value;
    const oldSeat = document.getElementById("oldSeat").value;

    if (oldAudi && oldSeat) {
        // Check if the data is already cached
        if (!cachedSeatsData) {
            cachedSeatsData = await fetchJSONData();
        }
        setText(cachedSeatsData, oldAudi, oldSeat);
    } else {
        console.log("wrong audi or seat");
        document.getElementById("status").textContent = "輸入不完整或原座位輸入錯誤";
        document.getElementById("newAudi").textContent = "-";
        document.getElementById("newSeat").textContent = "-";
    }
}