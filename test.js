
let para = new Vue ({
    el: '#para',
    data: {
        description: 'Fuzzy socks',
        brand: 'Illegal',
        selectedVarient: 0,
        // inventory: 0,
        // inStock: true,
        // onSale: true,

        link: 'https://vuejs.org/v2/guide/',
        cart: 0,
        removeCart: false,
        details: [
            '100% cotton',
            'Medium size'
        ],
        varients:[
            {
                color: "Green",
                varientId: 1212,
                image: "./assets/img.png",
                inventory: 10,
                inStock: true,
                onSale: true,
            },
            {
                color: "Blue",
                varientId: 1213,
                image: "./assets/img2.png",
                inventory: 0,
                inStock: false,
                onSale: false,
            }
        ],
    },
    computed: {
        title(){
            return this.brand + ' ' + this.description
        },
        image(){
            return this.varients[this.selectedVarient].image
        },
        inventory(){
            return this.varients[this.selectedVarient].inventory
        },
        inStock(){
            return this.varients[this.selectedVarient].inStock
        },
        onSale(){
            return this.varients[this.selectedVarient].onSale
        }
    },
    methods: {
        addToCart(){
            this.cart += 1;
            this.removeCart = true
        },
        removeFromCart(){
            this.cart -= 1
            if(this.cart == 0){
                this.removeCart = false
            }
        },
        productImage(index){
           this.selectedVarient = index
        }
    }
})