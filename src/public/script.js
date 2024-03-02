const icon = document.querySelector('.icon');
const search_bar = document.querySelector('.search_bar');
icon.onclick = function(){
    search_bar.classList.toggle('active');
}
document.addEventListener("click", e =>{
    const isDropdown = e.target.matches("[data-dropdown-button]")
    if (!isDropdown && e.target.closest('[data-dropdown]') !=null) return
    let currentDropdown
    if (isDropdown){
        currentDropdown=e.target.closest('[data-dropdown]')
        currentDropdown.classList.toggle('active')
    }

    document.querySelectorAll("[data-dropdown].active").forEach(dropdown =>{
        if (dropdown ===currentDropdown) return
        dropdown.classList.remove('active')
    })
})
// btn log
function changeText(){
    let button = document.getElementById('log-btn');
    if(button.innerHTML==='Login'){
        button.innerHTML='Logout (User)'
    }
    else{
        button.innerHTML='Login';
    }
}


// CART
function addToCart(productName, price) {
    var cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    var newItem = { productName: productName, price: price };
    cartItems.push(newItem);

    localStorage.setItem('cart', JSON.stringify(cartItems));

    updateCartDisplay();
}

function updateCartDisplay() {
    var cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    var cartList = document.getElementById('cartItems');

    cartList.innerHTML = '';

    

    cartItems.forEach(function(item) {
        var li = document.createElement('li');

        // Создаем ссылку
        var link = document.createElement('a');
        link.href = 'cart.html';  
        link.textContent = item.productName + ' - ' + item.price;

        // Добавляем ссылку в элемнт списка
        li.appendChild(link);

        cartList.appendChild(li);
    });
    

}
function clearCart() {
        localStorage.removeItem('cart');
        updateCartDisplay();
    }
updateCartDisplay();

// CATEGORY DISPLAY

const categoryTitle = document.querySelectorAll('.category-title');
const allCategoryPosts = document.querySelectorAll('.all');

for(let i = 0; i < categoryTitle.length; i++){
    categoryTitle[i].addEventListener('click', filterPosts.bind(this, categoryTitle[i]));
}

function filterPosts(item){
    changeActivePosition(item);
    for(let i = 0; i < allCategoryPosts.length; i++){
        if(allCategoryPosts[i].classList.contains(item.attributes.id.value)){
            allCategoryPosts[i].style.display = "block";
        } else {
            allCategoryPosts[i].style.display = "none";
        }
    }
}

function changeActivePosition(activeItem){
    for(let i = 0; i < categoryTitle.length; i++){
        categoryTitle[i].classList.remove('active');
    }
    activeItem.classList.add('active');
};

// PRODUCT IMAGES
if (document.querySelector('.product-imgs')) {
    const imgs = document.querySelectorAll('.img-select a');
const imgBtns = [...imgs];
let imgId = 1;

imgBtns.forEach((imgItem) => {
    imgItem.addEventListener('click', (event) => {
        event.preventDefault();
        imgId = imgItem.dataset.id;
        
        slideImage();
        
    });
});

function slideImage(){
    const displayWidth = document.querySelector('.img-showcase img:first-child').clientWidth;

    document.querySelector('.img-showcase').style.transform = `translateX(${- (imgId - 1) * displayWidth}px)`;
}
window.addEventListener('resize', slideImage);
}

// SLIDER
if (document.querySelector('.container')) {
    const images = document.querySelectorAll('.slider .slider-line img');
    const sliderLine = document.querySelector('.slider-line');
    let count = 0;
    let width;

    function init() {
        width = document.querySelector('.slider').offsetWidth;

        if (images.length === 0) {
            return;
        }

        sliderLine.style.width = width * images.length + 'px';
        images.forEach(item => {
            item.style.width = width + 'px';
            item.style.height = 'auto';
        });
        rollSlider();
    }

    window.addEventListener('resize', init);
    init();

    document.querySelector('.slider-next').addEventListener('click', function () {
        count++;
        if (count >= images.length) {
            count = 0;
        }
        rollSlider();
    });

    document.querySelector('.slider-prev').addEventListener('click', function () {
        count--;
        if (count < 0) {
            count = images.length - 1;
        }
        rollSlider();
    });

    function rollSlider() {
        sliderLine.style.transform = 'translate(-' + count * width + 'px)';
    }
}

// COUNTER
function updateCounter(counterId, value) {
    const counterElement = document.getElementById(counterId);
    let currentValue = parseInt(counterElement.innerText, 10);
    let newValue = currentValue + value;

    newValue = Math.max(newValue, 0);

    counterElement.innerText = newValue;
  }
//   RADIO INPUT
  function activateRadio(radioId) {
    const radioElement = document.getElementById(radioId);
    radioElement.checked = true;
  }
//   Complete the order
if (document.querySelector('.modal')){
const openModalButtons = document.querySelectorAll('[data-modal-target]')
const closeModalButtons = document.querySelectorAll('[data-close-button]')
const ovelay = document.getElementById('overlay')

openModalButtons.forEach(button=>{
    button.addEventListener('click', ()=>{
        const modal = document.querySelector(button.dataset.modalTarget)
        openModal(modal)
    })
})

overlay.addEventListener('click', ()=>{
    const modals = document.querySelectorAll('.modal.active') 
    modals.forEach(modal =>{
        closeModal(modal)
    })
})

closeModalButtons.forEach(button=>{
    button.addEventListener('click', ()=>{
        const modal = button.closest('.modal')
        closeModal(modal)
    }) 
}) 
function openModal(modal){
    if (modal== null) return
    modal.classList.add('active')
    overlay.classList.add('active')
}
function closeModal(modal){
    if (modal== null) return
    modal.classList.remove('active')
    overlay.classList.remove('active')
}
}

// show more-btn
const showMore = document.querySelector('.btn-more');
const productsLength = document.querySelectorAll('.card-show').length;
let items = 6;

showMore.addEventListener('click', ()=>{
    items+=11;
    const array = Array.from(document.querySelector('.cards-grid2').children);
    const visItems = array.slice(0, items);

    visItems.forEach(el => el.classList.add('is-visible'));
    if (visItems.length = 16){
        showMore.style.display='none';
    }
})


document.addEventListener('DOMContentLoaded', function() {
    // Проверяем, есть ли уже кэшированные данные пользователей
    const cachedUsers = localStorage.getItem('users');
    if (cachedUsers) {
      // Если данные есть, используем их
      displayUsers(JSON.parse(cachedUsers));
    } else {
      // Если данных нет, делаем запрос к серверу
      fetch('https://database-1.c546eokicb94.eu-north-1.rds.amazonaws.com')
        .then(response => response.json())
        .then(users => {
          // Сохраняем данные в кэш
          localStorage.setItem('users', JSON.stringify(users));
          // Используем данные для отображения
          displayUsers(users);
        })
        .catch(error => {
          console.error('Ошибка при получении данных о пользователях:', error);
        });
    }
  });
  
  function displayUsers(users) {
    document.querySelectorAll('.user-card').forEach(card => {
      const index = parseInt(card.getAttribute('data-index'),  10);
      const user = users[index];
      if (user) {
        card.innerHTML = `
          <a href="product.html" class="card-name"><p>${user.username}</p></a>
          <p class="card-price">${user.surname}</p>
          <!-- Добавьте другие поля пользователя по мере необходимости -->
        `;
      } else {
        card.innerHTML = '<p>User not found</p>';
      }
    });
  }
  
    
//   const userCardTemplate = document.querySelector("[data-user-template]");
//   const userCardContainer = document.querySelector("[data-user-cards-container]");
//   const searchInput = document.querySelector("[data-search]");
const userCardTemplate = document.querySelector("[data-product-template]");
const userCardContainer = document.querySelector("[data-product-cards-container]");
const searchInput = document.querySelector("[data-product-search]");

  
  let products = []; // Изменено на products
  
  searchInput.addEventListener("input", e => {
      const value = e.target.value.toLowerCase();
      products.forEach(product => { // Изменено на products
          const isVisible = product.name.toLowerCase().includes(value) || product.price.toLowerCase().includes(value);
          product.element.classList.toggle("hide", !isVisible);
      });
  });
  
  fetch('https://mobilehub-w4eu.onrender.com/products')
 .then(res => res.json())
 .then(data => {
    products = data.map(product => {
        const cardItem = userCardTemplate.content.cloneNode(true).children[0];
        const card_name = cardItem.querySelector(".card_name");
        const card_price = cardItem.querySelector(".card_price");
        const card_img = cardItem.querySelector("[data-photo-url]");
        const card_video = cardItem.querySelector("[data-video-url]");

        card_name.textContent = product.name;
        card_price.textContent = product.price;
        card_img.src = product.image_url; // Убедитесь, что product.photo_url корректно указывает на изображение
        card_video.src = product.video_url; // Убедитесь, что product.video_url корректно указывает на видео

        userCardContainer.append(cardItem);
        return {name: product.name, price: product.price, element: cardItem};
    });
})
.catch(error => {
    console.error('Ошибка при получении данных о товарах:', error);
});

  
  //   userCard.innerHTML = `
    //     <div class="user-info">
    //       <h3 class="user-name">${user.username}</h3>
    //       <p class="user-surname">${user.surname}</p>
    //     </div>
    //     <button class="view-profile">Просмотреть профиль</button>
    //   `;


    
//   const { spawn } = require('child_process');

// // Функция для запуска app.js
// function startApp() {
//   const app = spawn('node', ['app.js']);
// }

// // Запуск app.js
// startApp();
