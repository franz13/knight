# Knight's Tour Game

Joc cu mutarea calului pe o tablă de NxN (Knight's Tour), fullstack (React + Node.js).

## Pornire locală

1. Instalează dependențele de bază în folderul principal:
   ```bash
   npm install
   ```
2. Instalează dependențele frontend:
   ```bash
   cd frontend
   npm install
   cd ..
   ```
3. Pornește backend-ul:
   ```bash
   npm run start
   ```
4. Într-un alt terminal, pornește frontend-ul:
   ```bash
   npm run client
   ```
5. Accesează [http://localhost:3000](http://localhost:3000)

## Funcționalități

- Alegi dimensiunea tablei (4x4, 5x5, etc).
- Treci calul pe tablă conform regulilor.
- Jocul se termină când nu mai ai mutări sau completezi toată tabla.

## Structură fișiere

- `backend/server.js` — API Node.js/Express.
- `frontend/src` — React components.