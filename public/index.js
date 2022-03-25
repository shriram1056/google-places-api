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
}
let suggestions = [
  'Channel',
  'Blogger',
  'Bollywood',
  'Vlogger',
  'Vechiles',
  'Facebook',
  'Freelancer',
  'Facebook Page',
  'Designer',
  'Developer',
]

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
            <a href="#">
              <div class="icon">
                <span class="fas fa-map-marker-alt"></span>
              </div>
              ${data}
            </a>
            </li>`)
    })
    searchWrapper.classList.add('active') //show autocomplete box
    searchBar.classList.add('active')
    showSuggestions(emptyArray)
    let allList = suggBox.querySelectorAll('li')
    for (let i = 0; i < allList.length; i++) {
      //adding onclick attribute in all li tag
      allList[i].setAttribute('onclick', 'select(this)')
    }
  } else {
    searchWrapper.classList.remove('active') //hide autocomplete box
    searchBar.classList.remove('active')
  }
}

function showSuggestions(list) {
  let listData
  if (!list.length) {
    userValue = search_input.value
    listData = `<li>
            <a href="#">
              <div class="icon">
                <span class="fas fa-map-marker-alt"></span>
              </div>
              Add Missing Place to Google Maps</a></li>`
  } else {
    listData = list.join('')
  }
  suggBox.innerHTML = listData
}
