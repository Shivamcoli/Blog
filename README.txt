📝 Personal Blog Platform

A full-stack personal blog platform built with:

- 🌐 Frontend: Next.js 14 + TypeScript + CSS (custom)
- ⚙️ Backend: FastAPI (Python)
- 🔒 JWT-based authentication
- ✍️ Users can sign up, log in, and create/view posts

------------------------------------------------------------

🚀 Features

- User Signup & Login
- JWT-based Authentication
- Create and View Posts
- Responsive UI with clean styling
- Token stored in browser localStorage

------------------------------------------------------------

🧰 Tech Stack

| Layer     | Tech                        |
|-----------|-----------------------------|
| Frontend  | Next.js 14, React, TypeScript |
| Styling   | Plain CSS (custom)           |
| Backend   | FastAPI (Python 3.10+)       |
| Auth      | JWT (JSON Web Token)         |
| Storage   | In-memory or JSON file       |

------------------------------------------------------------

📦 Requirements

- Node.js ≥ 18.x
- Python ≥ 3.10
- pip or virtualenv for backend
- npm (Node Package Manager)

------------------------------------------------------------

🛠️ Setup Instructions

1. Clone the Repository
   git clone https://github.com/your-username/personal-blog.git
   cd personal-blog

2. Install Dependencies

   Frontend (Next.js)
   cd frontend
   npm install

   Backend (FastAPI)
   cd backend
   python -m venv venv
   source venv/bin/activate   # Windows: venv\Scripts\activate
   pip install -r requirements.txt

   If requirements.txt doesn't exist, create it manually:
   fastapi
   uvicorn
   python-jose

3. Run the Project

   Backend (FastAPI)
   cd backend
   uvicorn main:app --reload --port 5000
   → Runs at: http://localhost:5000

   Frontend (Next.js)
   cd frontend
   npm run dev
   → Runs at: http://localhost:3000

4. Test Flow

   - Sign up at /signup
   - Redirect to /login after signup
   - Login and go to /dashboard
   - Create & view posts

------------------------------------------------------------

🗂️ Project Structure

personal-blog/
├── backend/
│   └── main.py
├── frontend/
│   └── src/
│       └── app/
│           ├── signup/
│           ├── login/
│           ├── dashboard/
│           └── styles/
└── README.txt

------------------------------------------------------------

🙋‍♂️ Contributing

Pull requests and stars are welcome.
Open issues for bugs or suggestions.

------------------------------------------------------------

📄 License

This project is open source under the MIT License.