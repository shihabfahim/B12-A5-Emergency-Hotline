let callHistory = [];

function historyTracker() {
  const historyMenu = document.querySelector(`#HistoryBox`);
  historyMenu.innerHTML = ``;
  for (let i = callHistory.length - 1; i >= 0; i--) {
    const history = document.createElement(`div`);
    history.innerHTML = `
      <div
        class="bg-[#fafafa] p-3 mb-3 rounded-xl flex justify-between items-center"
      >
        <div>
          <h1 class="text-[13px] sm:text-[15px]">${callHistory[i].name}</h1>
          <h3 class="text-[13px] sm:text-[15px]">${callHistory[i].number}</h3>
        </div>
        <p class="text-[13px] sm:text-[15px]">${callHistory[i].time}</p>
      </div>
    `;
    historyMenu.appendChild(history);
  }
}

document.querySelector(`#ClearHistory`).addEventListener(`click`, function () {
  callHistory = [];
  historyTracker();
  const historyMenu = document.querySelector(`#HistoryBox`);
  historyMenu.innerHTML = `
  <p class="text-center text-[13px] sm:text-[15px]">
    No call history yet
  </p>
  `;
});

document
  .querySelector(`#ServiceContainer`)
  .addEventListener(`click`, function (event) {
    if (event.target.classList.contains(`HeartIcon`)) {
      const currentHeart = document.querySelector(`#HeartCount`);
      currentHeart.innerText = Number(currentHeart.innerText) + 1;
    }
    if (
      event.target.classList.contains(`CopyButton`) ||
      event.target.classList.contains(`CopyButtonIcon`)
    ) {
      const currentCopy = document.querySelector(`#CopyCount`);
      currentCopy.innerText = Number(currentCopy.innerText) + 1;
      let number;
      if (event.target.classList.contains(`CopyButtonIcon`)) {
        number =
          event.target.parentElement.parentElement.parentElement.childNodes[7]
            .innerText;
      }
      if (event.target.classList.contains(`CopyButton`)) {
        number =
          event.target.parentElement.parentElement.childNodes[7].innerText;
      }
      navigator.clipboard.writeText(number);
      alert(`Text copied to clipboard!`);
    }
    if (
      event.target.classList.contains(`CallButton`) ||
      event.target.classList.contains(`CallButtonIcon`)
    ) {
      const currentCoin = document.querySelector(`#CoinCount`);
      if (currentCoin.innerText < 20) {
        alert(`Insufficient coins! You need at least 20 coins to make a call.`);
      } else {
        currentCoin.innerText = Number(currentCoin.innerText) - 20;
        let service, number;
        if (event.target.classList.contains(`CallButtonIcon`)) {
          service =
            event.target.parentElement.parentElement.parentElement.childNodes[3]
              .innerText;
          number =
            event.target.parentElement.parentElement.parentElement.childNodes[7]
              .innerText;
        }
        if (event.target.classList.contains(`CallButton`)) {
          service =
            event.target.parentElement.parentElement.childNodes[3].innerText;
          number =
            event.target.parentElement.parentElement.childNodes[7].innerText;
        }
        alert(`📞 Calling ${service} at ${number}`);
        callHistory.push({
          name: service,
          number: number,
          time: new Date()
            .toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })
            .toUpperCase(),
        });
        historyTracker();
      }
    }
  });