const drop_btn = document.querySelector('.drop-down')
const tooltip = document.querySelector('.tooltip')
const searchBar = document.querySelector('.search_bar')
const menu_wrapper = document.querySelector('.wrapper')
const search_input = document.querySelector('.search_input')
const suggBox = document.querySelector('.suggestion-box')
const searchWrapper = document.querySelector('.autocom-box')
drop_btn.onclick = () => {
  menu_wrapper.classList.toggle('show')
  tooltip.classList.toggle('show')
  searchWrapper.classList.remove('active') //hide autocomplete box
  searchBar.classList.remove('active')
}
let suggestions = [
  'API Hockey PROS Store,17-25 Meadowbank Rd, Cornwall, PE C0A 1H0',
  'Mark Arendz Provincial Ski Park at Brookvale,2018 PE-13, North Wiltshire, PE C0A 1Y0',
  'The Spice Store, 127 St Peters Rd, Charlottetown, PE C1A 5P3',
  'Vlogger',
  'Vechiles',
  'Facebook',
  'Freelancer',
  'Facebook Page',
  'Designer',
  'Developer',
]

let searchBarChildren = searchBar.children

search_input.onkeyup = (e) => {
  let userData = e.target.value
  console.log(userData)
  if (userData) {
    emptyArray = suggestions.filter((data) => {
      //filtering array value and user characters to lowercase and return only those words which are start with user enetered chars
      return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase())
    })
    emptyArray = emptyArray.map((data) => {
      // passing return data inside li tag
      return (data = `<li>
              <div class="icon">
                <span class="fas fa-map-marker-alt"></span>
              </div>
              <span class='search-text'>
              ${data}
              </span>
            </li>`)
    })
    searchWrapper.classList.add('active')
    searchBar.classList.add('active')
    menu_wrapper.classList.remove('show')
    tooltip.classList.remove('show')

    showSuggestions(emptyArray)
    let allList = suggBox.querySelectorAll('li')
    for (let i = 0; i < allList.length; i++) {
      //adding onclick attribute in all li tag
      allList[i].setAttribute('onclick', 'select(this)')
    }
  } else {
    searchWrapper.classList.remove('active')
    searchBar.classList.remove('active')
  }
}

function showSuggestions(list) {
  let listData
  if (!list.length) {
    userValue = search_input.value
    listData = `<li>
              <div class="icon">
                <span class="fas fa-map-marker-alt"></span>
              </div>
              There is no result for the given keyword</li>`
  } else {
    listData = list.join('')
  }
  suggBox.innerHTML = listData
}
