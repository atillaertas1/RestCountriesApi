const button = document.getElementById("button");
const countryInput = document.getElementById("country-input");
const countryAPI = "https://restcountries.com/v3.1/name/";
let data = [];

button.addEventListener("click", (event) => {
  event.preventDefault();
  // console.log(countryInput.value);
  callCountry(countryInput.value);
});

callCountry = (country) => {
  const request = new XMLHttpRequest();

  request.open("GET", countryAPI + country);
  request.send();

  request.addEventListener("load", function () {
    // console.log(this.responseText);

    data = JSON.parse(this.responseText);
    // console.log(data);
    showCountry(data[0]);
    showNeighboringCountry(data[0]);
  });
};

showCountry = (data) => {
  console.log(data);
  console.log(data.languages);
  let html = `
              
              <div class="card" id="country-details">
      <div class="row no-gutters">
        <div class="col-md-4">
          <img src="${
            data.flags.png
          }" alt="Ülke Fotoğrafı" class="card-img card-img-left">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <div class="row">
              <div class="col-sm-6">
                <h5 class="card-title">Ülke</h5>
                <p class="card-text">${data.name.common}</p>
              </div>
              <div class="col-sm-6">
                <h5 class="card-title">Başkent</h5>
                <p class="card-text">${data.capital}</p>
              </div>
              <div class="col-sm-6">
                <h5 class="card-title">Nüfus</h5>
                <p class="card-text">${(
                  data.population / 1000000
                ).toFixed(1)} Milyon</p>
              </div>
              <div class="col-sm-6">
                <h5 class="card-title">Resmi Dil </h5>
                <p class="card-text">${Object.values(data.languages)}</p>
              </div>
              <div class="col-sm-6">
                <h5 class="card-title">Kısaltma</h5>
                <p class="card-text">${data.fifa}</p>
              </div>
              <div class="col-sm-6">
                  <h5 class="card-title">Para Birimi</h5>
                  <p class="card-text">${
                    Object.values(data.currencies)[0].name
                  } (${Object.values(data.currencies)[0].symbol})</p>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>              
              `;
  document.getElementById("country").innerHTML = html;
};