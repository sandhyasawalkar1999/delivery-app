🍕 Food Delivery Web App 🚀
A full-stack food delivery web application built using the MERN Stack (MongoDB, Express.js, React.js, Node.js). This app allows users to browse food items, add them to the cart, place orders, and track their delivery status. Admins can manage food items and update order statuses.

📌 Features
👤 User Features
✅ User Authentication – Secure login & signup with JWT.
✅ Browse Food Items – View available food items with images, categories & prices.
✅ Add to Cart & Checkout – Update cart, place orders & manage delivery details.
✅ Order Tracking – Users can track their order status.
✅ Responsive UI – Works seamlessly across mobile & desktop devices.

🛠 Admin Features
✅ Manage Food Items – Add, update, and delete food items.
✅ Order Management – View all orders and update their status.
✅ Dashboard – Overview of total orders, revenue, and user activities.

⚙️ Tech Stack
Frontend (React.js)
React.js (Hooks, Context API)

React Router for navigation

Axios for API calls

React Toastify for notifications

Tailwind CSS for styling

Backend (Node.js, Express.js)
Express.js for REST API

MongoDB & Mongoose for database

JWT authentication

Multer for image uploads

Database (MongoDB)
Stores user, food, and order details

CRUD operations for food items & orders

Hosting & Deployment
Frontend: Netlify / Vercel

Backend: Render / Vercel

Database: MongoDB Atlas

🚀 Installation Guide
1️⃣ Clone the Repository
sh
Copy
Edit
git clone https://github.com/sandhyasawalkar1999/food-delivery-app.git
cd food-delivery-app
2️⃣ Install Dependencies
Frontend
sh
Copy
Edit
cd client
npm install
npm start
Backend
sh
Copy
Edit
cd server
npm install
npm start
3️⃣ Setup Environment Variables
Create a .env file in the server/ folder and add:

ini
Copy
Edit
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
🎯 API Endpoints
🛒 Food APIs
GET /api/food/list – Fetch all food items

POST /api/food/add – Add a new food item (Admin)

DELETE /api/food/delete/:id – Delete a food item (Admin)

📦 Order APIs
POST /api/orders/place – Place an order

GET /api/orders/list-orders – Fetch all orders (Admin)

POST /api/orders/update-status – Update order status (Admin)

🔐 Authentication APIs
POST /api/auth/signup – Register new user

POST /api/auth/login – Login user & generate JWT

📷 Screenshots
🔹 Homepage
![image](https://github.com/user-attachments/assets/32af90cc-5e00-423f-a459-37c1e1f2159f)

🔹 Food Listing Page
![image](https://github.com/user-attachments/assets/fe98ca09-7bcb-4aa8-a9a0-86973e48aa30)

🔹 Cart & Checkout Page
![image](https://github.com/user-attachments/assets/c434e59f-0467-4fda-a599-847de17b8928)

🔹 payment page
![image](https://github.com/user-attachments/assets/b4680667-6bfb-4a30-b95f-f521e08abb1d)

🔹 Admin add Dashboard

![image](https://github.com/user-attachments/assets/9a26cf01-c66a-45aa-bd7b-a92c8f24d17f)

🔹 Admin list Dashboard
![image](https://github.com/user-attachments/assets/59465b37-38e7-4e9d-8501-c5baabdbd1a5)

🔹 Admin order Dashboard

![image](https://github.com/user-attachments/assets/48239639-55f2-4f40-baa8-1c4899bf15c1)




(Add images here)

🏆 Challenges & Learnings
Implementing secure authentication with JWT.

Handling CRUD operations efficiently.

Managing state & API calls effectively in React.

Deploying full-stack applications seamlessly.

📌 Future Improvements
✅ Payment Gateway Integration (Stripe/Razorpay)
✅ Live Order Tracking using WebSockets
✅ AI-based Food Recommendations

🙌 Contributing
Fork the repo

Create a new branch (feature-branch)

Commit your changes (git commit -m "Added a new feature")

Push your branch (git push origin feature-branch)

Create a Pull Request

📬 Contact
📧 Email: sandhyasawalkar1999@gmail.com
🐙 GitHub: sandhyasawalkar1999
🔗 LinkedIn: https://www.linkedin.com/in/sandhya-sawalkar-6224b21a6/

⭐ If you liked this project, don't forget to star the repo! 🚀✨

