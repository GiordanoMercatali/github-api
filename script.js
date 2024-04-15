const token = '';

let searchBy = '';
let query = '';

const url = `https://api.github.com/search/`;


const selectSearchBy = document.getElementById('select');
const searchInput = document.getElementById('search');
const button = document.getElementById('searchButton');
const resultContainer = document.getElementById('showResult');

button.addEventListener('click', ()=>{
  searchBy = selectSearchBy.value;
  query = searchInput.value;
  
  axios.get(`${url}${searchBy}`, {
    headers: {
      "Authorization": `Bearer ${token}`,
      "X-GitHub-Api-Version": "2022-11-28"
    },
    params: {
      q: query
    }
  })
  .then(response => {
    resultContainer.innerHTML = ``;
    let resp = response.data.items;
    let placeholder = '';
    for(i = 0; i < resp.length; i++) {
    if(selectSearchBy.value === "users"){
      // resultContainer.innerHTML += `<div> ${resp[i].login} </div>`;
      placeholder = resp[i].login;
    } else{
    // resultContainer.innerHTML += `<div> ${resp[i].name} </div>`;
    placeholder = resp[i].name;
    }
    resultContainer.innerHTML += `<div class="card w-25 text-center"> <a href="${resp[i].html_url}"> ${placeholder} </a> </div>`;
  }
  })
  .catch(error => {
    console.error('Error fetching repositories:', error);
  });

})