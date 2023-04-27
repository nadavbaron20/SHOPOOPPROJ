import { BasketP } from "./basket.js";

let label = document.getElementById("label");
let shoppingCart = document.getElementById("shopping-cart");

class Cart extends BasketP {
  label;
  shoppingCart;
  constructor(inputlabel, inputShoppingCart) {
    super();
    this.label = inputlabel;
    this.shoppingCart = inputShoppingCart;
  }

  generateCartItems = async () => {
    shoppingCart.innerHTML=``;
    if (this.basket.length  !== 0) {
         console.log(this.basket);
         const response = await fetch("SRCFOLDER/product.json"); 
         const products = await response.json();
         this.basket.map((basketItem) => {
         let search = products.filter((x) => x.id === basketItem.id);
         if (!search) {return;}
         search.map((y)=>{
         let {id, name, price, img} = y;
         
         const createElement = (element) => {
         let nameP = document.createElement('P')
         nameP.innerHTML = `${name}` 
         let priceP = document.createElement('P')
         priceP.setAttribute('class','cart-item-price')
         priceP.innerHTML = `$ ${price}`
                   
                  let titlePriceP = document.createElement('h4')
                  titlePriceP.setAttribute('class', 'title-price')
                  titlePriceP.appendChild(nameP)
                  titlePriceP.appendChild(priceP)
                  let removeItemP = document.createElement('i')
                  removeItemP.setAttribute('class', 'bi bi-x-lg')
                  removeItemP.addEventListener(`click`, () => {
                     this.removeItem(`${id}`)
                  }); 
                 
                        let titlePricePx = document.createElement('div')
                        titlePricePx.setAttribute('class', "title-price-x")
                        titlePricePx.appendChild(titlePriceP) 
                        titlePricePx.appendChild(removeItemP) 
                
                  let dec = document.createElement('i')
                  dec.setAttribute('class', 'bi bi-dash-lg')
                  dec.addEventListener(`click`, () => {
                    this.decrement(`${id}`);
                  });
                  let qty = document.createElement('div')
                  qty.setAttribute('class', 'quantity')
                  qty.setAttribute("id", `${id}`)
                  qty.innerHTML = (`${basketItem.item}`);
                  let inc = document.createElement('i')
                  inc.setAttribute('class', 'bi bi-plus-lg')
                  inc.addEventListener(`click`, () => {
                    this.increment(`${id}`);
                  });
      
                        let buttonsP = document.createElement('div')
                        buttonsP.setAttribute('class', 'buttons')
                        buttonsP.appendChild(dec)
                        buttonsP.appendChild(qty)
                        buttonsP.appendChild(inc)
                   
                        let totalP = document.createElement('H3')
                        totalP.innerHTML=`${basketItem.item*price}` 
      
                                    let detailP = document.createElement('div')
                                    detailP.setAttribute('class', "details")
                                    detailP.appendChild(titlePricePx)
                                    detailP.appendChild(titlePricePx)
                                    detailP.appendChild(buttonsP)
                                    detailP.appendChild(totalP)
        
                                    let newImgP = document.createElement('img')
                                    newImgP.setAttribute('width', "100")
                                    newImgP.setAttribute('height', "105")
                                    newImgP.setAttribute('src',`${img}`)
      
                                           let cartItemP = document.createElement('div')
                                           cartItemP.setAttribute('class', "cart-item")
                                           cartItemP.appendChild(newImgP)
                                           cartItemP.appendChild(detailP)
      
                                             element.appendChild(cartItemP)
       }
       createElement(shoppingCart) 
      })
    });
    } else {
        shoppingCart.innerHTML =``;
        label.innerHTML =`
          <h2>Cart is Empty</h2>
          <a href="INDEX.html">
          <button class="HomeBtn">Back to home</button>
          </a>`;
    }
  };

   update = (id) => {
      
      let search = this.basket.find((x) => x.id === id); // returns ?
      const item = document.getElementById(id); 
      if(search && item){
        item.innerHTML = search.item;
        this.calculation();
        this.TotalAmount();
        this.generateCartItems();
      }
  };
    
  removeItem = (id) => {
      let selectedItem = id;
      console.log(selectedItem);
      let basket = this.basket.filter((x) => x.id !== selectedItem);
      localStorage.setItem("data", JSON.stringify(basket));
      let cart = new Cart(label, shoppingCart);
      cart.generateCartItems();
      cart.TotalAmount();
      cart.calculation();
  };
    
  clearCart = () => {
      this.basket = [];
      localStorage.setItem("data", JSON.stringify(this.basket));
      console.log(this.basket);
      this.generateCartItems();
      this.TotalAmount();
      this.calculation();
      
   };

  TotalAmount = async () => {
      if (this.basket.length !== 0) {
        const response = await fetch("SRCFOLDER/product.json");
        const products = await response.json();
        let amount = this.basket.map((x) => {
            let { item, id } = x;
            let search = products.find((y) => y.id === id) || [];
            return item * search.price;
          }).reduce((x,y) => x+y,0);
          // Replace "total-amount-container" with the ID of the container element where you want to append the generated HTML
          const container = label; 
          container.innerHTML = ""; 
          // Clear any existing content in the container
          const amountP = document.createElement("h2");
          amountP.innerHTML = `Total Bill : $ ${amount}`;
          const checkoutBtn = document.createElement("button");
          checkoutBtn.setAttribute('class',"checkout");
          checkoutBtn.innerHTML = "Checkout";
          const clearCartBtn = document.createElement("button");
          clearCartBtn.setAttribute('class',"removeAll");
          clearCartBtn.innerHTML = "Clear Cart";
          clearCartBtn.addEventListener("click", () => { 
            this.clearCart(); 
          });
          container.appendChild(amountP);
          container.appendChild(checkoutBtn);
          container.appendChild(clearCartBtn);
      } else return;
    };
}

let cart = new Cart(label, shoppingCart);
cart.calculation();
cart.TotalAmount();
cart.generateCartItems();

