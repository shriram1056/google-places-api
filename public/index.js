const drop_btn = document.querySelector('.drop-down')
const tooltip = document.querySelector('.tooltip')
const searchBar = document.querySelector('.search_bar')
const menu_wrapper = document.querySelector('.wrapper')
const search_input = document.querySelector('.search_input')
const suggBox = document.querySelector('.suggestion-box')
const searchWrapper = document.querySelector('.autocom-box')
const AddressBox = document.querySelector('.menu-bar')

function showAddresses() {
  let getLocalStorageData = localStorage.getItem('Address')
  let addressesArray = JSON.parse(getLocalStorageData)
  if (getLocalStorageData == null || !addressesArray.length) {
    AddressBox.innerHTML = `
    <li>
      <div class="icon">
        <span class="fas fa-map-marker-alt"></span>
      </div>
      There is no stored addresses
    </li>`
  } else {
    let Addresses = ''
    addressesArray.forEach((element) => {
      Addresses += `<li onclick=remove(this)>
            <div class="icon">
              <span class="fas fa-map-marker-alt"></span>
            </div>
            <span class="search-text">
              ${element}
              <span class="delete-icon" ><i class="fas fa-trash"></i></span>
            </span>
          </li>`
    })
    AddressBox.innerHTML = Addresses
    search_input.value = ''
  }
}

showAddresses()

drop_btn.onclick = () => {
  menu_wrapper.classList.toggle('show')
  tooltip.classList.toggle('show')
  searchWrapper.classList.remove('active') //hide autocomplete box
  searchBar.classList.remove('active')
}

search_input.onkeyup = async (e) => {
  let userData = e.target.value
  if (userData) {
    let res = await fetch(
      '/places?' +
        new URLSearchParams({
          search: userData,
        })
    )
    let suggestions = await res.json()
    emptyArray = suggestions.filter((data) => {
      //filtering array value and user characters to lowercase and return only those words which are start with user enetered chars
      return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase())
    })

    emptyArray = emptyArray.map((data) => {
      // passing return data inside li tag
      return (data = `<li onclick=select(this)>
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

function select(element) {
  let selectData = element.innerText
  search_input.value = ''
  let getLocalStorageData = localStorage.getItem('Address')
  if (getLocalStorageData == null) {
    listArray = []
  } else {
    listArray = JSON.parse(getLocalStorageData)
  }
  if (listArray.length == 5) {
    listArray.push(selectData)
    listArray.shift()
  } else {
    listArray.push(selectData)
  }
  localStorage.setItem('Address', JSON.stringify(listArray))
  showAddresses()

  searchWrapper.classList.remove('active')
  searchBar.classList.remove('active')
  menu_wrapper.classList.add('show')
  tooltip.classList.add('show')
}

function remove(element) {
  let getLocalStorageData = localStorage.getItem('Address')
  listArray = JSON.parse(getLocalStorageData)
  listArray.splice(listArray.indexOf(element.innerText), 1)
  localStorage.setItem('Address', JSON.stringify(listArray))
  showAddresses()
}
