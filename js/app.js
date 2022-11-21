let arrLocalStorage = JSON.parse(localStorage.getItem('order')) || [];

showOrders();

function showOrders() {
  initialOrders();
  const btnOrders = document.querySelector('#orders');
  const parent = document.querySelector('.orders');
  btnOrders.addEventListener('click', function() {
    const orderForm = document.querySelector('.form');
    orderForm.innerHTML = "";
    const ordersBlock = document.querySelector('.orders_block');
    ordersBlock.classList.add('orders_show');
    const form = document.querySelector('.container');
    form.classList.add('form_none');
    const btnHomePage = document.createElement('button');
    btnHomePage.classList.add('homepage');
    btnHomePage.textContent = 'Back to main page'
    parent.appendChild(btnHomePage);
    btnHomePage.addEventListener('click', function() {
      document.location.reload();
    });
  });
}

function deleteOrder(event) {
  const categoryIndex = event.target.getAttribute('data-delete');
  if (event.target.className === 'btn_delete'){
    const message = confirm('Are you sure you want to delete order information?');
    if (message === true) {
      arrLocalStorage.splice(categoryIndex, 1);
      localStorage.setItem('order', JSON.stringify(arrLocalStorage));
      event.target.closest('li').remove();
    }
  }
}
function showDetailsOrder (event) {
  const categoryId = Number(event.target.getAttribute('id'));
  console.log(categoryId);
  for (let i = 0; i < arrLocalStorage.length; i++) {
    console.log(arrLocalStorage[i].id);
    if (arrLocalStorage[i].id === categoryId) {
      const container = document.querySelector('.order_details');
      const elem = document.createElement('div');
      container.innerHTML = '';
      elem.innerHTML= `<p>Data of purchase: ${arrLocalStorage[i].date} </p><p>${arrLocalStorage[i].nameProdact} </p><p>${arrLocalStorage[i].price}</p><p>${arrLocalStorage[i].description} </p><p><b>Buyer information:</b></p><p>Full name: ${arrLocalStorage[i].surname} ${arrLocalStorage[i].firstName} ${arrLocalStorage[i].patronymic}</p><p>City: ${arrLocalStorage[i].city} </p><p>Branch № ${arrLocalStorage[i].department}</p><p>Payment method: ${arrLocalStorage[i].payment} </p><p>Quantity: ${arrLocalStorage[i].amount} </p><p>Comment: ${arrLocalStorage[i].comment} </p> `;
      container.appendChild(elem);
    }
  }
}

function initialOrders() {
    const parentList = document.querySelector('.list');
    
    for (let i = 0; i < arrLocalStorage.length; i++) {
      // create new element
      const item = document.createElement('li');
      item.setAttribute('data-order', i);
      const id = arrLocalStorage[i].id;
      item.setAttribute('id', id);
      item.addEventListener('click', showDetailsOrder);
      item.textContent = arrLocalStorage[i].date + ', ' + arrLocalStorage[i].price;
      parentList.appendChild(item);

      const btnDelete = document.createElement('button');
      btnDelete.setAttribute('data-delete', i);
      btnDelete.classList.add('btn_delete');
      btnDelete.textContent = 'Delete';
      item.appendChild(btnDelete);
      btnDelete.addEventListener('click', deleteOrder);
  }
}

function showCategories() {
  const container = document.querySelector('.categories');

  for (let i = 0; i < data.length; i++) {
    const elem = document.createElement('div');
    elem.textContent = data[i].name;
    elem.setAttribute('data-category', i);
    elem.addEventListener('click', showProducts);
    container.appendChild(elem);
  }
}

// handler of click on categories
function showProducts(event) {
  const categoryIndex = event.target.getAttribute('data-category');
  const products = data[categoryIndex].products;
  const container = document.querySelector('.products');
  container.innerHTML = '';
  
  for(let i = 0; i < products.length; i++) {
    const elem = document.createElement('div');
    elem.textContent = products[i].name;
    elem.setAttribute('data-product', i);
    elem.setAttribute('data-category', categoryIndex);
    elem.addEventListener('click', showDetails, false);
    container.appendChild(elem);
  }
}

function showDetails(event) {
  const categoryIndex = event.target.getAttribute('data-category');
  const productIndex = event.target.getAttribute('data-product');
  const details = data[categoryIndex].products[productIndex];
  const container = document.querySelector('.details');
  container.innerHTML = '';

  const elem = document.createElement('div');
  elem.classList.add('details-text');
  elem.innerHTML= `<p class="name"><b>name:</b> ${details.name} </p><p class="price"><b>price:</b> ${details.price} </p><p class="description"><b>description:</b> ${details.description} </p> `;
  container.appendChild(elem);
  buyProduct();
  sendform();
}

function buyProduct() {
  const container = document.querySelector('.details');
  const btn = document.createElement('button');
  btn.textContent = 'Buy now';
  container.appendChild(btn);
  btn.addEventListener('click', function() {
    const container = document.querySelector('.form');
    container.classList.add('show_form');
    const date = document.querySelector('.date');
    const dateObj = new Date();
    date.value = dateObj.toISOString().slice(0,10);
    
  });
}

function sendform() {
  const form = document.querySelector('.order_form');
  const message = document.querySelector('.message');

  document.querySelector('#btn-form').addEventListener('click', function() {
    
    let error = formValidate(form);

    if (error === 0) {
      let formData = getDataFotm();
    } else {
      return false;
    }
    
    function formValidate(form) {
      let error = 0;
      let fielError = document.querySelectorAll('.field');

      for(i=0; i < fielError.length; i++) {
        const input = fielError[i];
        formAddRemove(input);

        if(input.classList.contains('number') && input.value <= 0) {
            formAddError(input);
            error++;
        } else if (input.value === "") {
          formAddError(input);
          error++;
        }
      }

      let city = document.forms[0].city.value;
      if (city === '0') {
        document.forms[0].city.classList.add('error');
        error++;
      }
      return error;
    }  

    function formAddError(input) {
        input.classList.add('error');
        message.classList.add('show_message');
    }
    function formAddRemove(input) {
      input.classList.remove('error');
      message.classList.remove('show_message');
    }
    function getDataFotm() {
      const surname = document.forms[0].elements.surname.value;
      const firstName = document.forms[0].elements.name.value;
      const patronymic = document.forms[0].patronymic.value;
      const city = document.forms[0].city.value;
      const department = document.forms[0].department.value;
      const payment = document.forms[0].payment.value;
      const amount = document.forms[0].amount.value;
      const comment = document.forms[0].comment.value;
      const details = document.querySelector('.details-text').innerHTML;
      const container = document.querySelector('.result');
      const message= document.createElement('div');
      const date = document.querySelector('.date').value;
      const divForm = document.querySelector('.form');
      divForm.innerHTML = '';
      message.classList.add('thanks');
      message.textContent = 'Thank you for your purchase! Product purchased!';
      container.appendChild(message);
      const purchaseInfo = document.createElement('div');
      container.appendChild(purchaseInfo);
      purchaseInfo.innerHTML = `<p><b>Information about order:</b> ${details}</p><p>Date of purchase: ${date}</p><p>Surname: ${surname}</p><p>First Name: ${firstName}</p><p>Patronymic: ${patronymic}</p><p>City: ${city}</p><p>Branch №: ${department}</p><p>Payment: ${payment}</p><p>Amount: ${amount}</p><p>Comment: ${comment}</p>`;
      const blockDiv = document.querySelector('.container');
      blockDiv.classList.add('block');

      //Save Orders
      const nameProdact = document.querySelector('.name').textContent;
      const priceProdact = document.querySelector('.price').textContent;
      const infoProdact = document.querySelector('.description').textContent;

      const ordersToSave = {id: Date.now(), date: date, nameProdact: nameProdact, price: priceProdact, description: infoProdact, surname: surname, firstName: firstName, patronymic: patronymic, city: city, department: department, payment: payment, amount: amount, comment: comment};
      arrLocalStorage.push(ordersToSave);
      localStorage.setItem('order', JSON.stringify(arrLocalStorage));

      const btn = document.createElement('button');
      btn.textContent = 'Back to main page';
      container.appendChild(btn);
      btn.addEventListener('click', function() {
        document.location.reload();
      });
    }
  });
};


showCategories();




