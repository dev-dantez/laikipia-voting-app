# Laikipia Voting App

A web application designed to facilitate secure, transparent, and user-friendly voting for the Laikipia Youth Extravaganza. The project features a simple frontend interface for voters and a backend API to collect and store votes.

## Features

- **Simple Vote Submission:** Users can vote for nominees in several categories (DJ, Dancer, Influencer, Photographer).
- **Nominee Images:** Visual cards for each nominee.
- **Backend API:** Stores votes in MongoDB, validates submissions.
- **CORS Protection:** Only allows requests from known origins.
- **Clear, Responsive UI:** Built with Tailwind CSS for modern design.

## Tech Stack

- **Frontend:** HTML, Tailwind CSS, Vanilla JavaScript
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (via Mongoose)
- **Hosting:** Frontend (Netlify), Backend (Render)

## Folder Structure

```
laikipia-voting-app/
├── frontend/
│   ├── index.html
│   ├── script.js
│   └── images/
│       └── nominee images (e.g., dj_icef (1).jpg, COMFORTERS DANCE CREW.jpg)
├── backend/
│   ├── models/
│   │   └── Vote.js
|   |   --- Nominee.js
│   ├── routes/
│   │   └── VoteRoutes.js
│   └── server.js
```

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- MongoDB instance (local or cloud)

### Backend Setup

1. **Install dependencies:**  
   ```bash
   cd backend
   npm install
   ```

2. **Configure environment variables:**  
   Create a `.env` file in `backend/` with:
   ```
   MONGO_URI=your_mongodb_connection_string
   PORT=5000
   ```

3. **Start backend server:**  
   ```bash
   npm start
   ```
   The API runs at `http://localhost:5000`.

### Frontend Setup

1. **Open `frontend/index.html` in a browser**  
   (Or host the `frontend` folder on Netlify or similar.)

2. **Voting:**  
   - Fill in your choices for each category and submit.

## Development Notes

- Images for nominees should be placed in `frontend/images/` and referenced in `index.html`.
- The backend only allows votes if all categories are selected.
- CORS is enforced—only requests from whitelisted domains are accepted.

## Contributing

Contributions are welcome!  
- Fork this repo, create a branch, commit your changes, and open a pull request.
- For bug reports or feature requests, open an issue.

## License

MIT License

## Contact

Questions or feedback?  
- Open an issue on GitHub
- Contact: [dev-dantez](mailto:danielwanjiru837@gmail.com)

---

**Empowering Laikipia with secure, transparent, and modern voting technology.**
