const loadAnimation = document.getElementById('loading-start');

function showLoading() {
  loadAnimation.classList.add('show');
}

function hideLoading() {
  loadAnimation.classList.remove('show');
}

//! -------------------- Load Pet Category API --------------------
const loadPetCategoryDataByAPI = () => {
  fetch('https://openapi.programming-hero.com/api/peddy/categories')
    .then((response) => response.json())
    .then((data) => getPetCategoryButton(data.categories))
    .catch((error) => console.log(error));
};

//! -------------------- Active button --------------------
const activeButtonFunction = (btn) => {
  removeActiveButton();
  const activeButton = document.getElementById(`btn-${btn}`);
  activeButton.classList.add('active-button');
};
//! -------------------- Remove Active button --------------------
const removeActiveButton = () => {
  const buttons = document.getElementsByClassName('category-btn');
  // console.log(buttons);
  for (let button of buttons) {
    button.classList.remove('active-button');
  }
};
//! -------------------- Create Category Button --------------------
const clickedToGetCategory = (categoryId) => {
  // console.log(`Your val: ${categoryId}`)
  activeButtonFunction(categoryId);
  const petContainer = document.getElementById('pet-container');
  petContainer.innerHTML = '';
  showLoading();
  setTimeout(() => {
    fetch(
      `https://openapi.programming-hero.com/api/peddy/category/${categoryId}`
    )
      .then((response) => response.json())
      .then((data) => {
        hideLoading();
        getPetDetailsData(data.data);
      })
      .catch((error) => {
        hideLoading();
        console.log(error);
      });
  }, 2000);
};

const getPetCategoryButton = (categoryData) => {
  const petCategoryButtonContainer =
    document.getElementById('pet-category-btn');

  //? pet array data loop to get all item
  categoryData.forEach((petCategory) => {
    // console.log(petCategory.category);

    const petCategoryButton = document.createElement('div');
    petCategoryButton.innerHTML = `
        <button id="btn-${petCategory.category}" class="category-btn border md:flex md:flex-row items-center justify-center md:py-4 lg:px-16 md:px-8 py-2 px-6 rounded-lg hover:bg-gray-200 transition-all" onclick="clickedToGetCategory('${petCategory.category}')">
            
            <div class="mx-auto md:w-11 md:h-11 w-6 h-6"><img class="w-full h-full object-contain" src="${petCategory.category_icon}" alt="${petCategory.category}"></div>
            <p>${petCategory.category}</p>
        </button>
    `;

    // append
    petCategoryButtonContainer.appendChild(petCategoryButton);
  });
};

//! -------------------- Load All Pets Data --------------------
const loadPetDataByAPI = () => {
  showLoading();
  setTimeout(() => {
    fetch('https://openapi.programming-hero.com/api/peddy/pets')
      .then((response) => response.json())
      .then((data) => {
        hideLoading();
        getPetDetailsData(data.pets);
      })
      .catch((error) => {
        hideLoading();
        console.log(error);
      });
  }, 2000);
};

//! -------------------- Create All Pets Data And Information --------------------
const getPetDetailsData = (petData) => {
  const petContainer = document.getElementById('pet-container');
  petContainer.innerHTML = '';

  if (petData.length == 0) {
    petContainer.classList.remove('grid');
    petContainer.innerHTML = `
      <div class="mx-auto flex flex-col bg-gray-100 items-center justify-center rounded-lg h-full w-full md:px-10 md:py-16 space-y-5 py-8">
        <img src="./assets/error.webp" alt="no pet found">
        <h2 class="text-my-black lg:text-3xl text-2xl font-bold text-center">No Information Available</h2>
        <p class="text-center text-base text-gray-500 font-normal">
          It is a long established fact that a reader will be distracted by the readable content of a page when looking at 
          its layout. The point of using Lorem Ipsum is that it has a.
        </p>
      </div>
    `;
  } else {
    petContainer.classList.add('grid');
  }

  //? pet details data loop to get all data
  petData.forEach((dataDetails) => {
    // console.log(dataDetails);
    const card = document.createElement('div');
    card.classList = 'card card-compact shadow-xl';
    card.innerHTML = `
      <figure class="p-4 border-t border-l border-r">
        <img class="rounded-lg"
        src="${dataDetails.image ? dataDetails.image : 'Not Available'}"
        alt="${dataDetails.category} image" />
      </figure>

      <div class="card-body border-l border-r border-b rounded-lg">
        
        <h2 class="card-title">${
          dataDetails.pet_name ? dataDetails.pet_name : 'Not Available'
        }</h2>
        
        <div class="flex flex-col justify-center space-y-1">
          <!-- ----------------------------Div1---------------------------- -->
          <div class="flex flex-row gap-x-2 items-center">
            <svg class="text-gray-500" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20  20" fill="none">
            <g clip-path="url(#clip0_2081_39)">
            <path d="M3.33334 3.33337H8.33334V8.33337H3.33334V3.33337Z" stroke="#5A5A5A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M11.6667 3.33337H16.6667V8.33337H11.6667V3.33337Z" stroke="#5A5A5A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M3.33334 11.6666H8.33334V16.6666H3.33334V11.6666Z" stroke="#5A5A5A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M11.6667 14.1666C11.6667 14.8297 11.9301 15.4656 12.3989 15.9344C12.8677 16.4032 13.5036 16.6666 14.1667 16.6666C14.8297 16.6666 15.4656 16.4032 15.9344 15.9344C16.4033 15.4656 16.6667 14.8297 16.6667 14.1666C16.6667 13.5036 16.4033 12.8677 15.9344 12.3989C15.4656 11.93 14.8297 11.6666 14.1667 11.6666C13.5036 11.6666 12.8677 11.93 12.3989 12.3989C11.9301 12.8677 11.6667 13.5036 11.6667 14.1666Z" stroke="#5A5A5A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </g>
            <defs>
              <clipPath id="clip0_2081_39">
              <rect width="20" height="20" fill="white"/>
              </clipPath>
            </defs>
            </svg>

            <h4 class="text-gray-500 font-normal text-base">Breed: ${
              dataDetails.breed ? dataDetails.breed : 'Not Available'
            }</h4>
          </div>

          <!-- ----------------------------Div2---------------------------- -->
          <div class="flex flex-row gap-x-2 items-center">
            <svg class="text-gray-500" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M5.625 2.5V4.375M14.375 2.5V4.375M2.5 15.625V6.25C2.5 5.75272 2.69754 5.27581 3.04917 4.92417C3.40081 4.57254 3.87772 4.375 4.375 4.375H15.625C16.1223 4.375 16.5992 4.57254 16.9508 4.92417C17.3025 5.27581 17.5 5.75272 17.5 6.25V15.625M2.5 15.625C2.5 16.1223 2.69754 16.5992 3.04917 16.9508C3.40081 17.3025 3.87772 17.5 4.375 17.5H15.625C16.1223 17.5 16.5992 17.3025 16.9508 16.9508C17.3025 16.5992 17.5 16.1223 17.5 15.625M2.5 15.625V9.375C2.5 8.87772 2.69754 8.40081 3.04917 8.04917C3.40081 7.69754 3.87772 7.5 4.375 7.5H15.625C16.1223 7.5 16.5992 7.69754 16.9508 8.04917C17.3025 8.40081 17.5 8.87772 17.5 9.375V15.625" stroke="#5A5A5A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>

            <h4 class="text-gray-500 font-normal text-base">Birth: ${
              dataDetails.date_of_birth
                ? dataDetails.date_of_birth
                : 'Not Available'
            }</h4>
          </div>

          <!-- ----------------------------Div3---------------------------- -->
          <div class="flex flex-row gap-x-2 items-center">
            <svg class="text-gray-500" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <g opacity="0.7" clip-path="url(#clip0_2081_51)">
              <path d="M10 11.6666V17.5" stroke="#131313" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M7.5 15H12.5" stroke="#131313" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M10 5C10.8841 5 11.7319 5.35119 12.357 5.97631C12.9821 6.60143 13.3333 7.44928 13.3333 8.33333C13.3333 9.21739 12.9821 10.0652 12.357 10.6904C11.7319 11.3155 10.8841 11.6667 10 11.6667C9.11594 11.6667 8.2681 11.3155 7.64297 10.6904C7.01785 10.0652 6.66666 9.21739 6.66666 8.33333C6.66666 7.44928 7.01785 6.60143 7.64297 5.97631C8.2681 5.35119 9.11594 5 10 5Z" stroke="#131313" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M12.5 2.5C12.5 3.16304 12.2366 3.79893 11.7678 4.26777C11.2989 4.73661 10.663 5 10 5C9.33696 5 8.70107 4.73661 8.23223 4.26777C7.76339 3.79893 7.5 3.16304 7.5 2.5" stroke="#131313" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </g>
              <defs>
              <clipPath id="clip0_2081_51">
              <rect width="20" height="20" fill="white"/>
              </clipPath>
              </defs>
            </svg>

            <h4 class="text-gray-500 font-normal text-base">Gender: ${
              dataDetails.gender ? dataDetails.gender : 'Not Available'
            }</h4>
          </div>

          <!-- ----------------------------Div4---------------------------- -->
          <div class="flex flex-row gap-x-2 items-center">
            <svg class="text-gray-500" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <g clip-path="url(#clip0_2081_103)">
                <path d="M13.9167 6.66667C13.7508 6.19603 13.4479 5.7858 13.0469 5.48878C12.6459 5.19176 12.1652 5.02153 11.6667 5H8.33334C7.6703 5 7.03442 5.26339 6.56558 5.73223C6.09674 6.20107 5.83334 6.83696 5.83334 7.5C5.83334 8.16304 6.09674 8.79893 6.56558 9.26777C7.03442 9.73661 7.6703 10 8.33334 10H11.6667C12.3297 10 12.9656 10.2634 13.4344 10.7322C13.9033 11.2011 14.1667 11.837 14.1667 12.5C14.1667 13.163 13.9033 13.7989 13.4344 14.2678C12.9656 14.7366 12.3297 15 11.6667 15H8.33334C7.8348 14.9785 7.3541 14.8082 6.95312 14.5112C6.55214 14.2142 6.24922 13.804 6.08334 13.3333" stroke="#5A5A5A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M10 2.5V5M10 15V17.5" stroke="#5A5A5A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </g>
              <defs>
                <clipPath id="clip0_2081_103">
                  <rect width="20" height="20" fill="white"/>
                </clipPath>
              </defs>
            </svg>

            <h4 class="text-gray-500 font-normal text-base">Price: ${
              dataDetails.price ? dataDetails.price : 'Not Available'
            }</h4>
          </div>
          <div class="divider"></div>
        </div>
 
        <!-- Like button -->
        <div  class="flex flex-row items-center justify-between">
          <button onclick="addImageRightSide('${
            dataDetails.image
          }')" class="text-pet-paste text-base font-bold border px-5 py-2 rounded-md hover:border-pet-paste transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M5.5275 8.54163C6.19917 8.54163 6.805 8.16996 7.22 7.64163C7.86688 6.81631 8.67893 6.13511 9.60417 5.64163C10.2067 5.32163 10.7292 4.84496 10.9817 4.21246C11.159 3.76933 11.2501 3.29642 11.25 2.81913V2.29163C11.25 2.12587 11.3159 1.96689 11.4331 1.84968C11.5503 1.73247 11.7092 1.66663 11.875 1.66663C12.3723 1.66663 12.8492 1.86417 13.2008 2.2158C13.5525 2.56743 13.75 3.04435 13.75 3.54163C13.75 4.50163 13.5333 5.41079 13.1475 6.22329C12.9258 6.68829 13.2367 7.29163 13.7517 7.29163M13.7517 7.29163H16.3567C17.2117 7.29163 17.9775 7.86996 18.0683 8.72079C18.1058 9.07246 18.125 9.42913 18.125 9.79163C18.1284 12.0719 17.3492 14.2843 15.9175 16.0591C15.5942 16.4608 15.095 16.6666 14.58 16.6666H11.2333C10.8308 16.6666 10.43 16.6016 10.0475 16.475L7.4525 15.6083C7.07009 15.4811 6.66968 15.4164 6.26667 15.4166H4.92M13.7517 7.29163H11.875M4.92 15.4166C4.98917 15.5875 5.06417 15.7541 5.145 15.9183C5.30917 16.2516 5.08 16.6666 4.70917 16.6666H3.9525C3.21167 16.6666 2.525 16.235 2.30917 15.5266C2.02054 14.5793 1.87422 13.5944 1.875 12.6041C1.875 11.31 2.12084 10.0741 2.5675 8.93913C2.8225 8.29413 3.4725 7.91663 4.16667 7.91663H5.04417C5.4375 7.91663 5.665 8.37996 5.46084 8.71663C4.74908 9.88825 4.37369 11.2332 4.37584 12.6041C4.37584 13.5991 4.56917 14.5483 4.92084 15.4166H4.92Z" stroke="#131313" stroke-opacity="0.6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          
          <button id="adoptPetBtn${dataDetails.petId}" onclick="adoptPet('${
      dataDetails.petId
    }')" class=" text-pet-paste text-base font-bold border px-5 py-2 rounded-md hover:bg-pet-paste hover:text-white transition-all">Adopt</button>

          <button onclick="loadDetails('${
            dataDetails.petId
          }')" class="text-pet-paste text-base font-bold border px-5 py-2 rounded-md hover:bg-pet-paste hover:text-white transition-all">Details</button>
        </div>
      </div>
    `;

    // append child
    petContainer.appendChild(card);
    // console.log(dataDetails);
  });
};

//! -------------------- Get Pet ID For Modal --------------------
const loadDetails = async (petId) => {
  // console.log(petId);
  // console.log(data);
  const url = `https://openapi.programming-hero.com/api/peddy/pet/${petId}`;
  const response = await fetch(url);
  const data = await response.json();
  showDetails(data.petData);
};

//! -------------------- Show Modal --------------------
const showDetails = (modalDetails) => {
  // console.log(modalDetails);
  // document.getElementById('showModalData').click();
  const modalDetailsContainer = document.getElementById('modal-content');
  modalDetailsContainer.innerHTML = `
    <img class="rounded-lg" src="${modalDetails.image}" alt="image">
    <h2 class="text-my-black font-bold text-xl">${modalDetails.pet_name}</h2>

    <div class="grid grid-cols-2 grid-rows-3">
      <!-- ----------------------------Div1---------------------------- -->
          <div class="flex flex-row gap-x-2 items-center">
            <svg class="text-gray-500" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20  20" fill="none">
            <g clip-path="url(#clip0_2081_39)">
            <path d="M3.33334 3.33337H8.33334V8.33337H3.33334V3.33337Z" stroke="#5A5A5A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M11.6667 3.33337H16.6667V8.33337H11.6667V3.33337Z" stroke="#5A5A5A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M3.33334 11.6666H8.33334V16.6666H3.33334V11.6666Z" stroke="#5A5A5A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M11.6667 14.1666C11.6667 14.8297 11.9301 15.4656 12.3989 15.9344C12.8677 16.4032 13.5036 16.6666 14.1667 16.6666C14.8297 16.6666 15.4656 16.4032 15.9344 15.9344C16.4033 15.4656 16.6667 14.8297 16.6667 14.1666C16.6667 13.5036 16.4033 12.8677 15.9344 12.3989C15.4656 11.93 14.8297 11.6666 14.1667 11.6666C13.5036 11.6666 12.8677 11.93 12.3989 12.3989C11.9301 12.8677 11.6667 13.5036 11.6667 14.1666Z" stroke="#5A5A5A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </g>
            <defs>
              <clipPath id="clip0_2081_39">
              <rect width="20" height="20" fill="white"/>
              </clipPath>
            </defs>
            </svg>

            <h4 class="text-gray-500 font-normal text-base">Breed: ${
              modalDetails.breed ? modalDetails.breed : 'Not Available'
            }</h4>
          </div>

          <!-- ---------------------------- Div2 ---------------------------- -->
          <div class="flex flex-row gap-x-2 items-center">
            <svg class="text-gray-500" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <g opacity="0.7" clip-path="url(#clip0_2081_51)">
              <path d="M10 11.6666V17.5" stroke="#131313" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M7.5 15H12.5" stroke="#131313" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M10 5C10.8841 5 11.7319 5.35119 12.357 5.97631C12.9821 6.60143 13.3333 7.44928 13.3333 8.33333C13.3333 9.21739 12.9821 10.0652 12.357 10.6904C11.7319 11.3155 10.8841 11.6667 10 11.6667C9.11594 11.6667 8.2681 11.3155 7.64297 10.6904C7.01785 10.0652 6.66666 9.21739 6.66666 8.33333C6.66666 7.44928 7.01785 6.60143 7.64297 5.97631C8.2681 5.35119 9.11594 5 10 5Z" stroke="#131313" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M12.5 2.5C12.5 3.16304 12.2366 3.79893 11.7678 4.26777C11.2989 4.73661 10.663 5 10 5C9.33696 5 8.70107 4.73661 8.23223 4.26777C7.76339 3.79893 7.5 3.16304 7.5 2.5" stroke="#131313" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </g>
              <defs>
              <clipPath id="clip0_2081_51">
              <rect width="20" height="20" fill="white"/>
              </clipPath>
              </defs>
            </svg>

            <h4 class="text-gray-500 font-normal text-base">Gender: ${
              modalDetails.gender ? modalDetails.gender : 'Not Available'
            }</h4>
          </div>

          <!-- ---------------------------- Div3 ---------------------------- -->
          <div class="flex flex-row gap-x-2 items-center">
            <svg class="text-gray-500" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <g opacity="0.7" clip-path="url(#clip0_2081_51)">
              <path d="M10 11.6666V17.5" stroke="#131313" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M7.5 15H12.5" stroke="#131313" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M10 5C10.8841 5 11.7319 5.35119 12.357 5.97631C12.9821 6.60143 13.3333 7.44928 13.3333 8.33333C13.3333 9.21739 12.9821 10.0652 12.357 10.6904C11.7319 11.3155 10.8841 11.6667 10 11.6667C9.11594 11.6667 8.2681 11.3155 7.64297 10.6904C7.01785 10.0652 6.66666 9.21739 6.66666 8.33333C6.66666 7.44928 7.01785 6.60143 7.64297 5.97631C8.2681 5.35119 9.11594 5 10 5Z" stroke="#131313" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M12.5 2.5C12.5 3.16304 12.2366 3.79893 11.7678 4.26777C11.2989 4.73661 10.663 5 10 5C9.33696 5 8.70107 4.73661 8.23223 4.26777C7.76339 3.79893 7.5 3.16304 7.5 2.5" stroke="#131313" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </g>
              <defs>
              <clipPath id="clip0_2081_51">
              <rect width="20" height="20" fill="white"/>
              </clipPath>
              </defs>
            </svg>

            <h4 class="text-gray-500 font-normal text-base">Vaccinated status: ${
              modalDetails.vaccinated_status
                ? modalDetails.vaccinated_status
                : 'Not Available'
            }</h4>
          </div>

          <!-- ---------------------------- Div4 ---------------------------- -->
          <div class="flex flex-row gap-x-2 items-center">
            <svg class="text-gray-500" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M5.625 2.5V4.375M14.375 2.5V4.375M2.5 15.625V6.25C2.5 5.75272 2.69754 5.27581 3.04917 4.92417C3.40081 4.57254 3.87772 4.375 4.375 4.375H15.625C16.1223 4.375 16.5992 4.57254 16.9508 4.92417C17.3025 5.27581 17.5 5.75272 17.5 6.25V15.625M2.5 15.625C2.5 16.1223 2.69754 16.5992 3.04917 16.9508C3.40081 17.3025 3.87772 17.5 4.375 17.5H15.625C16.1223 17.5 16.5992 17.3025 16.9508 16.9508C17.3025 16.5992 17.5 16.1223 17.5 15.625M2.5 15.625V9.375C2.5 8.87772 2.69754 8.40081 3.04917 8.04917C3.40081 7.69754 3.87772 7.5 4.375 7.5H15.625C16.1223 7.5 16.5992 7.69754 16.9508 8.04917C17.3025 8.40081 17.5 8.87772 17.5 9.375V15.625" stroke="#5A5A5A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>

            <h4 class="text-gray-500 font-normal text-base">Birth: ${
              modalDetails.date_of_birth
                ? modalDetails.date_of_birth
                : 'Not Available'
            }</h4>
          </div>

          <!-- ---------------------------- Div5 ---------------------------- -->
          <div class="flex flex-row gap-x-2 items-center">
            <svg class="text-gray-500" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <g clip-path="url(#clip0_2081_103)">
                <path d="M13.9167 6.66667C13.7508 6.19603 13.4479 5.7858 13.0469 5.48878C12.6459 5.19176 12.1652 5.02153 11.6667 5H8.33334C7.6703 5 7.03442 5.26339 6.56558 5.73223C6.09674 6.20107 5.83334 6.83696 5.83334 7.5C5.83334 8.16304 6.09674 8.79893 6.56558 9.26777C7.03442 9.73661 7.6703 10 8.33334 10H11.6667C12.3297 10 12.9656 10.2634 13.4344 10.7322C13.9033 11.2011 14.1667 11.837 14.1667 12.5C14.1667 13.163 13.9033 13.7989 13.4344 14.2678C12.9656 14.7366 12.3297 15 11.6667 15H8.33334C7.8348 14.9785 7.3541 14.8082 6.95312 14.5112C6.55214 14.2142 6.24922 13.804 6.08334 13.3333" stroke="#5A5A5A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M10 2.5V5M10 15V17.5" stroke="#5A5A5A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </g>
              <defs>
                <clipPath id="clip0_2081_103">
                  <rect width="20" height="20" fill="white"/>
                </clipPath>
              </defs>
            </svg>

            <h4 class="text-gray-500 font-normal text-base">Price: ${
              modalDetails.price ? modalDetails.price : 'Not Available'
            }</h4>
          </div>

    </div>


    <h2 class="text-my-black font-semibold text-base">Details Information</h2>
    <p class="text-gray-500 font-normal text-base">${
      modalDetails.pet_details
    }</p>
  `;
  document.getElementById('customModal').showModal();
};

//! -------------------- Add img to right section --------------------

const addImageRightSide = (image) => {
  // console.log('working');
  const imageURL = image;
  const createImage = document.createElement('img');
  createImage.src = imageURL;
  if (image === undefined) {
    createImage.classList.add('hidden');
  } else {
    createImage.classList.remove('hidden');
    createImage.classList.add('rounded-lg', 'md:w-auto', 'w-full');
  }
  document.getElementById('like-container').appendChild(createImage);
};

//! -------------------- Adopt use pet us --------------------
document.addEventListener('DOMContentLoaded', function () {
  const adoptButtons = document.querySelectorAll("[id^='adoptPetBtn']");

  adoptButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const petId = button.id.replace('adoptPetBtn', '');
      adoptPet(petId);
    });
  });
});
const adoptPet = (pet) => {
  const modal = document.getElementById('adopt-pet');
  const countdownElement = document.getElementById('countdown');

  // Show the modal
  document.documentElement.classList.add('modal-open');
  modal.classList.add('modal-open'); // Ensure modal is visible

  let countdown = 3;
  countdownElement.textContent = countdown;

  // Countdown logic
  const intervalId = setInterval(() => {
    countdown -= 1;
    countdownElement.textContent = countdown;

    if (countdown === 0) {
      clearInterval(intervalId);
      // Hide the modal after countdown
      document.documentElement.classList.remove('modal-open');
      modal.classList.remove('modal-open');
      // Disable the button
      const adoptButton = document.getElementById(`adoptPetBtn${pet}`);
      adoptButton.disabled = true;
      adoptButton.classList.add('btn-disabled', 'gray-color'); // Optionally add a disabled class styling
    }
  }, 1000);
};

//! -------------------- Sort --------------------
document.getElementById('sort-price').addEventListener('click', function () {
  sortByPrice();
});
const sortByPrice = () => {
  fetch('https://openapi.programming-hero.com/api/peddy/pets')
    .then((response) => response.json())
    .then((data) => {
        const sortedData = data.pets.sort((a, b) => b.price - a.price);
        getPetDetailsData(sortedData);
    })
    .catch((error) => {
        console.log(error);
    });
};

/* const adoptPet = (pet) => {
  // console.log(`adoptPetBtn${pet}`);
  const adoptButton = document.getElementById(`adoptPetBtn${pet}`);
  const modal = document.getElementById('adopt-pet');
  const countdownElement = document.getElementById('countdown');
  adoptButton.addEventListener('click', () => {
    // Show the modal
    document.documentElement.classList.add('modal-open');
    modal.classList.add('modal-open'); // Ensure modal is visible

    let countdown = 3;
    countdownElement.textContent = countdown;

    // Countdown logic
    const intervalId = setInterval(() => {
      countdown -= 1;
      countdownElement.textContent = countdown;

      if (countdown === 0) {
        clearInterval(intervalId);
        // Hide the modal after countdown
        document.documentElement.classList.remove('modal-open');
        modal.classList.remove('modal-open');
        // Disable the button
        adoptButton.disabled = true;
        adoptButton.classList.add('btn-disabled', 'gray-color'); // Optionally add a disabled class styling
      }
    }, 1000);
  });
}; */

loadPetCategoryDataByAPI();
loadPetDataByAPI();
