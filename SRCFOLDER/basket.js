export class BasketP {
    
    basket = JSON.parse(localStorage.getItem("data")) || [];

    decrement = (id) => {
        let selectedItem = id;
        let search = this.basket.find((x) => x.id === selectedItem);
        if (search === undefined) return;
        else if (search.item === 0) return;
        else {
          search.item -= 1;
        }
        this.update(selectedItem);
        this.basket = this.basket.filter((x) => x.item !== 0);
        localStorage.setItem("data", JSON.stringify(this.basket));
      };

    increment = (id) => {
        let selectedItem = id;
        let search = this.basket.find((x) => x.id === selectedItem);
        if (search === undefined) {
          this.basket.push({
            id: selectedItem,
            item: 1,
          });
        } else {
          search.item += 1;
        }
        this.update(selectedItem);
        localStorage.setItem("data", JSON.stringify(this.basket));
    }

    calculation = () => {
        // this.basket = JSON.parse(localStorage.getItem("data"));
        let cartIcon = document.getElementById("cartAmount");
        cartIcon.innerHTML = this.basket.map((x) => x.item).reduce((x, y) => x + y, 0);
    };

    update = () => {
        throw new Error('Override update fucntion!!');
    }
}