# TeamUp — How to run the project

Step-by-step instructions to run the **TeamUp** MVP (Django API + React frontend).

## What you need

- **Python 3.10+** ([python.org](https://www.python.org/downloads/))
- **Node.js 18+** and npm ([nodejs.org](https://nodejs.org/))

---

## Step 1: Open a terminal for the backend

1. Open **PowerShell** or **Command Prompt**.
2. Go to the backend folder:

   ```powershell
   cd path\to\teamup\backend
   ```

   Example (adjust if your path differs):

   ```powershell
   cd E:\purna\ghost\teamup\backend
   ```

---

## Step 2: Set up Python and install dependencies

1. Create a virtual environment (first time only):

   ```powershell
   python -m venv venv
   ```

2. Activate it:

   **PowerShell:**

   ```powershell
   .\venv\Scripts\Activate.ps1
   ```

   **Command Prompt:**

   ```cmd
   venv\Scripts\activate.bat
   ```

3. Install packages:

   ```powershell
   pip install -r requirements.txt
   ```

---

## Step 3: Create the database (first time only)

With the virtual environment still active:

```powershell
python manage.py migrate
```

This creates `db.sqlite3` in the `backend` folder.

---

## Step 4: Start the Django server

```powershell
python manage.py runserver
```

Leave this window open. The API runs at **http://127.0.0.1:8000/**.

You can check:

- List teammates: [http://127.0.0.1:8000/api/users/](http://127.0.0.1:8000/api/users/)

---

## Step 5: Open a second terminal for the frontend

1. Open a **new** terminal (keep the backend running).
2. Go to the frontend folder:

   ```powershell
   cd path\to\teamup\frontend
   ```

   Example:

   ```powershell
   cd E:\purna\ghost\teamup\frontend
   ```

---

## Step 6: Install frontend dependencies (first time only)

```powershell
npm install
```

---

## Step 7: Start the React dev server

```powershell
npm run dev
```

Vite will print a local URL (usually **http://localhost:5173**). Open it in your browser.

The dev server **proxies** `/api` to Django, so you do not need to change URLs while developing.

---

## Step 8: Use the app

1. **Register** — add your name, college, skills, and what you are looking for.
2. **View Teammates** — see everyone; use **Search** by skill or **Show all**.

---

## Optional: test the API from PowerShell

With the backend running:

```powershell
$body = @{
  name = 'Test User'
  college = 'Example University'
  skills = 'Python, React'
  looking_for = 'Designer for a hackathon'
} | ConvertTo-Json

Invoke-RestMethod -Uri http://127.0.0.1:8000/api/register/ -Method Post -Body $body -ContentType 'application/json'
Invoke-RestMethod -Uri http://127.0.0.1:8000/api/users/ -Method Get
Invoke-RestMethod -Uri 'http://127.0.0.1:8000/api/search/?skill=Python' -Method Get
```

---

## Troubleshooting

| Problem | What to try |
|--------|-------------|
| `pip` / `python` not found | Install Python and tick “Add Python to PATH”, or use `py -m pip` / `py manage.py`. |
| Port **8000** in use | `python manage.py runserver 8001` and set `VITE_API_URL` (see below). |
| Port **5173** in use | Vite will suggest another port; open the URL it prints. |
| Frontend cannot reach API | Ensure Django is running first. For `npm run preview`, create `frontend/.env` with `VITE_API_URL=http://127.0.0.1:8000`. |
| PowerShell won’t run scripts | Run: `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` (once), or use Command Prompt for activation. |

---

## Project layout (short)

- **`backend/`** — Django project, SQLite DB, REST API under `/api/`.
- **`frontend/`** — React app (Vite).

For code details, browse those folders from the `teamup` directory above this `readme` folder.
