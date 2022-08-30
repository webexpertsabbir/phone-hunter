const loadPhones = async(searchPhone, dataLimit) =>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchPhone}`;
    const res = await fetch(url);
    const data = await res.json();
    dispalyPhones(data.data, dataLimit)
}
const dispalyPhones = (phones, dataLimit) =>{
    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.textContent = '';
    // phones = phones.slice(0, 20);
    const showMorePhone = document.getElementById('show-more-phone');
    if(dataLimit && phones.length > 10){
        phones = phones.slice(0, 10);
        showMorePhone.classList.remove('d-none');
    }
    else{
        showMorePhone.classList.add('d-none');
    };


    const phoneWarning = document.getElementById('warning-massage');
    if(phones.length === 0){
        phoneWarning.classList.remove('d-none')
    }
    else{
        phoneWarning.classList.add('d-none')
    }
    phones.forEach(phone => {
        // console.log(phone);
        const phonesDiv = document.createElement('div');
        phonesDiv.classList.add('col');
        phonesDiv.innerHTML = `
            <div class="card">
                <img src="${phone.image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${phone.phone_name}</h5>
                    <p class="card-text">${phone.brand}</p>
                </div>
                <button onclick="loadPhonesDetails('${phone.slug}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
    Show Details
  </button>
             </div>
        `; 
        phonesContainer.appendChild(phonesDiv);

    });
    toggolSpinner(false);
}

const prosessSerach = (dataLimit) =>{
    toggolSpinner(true);
    const searchInputField = document.getElementById('search-input-field');
    const carentInputfield = searchInputField.value;
    // searchInputField.value = '';
    // console.log(carentInputfield);
    loadPhones(carentInputfield, dataLimit);
    
}

document.getElementById('search-btn').addEventListener('click', () =>{
    prosessSerach(10);
})

loadPhones('iphone');

const toggolSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if(isLoading){
        loaderSection.classList.remove('d-none');
    }
    else{
        loaderSection.classList.add('d-none');
    }
}

document.getElementById('btn-more-phone').addEventListener('click', () => {
    prosessSerach();
    // console.log('hello')

});

// input event handelar
document.getElementById('search-input-field').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        prosessSerach(10);
    }
});


const loadPhonesDetails = async id =>{
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    dispalyPhoneModal(data.data)
}

const dispalyPhoneModal = phone =>{
    console.log(phone);
    const dispalyTitle = document.getElementById('exampleModalLabel');
    dispalyTitle.innerText = `${phone.name}`;
    const phonesModalBody = document.getElementById('phones-modal-body');
    phonesModalBody.innerHTML = `
    <img src="${phone.image}">
    <p>Chip set: ${phone.mainFeatures.chipSet ? phone.mainFeatures.chipSet : 'No chip set'} </p>
    `;
}