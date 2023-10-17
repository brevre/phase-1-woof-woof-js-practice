document.addEventListener("DOMContentLoaded", () => {
    const dogBar = document.getElementById("dog-bar");
    const dogInfo = document.getElementById("dog-info");
    const goodDogFilter = document.getElementById("good-dog-filter");
    let filterOn = false;
    
    // Step 2: Fetch and add pups to the dog bar
    function fetchPups() {
      fetch("http://localhost:3000/pups")
        .then((response) => response.json())
        .then((data) => {
          data.forEach((pup) => addPupToDogBar(pup));
        });
    }
  
    function addPupToDogBar(pup) {
      const span = document.createElement("span");
      span.textContent = pup.name;
      span.addEventListener("click", () => showPupInfo(pup));
      dogBar.appendChild(span);
    }
  
    // Step 3: Show more info about each pup
    function showPupInfo(pup) {
      dogInfo.innerHTML = `
        <img src="${pup.image}" />
        <h2>${pup.name}</h2>
        <button>${pup.isGoodDog ? "Good Dog!" : "Bad Dog!"}</button>
      `;
      const dogButton = dogInfo.querySelector("button");
      dogButton.addEventListener("click", () => toggleGoodness(pup));
    }
  
    // Step 4: Toggle good dog status
    function toggleGoodness(pup) {
      pup.isGoodDog = !pup.isGoodDog;
      updatePupStatus(pup);
    }
  
    function updatePupStatus(pup) {
      fetch(`http://localhost:3000/pups/${pup.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ isGoodDog: pup.isGoodDog }),
      })
        .then((response) => response.json())
        .then((data) => {
          showPupInfo(data);
          updateDogBar();
        });
    }
  
    function updateDogBar() {
      dogBar.innerHTML = "";
      fetchPups();
    }
  
    // BONUS: Step 5 - Filter Good Dogs
    goodDogFilter.addEventListener("click", () => {
      filterOn = !filterOn;
      goodDogFilter.textContent = filterOn ? "Filter good dogs: ON" : "Filter good dogs: OFF";
      updateDogBar();
    });
  
    // Initial fetch
    fetchPups();
  });
  