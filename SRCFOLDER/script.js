import { BasketP } from "./basket.js";

let shop = document.getElementById("shop");

class IndexRender extends BasketP {
  shop;
  constructor(inputShop) {
    super();
    this.shop = inputShop;
  }

  async generateShope() {
    let response = await fetch("SRCFOLDER/product.json");
    let data = await response.json();
    data.map((x) => {
        let { id, name, desc, price, img } = x;
        let search = this.basket.find((y) => y.id === id) || [];
        let { id:searchId, item } = search

        const createElement = (element) => {
            let dec = document.createElement('i')
            dec.setAttribute('class', 'bi bi-dash-lg')
            dec.addEventListener(`click`, () => {
              this.decrement(`${id}`)
            });
            let qty = document.createElement('div')
            qty.setAttribute('class', 'quantity')
            qty.setAttribute("id", `${id}`)
            qty.innerHTML = `${item === undefined ? 0 : item}`;
            let inc = document.createElement('i')
            inc.setAttribute('class', 'bi bi-plus-lg')
            inc.addEventListener(`click`, () => {
              this.increment(`${id}`)
            });
                let buttons = document.createElement('div')
                buttons.setAttribute('class', 'buttons')
                buttons.appendChild(dec)
                buttons.appendChild(qty)
                buttons.appendChild(inc)
                
                let pricePElement = document.createElement('p')
                pricePElement.innerHTML = `$ ${price}`
                    
                    let priceQuentity = document.createElement('div')
                    priceQuentity.setAttribute('class',"price-quentity")
                    priceQuentity.appendChild(buttons);
                    priceQuentity.appendChild(pricePElement);
                    let descP = document.createElement('p');
                    descP.innerText+=`${desc}`
                    let nameH3 = document.createElement('h3')
                    nameH3.innerHTML+=`${name}`
    
                          let details = document.createElement('div')
                          details.setAttribute('class', 'details')
                          details.appendChild(nameH3) 
                          details.appendChild(descP) 
                          details.appendChild(priceQuentity) 
                          let newImg = document.createElement('img')
                          newImg.setAttribute('width', '220') 
                          newImg.setAttribute('height', '200') 
                          newImg.setAttribute('src', `${img}`) 

                                let productP = document.createElement('div')
                                productP.setAttribute("id",`product-id=${id}`) 
                                productP.setAttribute("class","item") 
                                productP.appendChild(newImg)
                                productP.appendChild(details)
                                        
                                          element.appendChild(productP)
        }
        createElement(shop)
      })
  }

update = (id) => {
  let search = this.basket?.find((x) => x.id === id);
  console.log(search);
  document.getElementById(id).innerHTML = search?.item;
  this.calculation();
};

}

let index = new IndexRender(shop);
index.generateShope();
index.calculation();



