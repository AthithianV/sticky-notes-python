# Backend (FastAPI)

1. Clone the Repository

```
git clone <repository_url>
cd <project_folder/backend>
```

2. Create a Virtual Environment

```
python -m venv venv
venv\Scripts\activate
```

3. Install Dependencies

```
pip install -r requirements.txt
```

4. Set Environment Variables:
   1. Environment is not added to gitignore to keep use of it.
   2. In Mysql create a database `sticky_notes`. Create a user with name:`sticky_notes` and password:`123456`. Grant all PRIVILEGES for the new user to the `sticky_notes` database.
   ```
    CREATE DATABASE IF NOT EXISTS sticky_notes;
    CREATE USER 'sticky_notes'@'localhost' IDENTIFIED BY '123456';
    GRANT ALL PRIVILEGES ON sticky_notes.* TO 'sticky_notes'@'localhost';
   ```
5. Run Application `uvicorn main:app --host 127.0.0.1 --port 8000 --reload`

# Frontend (React)

1. After Cloning the repository, Change to `Frontend` directory.
2. Install Dependencies `npm install`.
3. Build Application `npm run build`.
4. Run Application `npm run preview`
