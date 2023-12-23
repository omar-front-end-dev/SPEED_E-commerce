const tbody = document.querySelector(".carts tbody");
const carts_price_content = document.querySelector(".carts__price-content") 
async function get_carts_from_api() {
    let response = await fetch("http://localhost:4000/carts");
    let data = await response.json();
    display_carts(data)
};

window.addEventListener("DOMContentLoaded", () =>{
    get_carts_from_api()
});

let total_price = 0;

function display_carts(data) {
    let new_data = data.map((item) =>{
        total_price+=parseFloat(item.price)
        return`
            <tr>
                <td class="fw-bold border">
                    <img class="cart_image" src=${item.thumbnails} alt=${item.title} />
                </td>
                <td class="fw-bold border">
                ${item.title}
                </td>
                <td class="fw-bold border color-text">
                    ${item.category}
                </td>
                <td class="fw-bold border">
                    ${item.cc}
                </td>
                <td class="fw-bold border">
                    ${item.price}$
                </td>
                <td class="fw-bold border">
                    <button onClick="delete_item(${item.id})" class="btn btn-danger">
                        DELETE
                    </button>
                </td>
            </tr>
            `
    });
    tbody.innerHTML+= new_data.join("");
    carts_price_content.innerHTML+= total_price + "$";
};


function delete_item(id) {
    fetch(`http://localhost:4000/carts/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
}

