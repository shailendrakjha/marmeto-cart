function openNav() {
  document.getElementById("myCart").style.right = "0px";
  document.body.style.backgroundColor = "rgba(67,67,67,0.8)";
}
function closeNav() {
  document.getElementById("myCart").style.right = "-400px";
  document.body.style.backgroundColor = "rgba(256,256,256,0)";
}
if (document.readyState == 'loading') {
	document.addEventListener('DOMContentLoaded', ready);
} else {
	ready();
};
function ready() {
	var removeCartButtons = document.getElementsByClassName('cart-remove');
	console.log(removeCartButtons);
	for (var i = 0; i < removeCartButtons.length; i++) {
		var button = removeCartButtons[i];
		button.addEventListener('click', removeCartItem);
	}
	var quantityInputs = document.getElementsByClassName('product-quantity');
	for (var i = 0; i < quantityInputs.length; i++) {
		var input = quantityInputs[i];
		input.addEventListener('change', quantityChanged);
	}
	var addCart = document.getElementsByClassName('add-to-cart');
	for (var i = 0; i < addCart.length; i++) {
		var button = addCart[i];
		button.addEventListener('click', addCartClicked);
	}
	document.getElementsByClassName('btn-order')[0]
		.addEventListener('click', orderButtonClicked);
};
function orderButtonClicked() {
	alert('Your order is placed');
	var cartContent = document.getElementsByClassName('cart-content')[0];
	while (cartContent.hasChildNodes()) {
		cartContent.removeChild(cartContent.firstChild);
	}
	updatetotal();
};
function removeCartItem(event) {
	var buttonClicked = event.target;
	buttonClicked.parentElement.remove();
	updatetotal();
};
function quantityChanged(event) {
	var input = event.target;
	if (isNaN(input.value) || input.value <= 0) {
		input.value = 1;
	}
	updatetotal();
};
function addCartClicked(event) {
	var button = event.target;
	var shopProducts = button.parentElement;
	var title = shopProducts.getElementsByClassName('product-title')[0].innerText;
	var price = shopProducts.getElementsByClassName('product-price')[0].innerText;
	var productImg = shopProducts.getElementsByClassName('product-img')[0].src;
	addProductToCart(title, price, productImg);
	updatetotal();
};
function addProductToCart(title, price, productImg) {
	var cartShopBox = document.createElement('div');
	cartShopBox.classList.add('cart-box');
	var cartItems = document.getElementsByClassName('cart-content')[0];
	var cartItemsNames = cartItems.getElementsByClassName('product-title');
	for (var i = 0; i < cartItemsNames.length; i++) {
		if (cartItemsNames[i].innerText == title) {
			alert('This item already added to cart');
			return;
		}
	}
	var cartBoxContent = `
  <img src="${productImg}" alt="image" class="product-img">
		<div class="detail-box">
			<div class="product-title">${title}</div>			
		</div>
		<div>

		<div class="product-price">${price}</div>	
		<input class="product-quantity" type="number" value="1">
		</div>
		
		<button type="button" class='btn cart-remove'>Delete</button>
`;
	cartShopBox.innerHTML = cartBoxContent
	cartItems.append(cartShopBox);
	cartShopBox.
		getElementsByClassName('cart-remove')[0]
		.addEventListener('click', removeCartItem);
	cartShopBox
		.getElementsByClassName('product-quantity')[0]
		.addEventListener('change', quantityChanged);
};
function updatetotal() {
	var cartContent = document.getElementsByClassName('cart-content')[0];
	var cartBoxes = cartContent.getElementsByClassName('cart-box');
	var total = 0;
	for (var i = 0; i < cartBoxes.length; i++) {
		var cartBox = cartBoxes[i];
		var priceElement = cartBox.getElementsByClassName('product-price')[0];
		var quantityElement = cartBox.getElementsByClassName('product-quantity')[0];
		var price = parseFloat(priceElement.innerText.replace('₹', ''));
		var quantity = quantityElement.value;
		total = total + (price * quantity);
	}
	total = Math.round(total * 100) / 100;
	document.getElementsByClassName('total-price')[0].innerText = '₹' + total;
};