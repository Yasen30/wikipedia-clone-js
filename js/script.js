// load data function
const loadData = async () => {
  //set const four items
  const searchInput = document.getElementById("search-input");
  const spinerSection = document.getElementById("spiner-section");
  const searchResultSection = document.getElementById("search-result");
  const notFoundMessage = document.getElementById("not-found-message");
  //get value
  const searchInputValue = searchInput.value;
  //clear search section content
  searchResultSection.textContent = "";
  //spiner show
  spinerSection.style.display = "block";
  //if empty array
  if (searchInput.value == "") {
    alert("please input a value");
    notFoundMessage.innerText = "please input a value";
  }
  //give value message
  else {
    notFoundMessage.innerText = "";
    //set link api
    const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${searchInputValue}`;
    //api call async method
    const res = await fetch(url);
    const data = await res.json();
    //   displayData Function call
    displayData(data);
  }
  //spiner section hidden
  spinerSection.style.display = "none";
  //clear input value
  searchInput.value = "";
};

//display data
const displayData = (data) => {
  //set const section and not found message
  const searchResultSection = document.getElementById("search-result");
  const notFoundMessage = document.getElementById("not-found-message");

  //set countreysInfo
  const countreysInfo = data.query.search;

  //error message
  if (countreysInfo == "") {
    notFoundMessage.innerText = "Please Give me Correct Information";
    console.log(data);
  }
  //if correct value
  else {
    //clear not found message
    notFoundMessage.innerText = "";
    //for loop data
    for (const countreyInfo of countreysInfo) {
      const link = `https://en.wikipedia.org/?curid=${countreyInfo.pageid}`;
      //create new div
      const div = document.createElement("div");
      //class add div
      div.classList.add("mt-4", "shadow-lg", "p-4", "col-lg-8", "m-auto");
      // set inner html
      div.innerHTML = `
        <p>${link}</p>
        <a class="text-decoration-none hover" href="${link}" target="_blank">
            <h3 class="text-primary my-3">${countreyInfo.title}</h3>
        </a>
        <p>${countreyInfo.snippet}</p>  
    `;
      //append child
      searchResultSection.append(div);
    }
  }
};
