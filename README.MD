
# Peddy Pet Adoption Platform

Pets are our best friends, they are our leisure time companions. We thought about you and let me present to you mine latest project pet adoption platform.

* Here you can find your desire pet. You can see specific pet by their category like (cat, dog, rabbit, bird).
* You can like the pet what you want and it's add your right section.
* I create a cute virtual pet adopt button if you press the button you'll adopt this pet by virtually 😄
* And there are details button for you, if you willing to know all information.
* Sometimes it's may be hard for you to find pet by your budget so i added ascending & descending button, so you can find your pet by your budget 😀.



## 5 key features of the project

- Fully responsive mobile, tablet, desktop
- Showing pet by their category (using API)
- Liked photo added to a container
- Virtual adoupt for fun
- Show pet by descending price


## ES6 features used

**Basic:** Arrow functions, Template Literals, For/each, Set Objects, Function Rest Parameter, Array entries()

**API:** Promises, setInterval, fetch


## Live link for the project

[Peddy](https://peddy-pet-adoption-platform-assignment-6-es6.surge.sh/)

## Installation

Requirment: [Node js](https://nodejs.org/en/download/package-manager)

just install tailwind & daisyui requirment

```bash
  npm install -D tailwindcss
  npm i -D daisyui@latest
```

## API Reference (Programming Hero)

#### Fetch All Pets

```http
  https://openapi.programming-hero.com/api/peddy/pets
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `pets` | `array` | Retrieves a list of all available pets for adoption. The data includes details like pet name, type, age, and adoption status.|

#### Fetch Pet Details by ID

```http
  https://openapi.programming-hero.com/api/peddy/pet/1
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `pet-id`      | `string` | Fetches detailed information for a specific pet based on its ID. This can be used to view additional information about the pet such as vacination history, description |

#### Fetch All Pet Categories

```http
  https://openapi.programming-hero.com/api/peddy/categories
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `category`      | `string` | Fetches a list of all pet categories available in the platform, such as dogs, cats, rabbit , bird, etc. |

#### Fetch Pets by Category

```http
  https://openapi.programming-hero.com/api/peddy/category/dog
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `categoryName`      | `string` | Fetches data of pets under a specific category, in this case, dogs. This can be used to filter pets based on their category. |
