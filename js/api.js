const getApiData = getData => {
  const getInputField = document.getElementById('search-field');
  
    const  getDataValue = getInputField.value;
    const url = `https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${getDataValue}`
    fetch(url)
    .then(res => res.json())
    .then(output => displayData(output.player))
}
const displayData = data => {
    const getCardBody = document.getElementById('card-body');
    data.map(info => {
        const createCard = document.createElement('div');
        createCard.innerHTML = `
        <div class="flex justify-center">
            <div class="rounded-lg shadow-lg bg-white max-w-sm">
              <a href="#!" data-mdb-ripple="true" data-mdb-ripple-color="light">
                <img class="rounded-t-lg" src="${info.strThumb ? info.strThumb : src="img/placeholder.jpeg"}" alt=""/>
              </a>
              <div class="p-6">
                <h5 class="text-white-900 text-xl font-medium mb-2">${info.strPlayer}</h5>
                <button onclick="showDetail(${info.idPlayer})" type="button" class="inline-block px-6 py-2.5 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-400 hover:shadow-lg focus:bg-green-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out" data-bs-toggle="modal" data-bs-target="#exampleModalLong"> Show Detail </button>
              </div>
            </div>
        </div>
        `;
        getCardBody.appendChild(createCard);
    })
}
const showDetail = detail => {
  const url = `https://www.thesportsdb.com/api/v1/json/2/lookupplayer.php?id=${detail}`
  fetch(url)
  .then(res => res.json())
  .then(details => insertData(details.players))
}
const insertData = data => {
  const getModalDiv = document.getElementById('modal-body');
  const createModal = document.createElement('div');
  getModalDiv.innerHTML = '';
  createModal.innerHTML = `
  <div class="p-10">
      <img class="mt-10" src="${data[0].strThumb}" alt="">
      <p class="mt-10 text-xl font-semibold">Name: <span class="text-3xl text-green-500 font-extrabold ml-10"> ${data[0].strPlayer}</span> </p>
      <p class="mt-10 text-xl font-semibold">Players ID: <span class="text-3xl text-green-500 font-extrabold ml-10">${data[0].idPlayer}</span> </p>
      <p class="mt-10 text-xl font-semibold">Nationality: <span class="text-3xl text-green-500 font-extrabold ml-10">${data[0].strNationality}</span> </p>
      <p class="mt-10 text-xl font-semibold">Sports: <span class="text-3xl text-green-500 font-extrabold ml-10">${data[0].strSport}</span> </p>
      <p class="mt-10 text-xl font-semibold">Date of Birth: <span class="text-3xl text-green-500 font-extrabold ml-10">${data[0].dateBorn}</span> </p>
      <p class="mt-10 text-xl font-semibold">Gender: <span class="text-3xl text-green-500 font-extrabold ml-10">${data[0].strGender}</span> </p>
      <p class="mt-10 text-xl font-semibold">Height: <span class="text-3xl text-green-500 font-extrabold ml-10">${data[0].strHeight}</span> </p>
      <p class="mt-10 text-xl font-semibold">Weight: <span class="text-3xl text-green-500 font-extrabold ml-10">${data[0].strWeight ? data[0].strWeight : "N/A"}</span> </p>
  </div>
  `;
  getModalDiv.appendChild(createModal);
}