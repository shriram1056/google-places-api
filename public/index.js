const drop_btn = document.querySelector('.drop-down')
const tooltip = document.querySelector('.tooltip')
const menu_wrapper = document.querySelector('.wrapper')

drop_btn.onclick = () => {
  menu_wrapper.classList.toggle('show')
  tooltip.classList.toggle('show')
}
