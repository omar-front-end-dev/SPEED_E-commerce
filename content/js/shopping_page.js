const product_shopping_content = document.querySelector(".products-shopping .row");
const pagination_container = document.querySelector(".pagination-container");
const content_category = document.querySelector(".content__category");
let global_data;



async function get_data_from_api() {
    let response = await fetch(`http://localhost:3000/products`);
    let data = await response.json();
    global_data = data
    display_products(data);
    generate_pagination()
    filter_by_category(data)
    filtrating_data(data)
};


    window.addEventListener("DOMContentLoaded", () =>{
        get_data_from_api()
    });


    function display_products(data) {
        let tem = "";
        data.forEach((item) =>{
            tem+=`
                <div class="col-lg-4 col-md-6 mb-5">
                    <div class="product shadow-lg border rounded-1">
                        <div class="product__title p-2 bg-body-secondary border-bottom">
                            <p class=" fw-bold"><strong class="color-text">${item.category} :</strong> <br/>${item.title}</p>
                        </div>
                        <div class="product__img overflow-hidden bg-white">
                            <img class="w-100" src="${item.thumbnails}" alt="">
                        </div>
                        <div class="product__details p-2 bg-body-secondary">
                            <div class="product__info d-flex justify-content-between align-items-center">
                                <h6><strong class="color-text">price :</strong> ${item.price}$</h6>
                                <h6><strong class="color-text">CC :</strong> ${item.cc}</h6>
                            </div>
                        </div>
                        <div class="product__icons p-2 bg-body-secondary border-top d-flex justify-content-end gap-2">
                                <div title="Show Product Details" onClick="add_id_to_localeStorage(${item.id})" class="icon icon-show-details text-white rounded-1"><i class="fa-solid fa-eye fa-xl"></i></div>
                                <div title="Add To Cart" onClick="add_to_cart(${item.id})" class="icon icon-add-product text-white rounded-1"><i class="fa-solid fa-cart-plus fa-xl"></i></div>
                            </div>
                    </div>
                </div>
            `
        });
        product_shopping_content.innerHTML+= tem;
    };


    async function postJSON(data) {
          const response = await fetch("http://localhost:4000/carts", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          
        });
        window.location.href="../../cart.html";
    }


function add_to_cart(index) {
    postJSON(global_data[index - 1])
}


function add_id_to_localeStorage(id) {
    localStorage.setItem("product_id", id);
    window.location.href="../../single_product.html";
}





// Start Attempt to make pagination //

function generate_pagination() {
    let pagination_item = "";
    let count_page = (Math.ceil(global_data.length / 20))
    for (let index = 1; index <= count_page; index++) {
       pagination_item+=`
            <div onClick="get_count_page(${index})" class="pagination__item px-4 py-2 rounded-2 text-white">${index}</div>
       `
    }
    pagination_container.innerHTML+= pagination_item
}

function get_count_page(index) {
    let num_page = index
    console.log(num_page);
}
// End Attempt to make pagination //


function filter_by_category(data) {
    const container_filter_category = document.querySelector(".content__category")
    const uniqueCategories = new Set();
    const all_category = [];

    for (const product of data) {
    if (!uniqueCategories.has(product.category)) {
        uniqueCategories.add(product.category);
        all_category.push(product);
    }
    }
    let new_category = all_category.map((item) =>{
        return`
            <button class="filter_btn rounded focus-ring px-4 py-2 border-0 fw-bold">
                ${item.category}
            </button>
        `
    });
    container_filter_category.innerHTML+= new_category.join("");
}

function filtrating_data(data) {
    content_category.addEventListener("click", (e)=>{
        let category = e.target.classList.contains("filter_btn");
        if (category) {
            let target_category = e.target.textContent.trim();
            product_shopping_content.innerHTML= "";
            const filteredData = data.filter((item) => item.category == target_category);
            display_products(filteredData);
        }else{
            return false
        }
    });
}