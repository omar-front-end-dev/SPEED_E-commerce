const product_container = document.querySelector(".products .row")
    async function get_data_from_api() {
        let response = await fetch("http://localhost:3000/products");
        let data = await response.json();
        display_products(data);
    };

    window.addEventListener("DOMContentLoaded", () =>{
        get_data_from_api()
    });

    function display_products(data) {
        let slice_data = data.slice(0,9)
        let tem = "";
        slice_data.forEach((item) =>{
            tem+=`
                <div class="col-lg-4 col-md-6 mb-5">
                    <div class="product shadow-lg border rounded-1" onClick="location_shopping()">
                        <div class="product__title p-2 bg-body-secondary">
                            <p class=" fw-bold"><strong class="color-text">${item.category} :</strong> <br/>${item.title}</p>
                        </div>
                        <div class="product__img overflow-hidden">
                            <img class="w-100" src="${item.thumbnails}" alt="">
                        </div>
                        <div class="product__details p-3 bg-body-secondary">
                            <div class="product__info d-flex justify-content-between align-items-center">
                                <h6><strong class="color-text">price:</strong> ${item.price}$</h6>
                                <h6><strong class="color-text">CC:</strong> ${item.cc}</h6>
                            </div>
                        </div>
                    </div>
                </div>
            `
        });
        product_container.innerHTML= tem;
    };


    function location_shopping() {
        window.location.href="../../shopping.html";
    }