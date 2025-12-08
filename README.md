README FOR FRONTEND REPOSITORY (Vue.js + GitHub Pages)

CST3144 Coursework – Frontend (Vue.js + GitHub Pages)

This repository contains the Vue.js frontend for the CST3144 Full Stack Coursework.
The app connects to the backend using the Fetch API (Promises only), exactly as required.

It displays lessons, supports sorting, searching, adding to cart, checkout, and updates lesson spaces via the backend.

🌍 Live Frontend

🔗 https://duhakasim.github.io/CST3144-frontend//

📌 Required Coursework Links
Component	Link

Frontend GitHub Repo	https://github.com/DuhaKasim/CST3144-frontend

Frontend GitHub Pages	https://duhakasim.github.io/CST3144-frontend/

🧩 Frontend Features (Matching Coursework Requirements)
✔ Display Lessons (7%)

At least 10 lessons

Each includes:

subject

location

price

spaces

Font Awesome icon or image

Rendered using v-for

✔ Sorting (10%)

User can sort by:

subject

location

price

spaces
Each supports:

ascending

descending

✔ Add to Cart (5%)

Visible for all lessons

Enabled only if spaces > 0

Reduces space by 1 on click

Disabled when spaces = 0

✔ Shopping Cart (5%)

Cart button enabled only when at least 1 item added

Toggles between lessons page and cart page

Shows all items added

User can remove items → restores space in lessons list

✔ Checkout (6%)

Located on cart page

Name = letters only

Phone = numbers only

Validated using JavaScript (regex)

On submit:

POST order to backend

PUT update spaces in backend

Shows confirmation message

✔ Search Functionality (10%)

Your implementation uses:

Approach 2 (7%) – Search handled in backend

User can search by any field

Uses GET /search?query= route

Frontend fetches results and displays them

No external libraries

Includes search-as-you-type (3%) if implemented

🧪 Frontend Fetch Functions (9%)

GET: fetch lessons

POST: submit order

PUT: update lesson spaces

All implemented using fetch() + promises, no Axios.

📁 Project Structure
frontend/
│── src/
│     ├── components/
│     ├── views/
│     └── App.vue
│── public/
│── package.json



🛠 Technologies

Vue.js

JavaScript (ES6)

Fetch API (Promises only)

GitHub Pages

Images
