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
    // Получаем текущий список товаров из Local Storage
    var cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    // Добавляем новый товар
    var newItem = { productName: productName, price: price };
    cartItems.push(newItem);

    // Сохраняем обновленный список товаров в Local Storage
    localStorage.setItem('cart', JSON.stringify(cartItems));

    // Обновляем отображение корзины
    updateCartDisplay();
}

// Функция обновления отображения корзины
function updateCartDisplay() {
    var cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    var cartList = document.getElementById('cartItems');

    // Очищаем текущее отображение корзины
    cartList.innerHTML = '';

    

    // Добавляем каждый товар Add to cart в список
    cartItems.forEach(function(item) {
        var li = document.createElement('li');

        // Создаем ссылку
        var link = document.createElement('a');
        link.href = 'shipping.html'; // Здесь вы можете установить ссылку на страницу товара или другую нужную вам ссылку
        link.textContent = item.productName + ' - ' + item.price;

        // Добавляем ссылку в элемент списка
        li.appendChild(link);

        // Добавляем элемент списка Add to cart
        cartList.appendChild(li);
    });
    

}
function clearCart() {
        // Очищаем Local Storage и обновляем отображение корзины
        localStorage.removeItem('cart');
        updateCartDisplay();
    }
// Вызываем updateCartDisplay() при загрузке страницы
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
    
    function init(){
        width = document.querySelector('.slider').offsetWidth;
        sliderLine.style.width = width*images.length+'px';
        images.forEach(item=>{
            item.style.width = width+'px';
            item.style.height = 'auto';
        });
        rollSlider();
    }
    window.addEventListener('resize', init);
    init();
    document.querySelector('.slider-next').addEventListener('click', function(){
        count++;
        if(count>=images.length){
            count = 0;
        }
        rollSlider();
    });
    document.querySelector('.slider-prev').addEventListener('click', function(){
        count--;
        if(count<0){
            count = images.length - 1;
        }
        rollSlider();
    });
    function rollSlider(){
        sliderLine.style.transform='translate(-'+count*width+'px)';
    }
}