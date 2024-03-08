// Buton ve inputları çekme
const spendingInput = document.querySelector("#spending-input");
const priceInput = document.querySelector("#price-input");
const formBtn = document.querySelector(".btn");
const list = document.querySelector(".list");
const totalInfo = document.querySelector("#total-info");
const statusCheck = document.querySelector("#status-input");
const selectFilter = document.querySelector("#filter-select");

// Form butonuna tıklanınca gider ekleyen fonksiyon
formBtn.addEventListener("click", addExpense);

// Gider listesine tıklandığında işlemleri yöneten fonksiyon
list.addEventListener("click", handleClick);

// Filtre seçimi değiştiğinde işlemleri yöneten fonksiyon
selectFilter.addEventListener("change", handleFilter);

// Toplam tutarı takip eden değişken
let total = 0;

// Toplamı güncelleyen fonksiyon
function updateTotal(price) {
  total += Number(price);
  totalInfo.textContent = total;
}

// Gider ekleyen fonksiyon
function addExpense(e) {
  e.preventDefault();

  if (!priceInput.value || !spendingInput.value) {
    alert("Boş Gider Eklenemez!");
    return;
  }

  const spendingDiv = document.createElement("div");
  spendingDiv.classList.add("spending");

  if (statusCheck.checked) {
    spendingDiv.classList.add("payed");
  }

  spendingDiv.innerHTML = `
    <h2>${spendingInput.value} =</h2>
    <h2 id="value">${priceInput.value}</h2>
    <div class="buttons">
        <img id="payment" src="https://www.clipartmax.com/png/middle/77-773779_28-collection-of-wallet-clipart-png-wallet-with-money-icon-png.png" alt="">
        <img id="remove" src="https://w7.pngwing.com/pngs/127/865/png-transparent-computer-icons-rubbish-bins-waste-paper-baskets-recycling-bin-garbage-miscellaneous-text-recycling.png" alt="">
    </div>`;

  list.appendChild(spendingDiv);
  updateTotal(priceInput.value);

  spendingInput.value = "";
  priceInput.value = "";
}

// Gider listesindeki öğelere tıklanıldığında işlemleri yöneten fonksiyon
function handleClick(e) {
  const element = e.target;

  if (element.id === "remove") {
    const wrapper = element.parentElement.parentElement;
    const deletedPrice = wrapper.querySelector("#value").innerText;
    Number(deletedPrice.innerText);

    updateTotal(-Number(deletedPrice));
    wrapper.remove();
  }
}

// Filtre seçimine göre listeyi filtreleyen fonksiyon
function handleFilter(e) {
  const items = list.childNodes;

  items.forEach((item) => {
    switch (e.target.value) {
      case "all":
        item.style.display = "flex";
        break;

      case "payed":
        if (!item.classList.contains("payed")) {
          item.style.display = "none";
        } else {
          item.style.display = "flex";
        }
        break;

      case "not-payed":
        if (item.classList.contains("payed")) {
          item.style.display = "none";
        } else {
          item.style.display = "flex";
        }
        break;
    }
  });
}
