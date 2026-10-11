# Naic Municipal Library System — Full Project Documentation

> Complete technical documentation for the **Naic Municipal Library System**, a full-stack digital library platform for managing books, borrowing, members, visitors, deposits and AI-assisted reading experiences.
>
> Repository: `https://github.com/CollinsMatela/Library-System`
> Generated from the current source tree (backend + frontend).

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack](#2-tech-stack)
3. [Architecture & Project Structure](#3-architecture--project-structure)
4. [Features](#4-features)
5. [User Roles & Access Control](#5-user-roles--access-control)
6. [Backend API Reference](#6-backend-api-reference)
7. [Database Schemas](#7-database-schemas)
8. [Configuration & Middleware](#8-configuration--middleware)
9. [Frontend Documentation](#9-frontend-documentation)
10. [Environment Variables](#10-environment-variables)
11. [Setup & Installation](#11-setup--installation)
12. [Rate Limiting](#12-rate-limiting)
13. [Deployment](#13-deployment)
14. [Third-Party Services](#14-third-party-services)
15. [Known Issues, Bugs & Notes](#15-known-issues-bugs--notes)

---

## 1. Project Overview

The **Naic Municipal Library System** is a web application that digitizes the operations of a municipal library. It has two distinct audiences:

- **Library members** — students, teachers and guests, who can browse the catalog, read books (with images, recorded audio, text-to-speech and AI-generated videos), borrow titles, take quizzes, manage their account and receive notifications.
- **Library staff** — librarians and administrators across four privilege tiers (`assistant librarian`, `it librarian`, `head librarian`, `system administrator`), who manage the catalog, inventory, borrowing workflow, ID deposits, the visitor logbook, member accounts and staff authority.

The project is a **monorepo** split into two independent applications:

| Folder | Application | Purpose |
|---|---|---|
| `backend/` | Express 5 REST API + MongoDB (Mongoose) | Data, auth, business logic, AI generation, uploads, email |
| `frontend/` | React 19 + Vite SPA | User interface for members and staff |

The root `package.json` is an empty stub (`{}`) and holds no scripts or dependencies — each app is installed and run independently.

---

## 2. Tech Stack

### 2.1 Backend (`backend/package.json`)

| Category | Technology | Version |
|---|---|---|
| Runtime | Node.js (ESM — `"type": "module"`) | — |
| Web framework | Express | ^5.2.1 |
| Database | MongoDB via Mongoose | ^9.4.1 |
| Auth | jsonwebtoken | ^9.0.3 |
| Password hashing | bcrypt | ^6.0.0 |
| Rate limiting | express-rate-limit | ^8.6.1 |
| File uploads | multer + multer-storage-cloudinary | ^2.1.1 / ^4.0.0 |
| Media storage | cloudinary | ^1.41.3 |
| AI — text | groq-sdk | ^1.3.0 |
| AI — video | @fal-ai/client | ^1.10.1 |
| AI — Google | @google/genai | ^2.10.0 |
| Email | resend | ^6.20.0 |
| PDF parsing | pdf-parse | ^1.1.1 |
| ID generation | nanoid | ^5.1.9 |
| HTTP client | axios | ^1.15.0 |
| CORS | cors | ^2.8.6 |
| Env config | dotenv | ^17.4.1 |
| Dev tooling | nodemon | ^3.1.14 |

**Scripts:** `npm start` → `node server.js`; `npm run dev` → `nodemon server.js`.

### 2.2 Frontend (`frontend/package.json`)

| Category | Technology | Version |
|---|---|---|
| UI library | React + React DOM | ^19.2.4 |
| Build tool | Vite | ^8.0.1 |
| Styling | Tailwind CSS (+ `@tailwindcss/vite`) | ^4.2.2 |
| Routing | react-router-dom | ^7.13.2 |
| State management | zustand | ^5.0.12 |
| HTTP client | axios | ^1.15.0 |
| Rich text editor | react-quill-new | ^3.8.3 |
| Rich text (alt) | @tiptap/core + extensions | ^3.31.3 |
| HTML sanitizing | dompurify | ^3.4.16 |
| Charts | apexcharts + react-apexcharts | ^5.13.0 / ^2.1.0 |
| OCR | tesseract.js | ^7.0.0 |
| Icons | lucide-react | ^1.17.0 |
| Notifications | react-toastify | ^11.1.0 |
| Headless UI primitives | @radix-ui/react-dropdown-menu, @radix-ui/react-popover, @floating-ui/react | — |
| Utilities | clsx, lodash.throttle, react-hotkeys-hook | — |
| Dev tooling | eslint, @vitejs/plugin-react, sass-embedded, class-variance-authority, @base-ui/react | — |

**Scripts:** `dev` → `vite`; `build` → `vite build`; `lint` → `eslint .`; `preview` → `vite preview`.

### 2.3 External Services

| Service | Used for |
|---|---|
| MongoDB (Atlas or local) | Primary datastore |
| Cloudinary | Image/audio/video storage and delivery |
| Groq (`openai/gpt-oss-20b`) | Story summarization + moral generation |
| fal.ai (`fal-ai/wan/v2.2-a14b/image-to-video/lora`) | AI image-to-video page animation |
| Resend | Transactional/contact email |
| Vercel | Hosting for both apps |
| Web Speech API | In-browser text-to-speech (frontend only) |
| Tesseract.js | In-browser OCR (frontend only) |

---

## 3. Architecture & Project Structure

### 3.1 High-level architecture

```
┌─────────────────────────────┐         ┌──────────────────────────────┐
│  Frontend (React + Vite)    │  HTTP   │  Backend (Express 5)         │
│  - Members + Staff SPAs     │ ──────► │  - REST API on port 5000     │
│  - Zustand auth store       │  JSON   │  - JWT issuance              │
│  - Cloudinary direct upload │         │  - Mongoose models           │
└───────────┬─────────────────┘         └───────┬───────────┬──────────┘
            │                                   │           │
            │ unsigned upload                   │           │ API calls
            ▼                                   ▼           ▼
     ┌─────────────┐                    ┌───────────┐  ┌───────────────┐
     │ Cloudinary  │◄───────────────────│  MongoDB  │  │ Groq / fal.ai │
     └─────────────┘   backend uploads  └───────────┘  └───────────────┘
```

- **Backend** is a classic layered MVC-style Express app: `routes → controllers → models`, with `config/`, `middleware/` and `services/` for cross-cutting concerns.
- **Frontend** talks to the API using `VITE_API_URL`, and uploads media **directly** to Cloudinary using an unsigned upload preset (`VITE_CLOUDINARY_*`). The backend also uploads to Cloudinary for avatars and AI-generated videos.
- **Auth** is JWT-based. Tokens are issued by the login endpoints and stored in a persisted Zustand store; role-based access is enforced **client-side** by `ProtectedRoute`.

### 3.2 Backend structure

```
backend/
├── server.js                 # App entry: env, Cloudinary, DNS, middleware, routes, listen(5000)
├── package.json              # ESM, dependencies, start/dev scripts
├── vercel.json               # @vercel/node build of server.js
├── .env                      # Secrets (not committed in real deployments)
├── .gitignore
├── ReadMe.md                 # Developer scratch notes
├── config/
│   ├── cloudinary.js         # Cloudinary client + connectCloudinary()
│   ├── groq.js               # Groq client
│   ├── multer.js             # Disk storage for image/audio uploads (200 MB, uploads/)
│   └── multerPdf.js          # Disk storage for PDF uploads (uploads/pdfs)
├── middleware/
│   └── rateLimiter.js        # All express-rate-limit limiters
├── controllers/              # ~50 request handlers (one concern each)
│   ├── Login_Controller.js
│   ├── Admin_LoginController.js
│   ├── User_Registration_Controller.js
│   ├── Change_Password_Controller.js
│   ├── Borrow_Controller.js / ApproveBorrowController.js / ReturnBorrowController.js / ...
│   ├── Fetch_*_Controller.js # Read handlers
│   ├── SummarizationController.js
│   ├── VideoController.js / SavePageVideoController.js
│   ├── DepositController.js
│   ├── LogBookController.js
│   ├── NotificationController.js
│   ├── Member_Controller.js
│   └── ...
├── models/                   # 16 Mongoose schemas (see §7)
├── routes/                   # 35 route modules, all mounted at "/"
├── services/
│   └── emailServices.js      # Resend email sender
└── uploads/                  # Local multer destination (images/audio; pdfs subfolder)
```

### 3.3 Frontend structure

> Note: the source tree is **not** fully under `src/`. Only `src/App.jsx`, `src/main.jsx`, `src/index.css` and `src/assets/` live in `src/`; the page/component folders sit at the `frontend/` root, which is why `App.jsx` imports `../pages/...`.

```
frontend/
├── index.html                # App shell (title "Naic Municipal Library")
├── package.json              # React 19 + Vite, scripts
├── vite.config.js            # react() + tailwindcss() plugins
├── eslint.config.js          # Flat ESLint config
├── jsconfig.json             # Empty (unused)
├── vercel.json               # SPA rewrites → /index.html
├── mockdata.js               # Static option lists reused by forms
├── public/                   # favicon, icons, logo
├── src/
│   ├── App.jsx               # Router + ProtectedRoute + all routes
│   ├── main.jsx              # React root
│   ├── index.css             # Tailwind import + base styles
│   ├── scss.d.ts             # SCSS module declaration stub
│   └── assets/               # Images, logo, library map, placeholder faces, intro audio
├── pages/                    # Route-level screens
│   ├── BookInformation_Component/   # Edit/Preview components for a book
│   ├── BookPage_Component/          # AdvancedSearch
│   ├── Borrowing_Components/        # Pending/Approved/Borrowed/History tables
│   └── UploadPage_Components/       # Upload form pieces
├── library_components/       # Member-facing components (catalog, readers, quiz, borrow)
│   └── CatalogPage_Component/
├── components/               # Shared/admin components
│   └── registration/         # Multi-step registration wizard
├── modals/                   # Dialog components
├── popup/                    # Confirmation / credentials popups
├── charts/                   # ApexCharts wrappers (currently unused)
├── toasts/                   # Toast placeholders (app uses react-toastify directly)
├── loadings/                 # Loading overlay
├── store/
│   └── useAuthStore.js       # Zustand auth store (persisted)
└── utils/                    # ocr, speech, readerHelpers, cloudinary, typeEffect
```

### 3.4 Request lifecycle (backend)

1. Request arrives at Express (port 5000).
2. Global middleware: `cors` (frontend origin) → `express.json` → `express.urlencoded`.
3. Per-request lazy **MongoDB connect** middleware (`connectDB()` guarded so it runs once).
4. Route-specific rate limiter middleware (if applied).
5. Controller executes business logic → Mongoose model query/mutation.
6. Controller sends JSON response.

---

## 4. Features

### 4.1 Authentication & Accounts

- **Member login** (`POST /login`) — email + password, bcrypt verification, JWT issued (1 hour).
- **Admin login** (`POST /admin-login`) — librarian/admin accounts from a separate model, JWT issued (1 hour).
- **Self-registration wizard** — a 4-step wizard collecting user type, personal info, optional parent/guardian info (< 18) and a review screen. On success, generates a random 10-char temporary password and returns it for the member to use.
- **First-time password change** — flags (`isChangePassword`) route new members/librarians to a forced password screen.
- **Change password** — requires the current password; enforces complexity (min 12 chars, upper + lower + digit + special).
- **Avatars** — member avatar upload (Cloudinary) and admin avatar update (URL or upload).
- **Persistent session** — auth state stored in `localStorage` under `auth-storage`.

### 4.2 Catalog & Book Management

- **Book catalog** with advanced search (categories, fields, subjects, grade levels, language, author, publisher, ISBN, DDC, etc.) and pagination.
- **Manual upload** of books with category-specific metadata (literature/fiction, non-fiction, educational, work, reference, children's).
- **Inventory** management with availability status (`Available`, `Borrowed`, `Reserved`, `Lost`, `Damaged`).
- **Edit & preview** book information and pages, with a **rich-text page editor** (Quill).
- **Per-page media** — each page can hold text (`pageText`), an image (`pageImage`), recorded audio (`pageAudio`) and a generated video (`pageVideo`).
- **OCR** — admins can extract text from a page image (Tesseract, Filipino + English) directly into the editor.

### 4.3 Borrowing Workflow

- Members submit borrow requests; the system blocks duplicate active requests for the same user + book.
- Full admin lifecycle: **Pending → Approved → Borrowed → Returned**, plus **Rejected/Removed**.
- Copy/stock handling: requests validate against `copies`; returning a book restores stock.
- Borrow status timeline with due-date urgency shown to members.
- **ID deposit** capture when lending and its return.

### 4.4 Library Operations

- **Visitor logbook** — register visitors (name, address, contact, purpose) and record leave time.
- **Notifications** — a per-recipient feed with types `Book Upload`, `Pending`, `Approved`, `Borrowed`, `Removed`, `Due`, `Over Due`; entries auto-expire after **7 days** (TTL index).
- **Email** — contact/inquiry email sent through Resend.
- **Member & staff management** — list/delete member accounts, add/remove librarians and change their roles.

### 4.5 AI Features

- **Story summarization** — Groq `openai/gpt-oss-20b` generates a summary + moral from a story's page texts and persists it to the book (`POST /ai-summarization`).
- **Page video generation** — fal.ai `wan/v2.2-a14b` animates a page illustration into a short video (`POST /video-generation`), which can then be saved (permanently stored on Cloudinary) via `PUT /save-page-video`.

### 4.6 Reading Experience (frontend)

- **Two reader modes** chosen by category:
  - *Story/literature reader* — page images, recorded audio playback, per-page video, Tagalog/English intro audio, text-to-speech with pause/resume/auto-advance, captions, swipe gestures and a lightbox.
  - *Text reader* — page navigation, progress bar, A-/A+ text size, alignment, bold/italic, and single-page read-aloud.
- **Text-to-speech** via the Web Speech API (`fil-PH` / `en-US`).
- **Quizzes** — multiple-choice story quizzes with instant feedback and a scored result modal.
- **Mark as read** support (model present).

### 4.7 Dashboards & UI

- Admin overview with stat cards (users, materials, borrow requests, logbook) and a "newest book" panel.
- Reusable advanced-search panel, notification modal, confirmation popups, loading overlays and toast notifications.
- Chart components (ApexCharts line/donut) and an analytics card exist but are currently unused.

---

## 5. User Roles & Access Control

### 5.1 Member roles (`User_Registration_Model.role`)

| Role | Description |
|---|---|
| `student` | Student member |
| `teacher` | Teacher member |
| `guest` | Guest member |

### 5.2 Staff roles (`Librarian_Model.role`)

| Role | Description |
|---|---|
| `assistant librarian` | Lowest staff tier (view catalog, logbook, profile) |
| `it librarian` | Can also manage uploads and inventory |
| `head librarian` | Can also manage borrowing |
| `system administrator` | Full access, including user management and staff authority |

### 5.3 Frontend route access matrix

Access is enforced by `ProtectedRoute` in `src/App.jsx` (client-side). Routes are grouped by increasing restriction:

| Route | student / teacher / guest | assistant librarian | it librarian | head librarian | system administrator |
|---|:---:|:---:|:---:|:---:|:---:|
| Public (`/`, `/login`, `/admin-login`, `/registration`, `/unauthorized`, 404) | ✅ | ✅ | ✅ | ✅ | ✅ |
| `/library/*`, `/change-password` | ✅ | — | — | — | — |
| `/admin`, `/admin/log-book`, `/admin/catalog`, `/admin/book-information/:id`, `/admin/profile/:id`, `/admin-change-password` | — | ✅ | ✅ | ✅ | ✅ |
| `/admin/upload-book`, `/admin/edit`, `/admin/inventory` | — | — | ✅ | ✅ | ✅ |
| `/admin/borrow-book` | — | — | — | ✅ | ✅ |
| `/admin/users`, `/admin/authority` | — | — | — | — | ✅ |

**Guard logic:** no `token` → redirect to `/`; no `role` or role not in `allowedRoles` → redirect to `/unauthorized`.

### 5.4 Backend authorization

> ⚠️ **The backend does not enforce authorization.** There is no auth middleware, no `Authorization` header parsing, and `jwt.verify` is never called. All endpoints are effectively public and rely entirely on the frontend guard. See [§15](#15-known-issues-bugs--notes).

---

## 6. Backend API Reference

- Base URL (local): `http://localhost:5000`
- All routers are mounted at `"/"`, so paths below are absolute.
- **Total: 49 endpoints across 35 route modules, plus one inline health check (`GET /`) = 50 routes.**
- Rate limiter names refer to `backend/middleware/rateLimiter.js` (see [§12](#12-rate-limiting)).

### 6.1 Auth mechanism summary

| | Member (`/login`) | Admin (`/admin-login`) |
|---|---|---|
| Model | `User_Registration_Model` (`User_Model`) | `Librarian_Model` |
| Matched by | `email` | `email` |
| Password | bcrypt compare | bcrypt compare |
| JWT payload | `{ id: user.id, role: user.role }` | `{ id: librarian._id, role: librarian.role }` |
| Expiry | `1h` | `1h` |
| Secret | `JWT_SECRET` | `JWT_SECRET` |
| Response | `{ isSuccess, message, token, user, role }` | `{ message, isSuccess, librarian, role, token }` |

> Both login responses include the full account document **including the hashed password field**. The token is expected to be sent as `Authorization: Bearer <token>`, but the server ignores it.

---

### Module 1 — Authentication & Registration

#### `POST /register-user`
- **Rate limiter:** `registrationLimiter`
- **Controller:** `User_Registration_Controller.js`
- **Purpose:** Register a new library user (student/teacher/guest).
- **Request (JSON):** `role`, `lastname`, `firstname`, `middlename`, `year`, `month`, `day`, `homeAddress`, `city`, `email`, `contact`, `institution` (required); optional `extensionname`, `age`, `sex`, `parentName`, `parentContact`, `parentRelationship`. If `age < 18`, the three parent fields are required. `contact`/`parentContact` must match `/^09\d{9}$/`.
- **Success (201):** `{ message: "User registered successfully", isSuccess: true, account: { name, role, username, password } }` (`username` = email; `password` is the plaintext generated default).
- **Errors:** `409` "The email is already existing."; `409` "Fill all required information."; `400` "Parent/Guardian information is required."; `400` "Invalid contact number."; `400` "Invalid parent contact number."; `500` "Internal server error: Error registrating user".
- **Notes:** Random 10-char password via `nanoid(10)`, bcrypt-hashed (10 rounds), `id` = `crypto.randomUUID()`. **No email** is sent — the temp password is returned in the response.

#### `POST /login`
- **Rate limiter:** `loginLimiter`
- **Controller:** `Login_Controller.js`
- **Purpose:** Authenticate a regular user and issue a JWT.
- **Request (JSON):** `email`, `password`.
- **Success (200):** `{ isSuccess: true, message: "Successfully logged in <role>", token, user, role }`.
- **Errors:** `404` "User not found"; `401` "Login failed. Please try again."; `401` "Invalid credentials or user not found"; `500` "Internal Server Error".

#### `POST /admin-login`
- **Rate limiter:** none
- **Controller:** `Admin_LoginController.js`
- **Purpose:** Authenticate a librarian/admin and issue a JWT.
- **Request (JSON):** `email`, `password`.
- **Success (200):** `{ message: "successfully login", isSuccess: true, librarian, role, token }`.
- **Errors:** `400` "Incomplete Credential"; `404` "Librarian cannot found"; `401` "Login failed. Please try again."; `500` "Internal Server Error".

#### `POST /first-password`
- **Rate limiter:** `changePassLimiter`
- **Controller:** `Change_Password_Controller.js` → `firstTime_Password`
- **Purpose:** Set a member's password on first login.
- **Request (JSON):** `id`, `role`, `newPassword` (`id`, `newPassword` required).
- **Success (200):** `{ message: "Successfully changed password", isSuccess: true }`.
- **Errors:** `400` "Missing required fields"; `404` "User not found"; `400` "Invalid Role"; `500` "Internal Server Error: First time Password".
- **Notes:** Accepts roles `student`, `teacher`, `guest`; sets `isChangePassword: true`.

#### `POST /change-password`
- **Rate limiter:** `changePassLimiter`
- **Controller:** `Change_Password_Controller.js` → `ChangePassword`
- **Purpose:** Change a member's password (requires current password).
- **Request (JSON):** `id`, `currentPassword`, `newPassword`.
- **Success (200):** `{ message: "successfully changed password." }`.
- **Errors:** `400` "New Password did not match the requirements."; `400` "The user can't found."; `400` "Current password does not match."; `500` "Internal Server Error: Change Password".
- **Notes:** New password must match `/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{12,}$/`.

#### `POST /admin-first-password`
- **Rate limiter:** `changePassLimiter`
- **Controller:** `Change_Password_Controller.js` → `Admin_FirstPassword`
- **Purpose:** Set a librarian/admin password on first login.
- **Request (JSON):** `id`, `role`, `newPassword`.
- **Success (200):** `{ message: "Successfully changed password", isSuccess: true }`.
- **Errors:** `400` missing fields; `404` "Librarian not found"; `400` "Invalid Role"; `500`.
- **Notes:** Accepts roles `system administrator`, `head librarian`, `it librarian`, `assistant librarian`.

#### `POST /admin-change-password`
- **Rate limiter:** `changePassLimiter`
- **Controller:** `Change_Password_Controller.js` → `Admin_ChangePassword`
- **Purpose:** Change a librarian/admin password.
- **Request (JSON):** `id`, `currentPassword`, `newPassword`.
- **Success (200):** `{ message: "successfully changed password." }`.
- **Errors:** `400` password requirements; `400` "The user can't found."; `400` "Current password does not match."; `500`.

#### `POST /set-avatar`
- **Rate limiter:** `updateLimiter`
- **Controller:** `Change_Avatar_Controller.js`
- **Purpose:** Upload and set a member avatar via Cloudinary.
- **Request:** `multipart/form-data`, single file field **`avatar`**; body `userId`, `role`.
- **Success (200):** `{ message: "Avatar updated successfully", user }`.
- **Errors:** `400` "Avatar is required"; `400` "Invalid role"; `500` "Internal Server Error".
- **Notes:** Only `student` (→ `User_Registration_Model`) and `teacher` (→ `Employee_Registration_Model`) accepted; uploads buffer to Cloudinary.

---

### Module 2 — Users & Students

#### `GET /get-users`
- **Rate limiter:** `generalLimiter` · **Controller:** `Fetch_Users_Controller.js`
- **Purpose:** List all regular users. Password excluded (`.select("-password")`).
- **Success (200):** `{ message: "Successfully fetched users", users: [...] }` · **Errors:** `500` "Internal server error".

#### `DELETE /delete-student/:id`
- **Rate limiter:** `deleteLimiter` · **Controller:** `Delete_Student_Controller.js`
- **Request:** path `id` (Mongo `_id`).
- **Success (200):** `{ message: "Student deleted successfully" }` · **Errors:** `404` "Student not found"; `500`.

#### `PUT /update-student-account/:id`
- **Rate limiter:** `updateLimiter` · **Controller:** `Edit_Student_Controller.js`
- **Request:** path `id`; JSON body `lastname, firstname, middlename, extensionname, year, month, day, sex, email, contact, parentName, parentContact, parentRelationship`.
- **Success (200):** `{ message: "Student account updated successfully", updatedStudent }` · **Errors:** `404` "Student not found"; `500`.

---

### Module 3 — Books & Catalog

#### `POST /upload-manually`
- **Rate limiter:** `createLimiter` · **Controller:** `Upload_Manully_Controller.js`
- **Purpose:** Create a book record (JSON, no file upload).
- **Request (JSON):** `category`, `title` (required); optional `field, author, description, language, publication, publisher, isbn, illustrator, moral, edition, volume, ddc, copies, callNumber, subject, gradeLevel, series, donatedFrom, receivedDate, addedById`.
- **Success (201):** `{ success: true, message: "Book uploaded successfully", book }` · **Errors:** `500` `{success:false, message}`.
- **Notes:** `copies` cast with `Number()`; stored in `Books_Model`.

#### `GET /get-books`
- **Rate limiter:** `generalLimiter` · **Controller:** `Fetch_Books_Controller.js`
- **Purpose:** Fetch all books, newest first.
- **Success (200):** `{ message: "Successfully fetched books", isSucess: true, books: [...] }` (note the misspelled `isSucess`) · **Errors:** `500`.

#### `GET /get-book/:id`
- **Rate limiter:** `generalLimiter` · **Controller:** `Fetch_BookById_Controller.js`
- **Request:** path `id` (Mongo `_id`).
- **Success (200):** `{ message: "Successfully fetch <title>", book }` · **Errors:** `404` "Book not found"; `500` "Internal Error".

#### `GET /get-story/:id`
- **Rate limiter:** `generalLimiter` · **Controller:** `Fetch_One_Story_Controller.js`
- **Purpose:** Fetch a book/story by the model's custom `id` field (not `_id`).
- **Success (200):** `{ message: "Successfully fetched <title>", story }` · **Errors:** `400` "The story ID is null"; `404` "Story not found"; `500`.

#### `PUT /update-page`
- **Rate limiter:** `updateLimiter` · **Controller:** `EditBookPageController.js`
- **Purpose:** Update a single embedded page (fiction or non-fiction).
- **Request (JSON):** `bookId`, `pageId`, `pageText`, `pageImage`, `pageAudio`.
- **Success (200):** `{ message: "Fiction:Page updated successfully", updatedPage }` or `"Non-Fiction: Page updated successfully"`.
- **Errors:** `404` "Book not found"; `404` "Page not found"; `500`.
- **Notes:** Tries `Fiction_Model`, then `NonFiction_Model`; updates nested page by subdocument `_id`.

#### `PUT /update-book/:bookId`
- **Rate limiter:** `updateLimiter` · **Controller:** `EditBookInformationController.js`
- **Request:** path `bookId`; JSON `bookDetails` (object `$set` onto the book).
- **Success (200):** `{ message: "Book Updated Successfully", book }` · **Errors:** `404` "Book not found"; `404` "Book information is empty."; `404` "Failed to update book information"; `500`.

#### `DELETE /delete-book/:bookId`
- **Rate limiter:** `deleteLimiter` · **Controller:** `DeleteBookController.js`
- **Success (200):** `{ message: "Fiction book deleted successfully" }` · **Errors:** `404` "Book not found"; `500`.

---

### Module 4 — Borrowing Workflow

#### `POST /request-borrow`
- **Rate limiter:** `createLimiter` · **Controller:** `Borrow_Controller.js`
- **Request (JSON):** `userId`, `name`, `bookId`.
- **Success (200):** `{ message: "Successfully Request the Book" }`.
- **Errors:** `404` "Book is not found"; `400` "Already in process."; `500` "Internal Error: Error Borrow Request".
- **Notes:** Blocks a new request if one already exists for the same `userId`+`bookId` with status `Pending`, `Approved` or `Borrowed`. Status defaults to `Pending`.

#### `GET /get-borrow/:userId`
- **Rate limiter:** `generalLimiter` · **Controller:** `Fetch_BorrowById_Controller.js`
- **Success (200):** `{ message: "Borrow requests retrieved successfully.", request: [...] }` · **Errors:** `500`.

#### `GET /fetch-all-borrow`
- **Rate limiter:** `generalLimiter` · **Controller:** `Fetch_AllBorrow_Controller.js`
- **Success (200):** `{ message: "Fetched all borrowing", borrows: [...] }` · **Errors:** `500` "Internal Error".

#### `PUT /update-borrow`
- **Rate limiter:** `updateLimiter` · **Controller:** `Update_Borrow_Controller.js`
- **Purpose:** Update a borrow request (dates, status, quantity) and adjust book stock.
- **Request (JSON):** `id`, `borrowDate`, `returnDate`, `status`, `quantity`, `bookId`, `userId`.
- **Success (200):** `{ message: "Borrow request updated successfully.", user }`.
- **Errors:** `400` "Request ID is required."; `400` "User not found."; `400` "Book not required."; `400` "Not enough copies available."; `404` "Borrow request not found."; `500`.
- **Notes:** Validates `book.copies >= quantity`. See bug in [§15](#15-known-issues-bugs--notes) regarding always-decrementing copies.

#### `PUT /approve-borrow`
- **Rate limiter:** `updateLimiter` · **Controller:** `ApproveBorrowController.js`
- **Request (JSON):** `id`, `userId`, `status`.
- **Success (200):** `{ message: "Borrow request is approved successfully.", borrowRequest }`.
- **Errors:** `400` "Borrow Id is not existing"; `400` "User cant be found."; `404` "Borrow request not found."; `500`.
- **Notes:** Imports `sendEmail` but never calls it.

#### `PUT /return-borrow`
- **Rate limiter:** `updateLimiter` · **Controller:** `ReturnBorrowController.js`
- **Request (JSON):** `id`, `status`.
- **Success (200):** `{ message: "Book returned successfully.", borrow }`.
- **Errors:** `400` "Borrow request ID is required."; `404` "Borrow request not found."; `500`.
- **Notes:** Increments the book's `copies` by `borrowRequest.quantity`.

#### `DELETE /delete-user-request/:id`
- **Rate limiter:** `deleteLimiter` · **Controller:** `DeleteUserRequestController.js`
- **Success (200):** `{ message: "Successfully deleted borrow request." }` · **Errors:** `400` "Book Id is not found"; `500`.

#### `DELETE /delete-request/:requestId`
- **Rate limiter:** none (limiter imported but not applied) · **Controller:** `DeleteBorrow_Controller.js`
- **Success (200):** `{ message: "Successfully deleted the request" }` · **Errors:** `400` "Missing Request Id Found"; `404` "Borrow request not found"; `500`.

---

### Module 5 — Deposits

#### `POST /deposit-id`
- **Rate limiter:** none · **Controller:** `DepositController.js` → `createDeposit`
- **Request (JSON):** `userId`, `idType`, `idNumber`, `idName`, `receivedBy` (all required).
- **Success (201):** `{ success: true, message: "Deposit created successfully" }`.
- **Errors:** `400` "All fields are required"; `400` "The user already has a held deposit"; `500`.
- **Notes:** Blocks a second deposit while one is `held`.

#### `GET /get-deposits`
- **Rate limiter:** none · **Controller:** `DepositController.js` → `getDeposits`
- **Success (200):** `{ message: "Deposits retrieved successfully", deposits: [...] }` · **Errors:** `500`.

#### `PUT /return-deposit/:id`
- **Rate limiter:** none · **Controller:** `DepositController.js` → `returnDeposit`
- **Request:** path `id`; JSON `firstname`, `lastname`.
- **Success (200):** `{ message: "Deposit returned successfully", deposit }`.
- **Errors:** `400` "All fields are required"; `404` "Deposit not found"; `400` "Deposit has already been returned"; `500`.
- **Notes:** Sets `status: "returned"`, `returnedDate`, `returnedBy`.

---

### Module 6 — Visitor Logbook

#### `POST /register-visitor`
- **Rate limiter:** `createLimiter` · **Controller:** `LogBookController.js`
- **Request (JSON):** `name`, `address`, `contact`, `purpose`; optional `leaveTime`.
- **Success (201):** `{ success: true, message: "Visitor registered successfully.", visitor }` · **Errors:** `400` "Please fill in all required fields."; `500`.

#### `GET /get-all-logbook`
- **Rate limiter:** `generalLimiter` · **Controller:** `FetchLogBookController.js`
- **Success (200):** `{ message: "Successfully fetched logbook", logBookList: [...] }` · **Errors:** `500`.

#### `PUT /update-leave`
- **Rate limiter:** `updateLimiter` · **Controller:** `UpdateLeaveController.js`
- **Request (JSON):** `id`.
- **Success (200):** `{ message: "Successfully updated leaving time of visitor." }` · **Errors:** `400` "ID is required."; `500`.
- **Notes:** Sets `leaveTime` to the current timestamp.

---

### Module 7 — Notifications

> `NotificationModel` fields: `recipient`, `type` (enum: `Book Upload`, `Pending`, `Approved`, `Borrowed`, `Removed`, `Due`, `Over Due`), `title`, `message`, `requestId`. Documents auto-expire after **7 days** (TTL index). None of these routes apply a limiter.

#### `GET /fetch-notifications`
- **Controller:** `NotificationController.js` → `FetchNotification`
- **Success (200):** `{ message: "Successfully fetched notification", notifications: [...] }` · **Errors:** `400` "No found notifications"; `500`.

#### `POST /upload-notification`
- **Controller:** `NotificationController.js` → `BookUploadNotification`
- **Request (JSON):** `bookTitle`.
- **Success (200):** `{ message: "Successfully created upload notification" }` · **Errors:** `500`.
- **Notes:** Broadcast (`recipient: null`, `type: "Book Upload"`).

#### `POST /approved-notification`
- **Controller:** `NotificationController.js` → `ApprovedNotification`
- **Request (JSON):** `userId`.
- **Success (200):** `{ message: "Successfully created upload notification" }` · **Errors:** `500`.
- **Notes:** `type: "Approved"`.

#### `POST /borrowed-notification`
- **Controller:** `NotificationController.js` → `BorrowedNotification`
- **Request (JSON):** `userId`, `bookTitle`, `returnDate`, `requestId`.
- **Success (200):** `{ message: "Successfully created borrowed notification" }` · **Errors:** `500`.

#### `POST /due-notifications`
- **Controller:** `NotificationController.js` → `DueNotification`
- **Request (JSON):** `borrows` (array of borrow objects with `returnDate`, `userId`, `_id`, `title`).
- **Success (200):** `{ message: "Successfully created due notification" }` or `{ message: "No borrows to process" }` · **Errors:** `500`.
- **Notes:** Splits into `Over Due` and `Due` (≤ 3 days away) and de-duplicates by `recipient + type + requestId`.

#### `POST /removed-notification`
- **Controller:** `NotificationController.js` → `RemoveRequestNotification`
- **Request (JSON):** `userId`.
- **Success (200):** `{ message: "Successfully removed upload notification" }` · **Errors:** `500`.

---

### Module 8 — Email

#### `POST /send-email`
- **Rate limiter:** none · **Controller:** `EmailController.js` → `SendEmailController`
- **Request (JSON):** `userId`, `subject`, `message` (all required).
- **Success:** **No response is sent on success** (client request hangs) — see [§15](#15-known-issues-bugs--notes).
- **Errors:** `400` "All fields are required."; `400` "SendEmailController: User not found."; `500` "Internal Error".
- **Notes:** Sends **from** `Naic Municipal Library <onboarding@resend.dev>` **to the hard-coded** `naicwebsitelibrary@gmail.com` (not the user's address).

---

### Module 9 — Members / Librarian Management

> `Librarian_Model` fields: `lastname`, `firstname`, `middlename`, `suffix`, `role`, `email`, `contact`, `password`, `isChangePassword`, `avatar`. No limiters on any route.

#### `GET /fetch-members`
- **Controller:** `Member_Controller.js` → `Fetch_Members_Controller`
- **Success (200):** `{ message: "Successfully fetched all members", members: [...] }` (password excluded) · **Errors:** `500`.

#### `POST /add-member`
- **Controller:** `Member_Controller.js` → `Add_Member_Controller`
- **Request (JSON):** `{ form: { lastname, firstname, middlename?, suffix?, role, email, contact } }` — note the `form` wrapper.
- **Success (201):** `{ message: "Member added successfully.", librarian, tempPassword }`.
- **Errors:** `400` "Please complete all required fields."; `409` "A member with this email already exists."; `500`.
- **Notes:** Random `nanoid(10)` password, bcrypt-hashed, email lowercased, plaintext temp password returned. No email sent.

#### `DELETE /delete-member/:id`
- **Controller:** `Member_Controller.js` → `Delete_Member_Controller`
- **Success (200):** `{ message: "Successfully deleted account", isSuccess: true }` · **Errors:** `400`; `404` "Librarian account not found"; `500`.

#### `PUT /update-role-librarian/:id`
- **Controller:** `Member_Controller.js` → `Update_Role_Librarian_Controller`
- **Request:** path `id`; JSON `role`.
- **Success (200):** `{ message: "Successfully changed librarian role" }` · **Errors:** `400` "Librarian ID is required."; `400` "Librarian role is required."; `404` "Librarian is not found."; `500`.

---

### Module 10 — Admin Profile / Account

#### `GET /admin-profile/:id`
- **Rate limiter:** `generalLimiter` · **Controller:** `Admin_ProfileController.js` → `FetchAdminProfileController`
- **Success (200):** `{ message: "Successfully fetched admin profile", admin }` · **Errors:** `400` "Missing admin id"; `404` "Admin not found"; `500`.

#### `PUT /update-admin-avatar/:id`
- **Rate limiter:** `updateLimiter` · **Controller:** `Admin_ProfileController.js` → `UpdateAdminProfileController`
- **Request:** path `id`; JSON `avatar` (URL string).
- **Success (200):** `{ message: "Avatar updated successfully", updatedAdmin }` · **Errors:** `400` "Missing admin id"; `400` "Missing admin avatar"; `404` "Admin not found"; `500`.
- **Notes:** Stores the avatar string directly (no Cloudinary upload here).

---

### Module 11 — AI Features

#### `POST /ai-summarization`
- **Rate limiter:** `AISummarizationLimiter` · **Controller:** `SummarizationController.js`
- **Purpose:** Generate a summary + moral for a children's story.
- **Request (JSON):** `bookId`, `title`, `language`, `texts` (array of page strings) — all required.
- **Success (200):** `{ message: "Successfully summarized the book.", summary }`.
- **Errors:** `400` "BookId, Title, Texts and Language are required."; `404` "Book not found."; `429` "AI service limit reached."; `500` "Failed to summarize the story.".
- **Notes:** Groq model `openai/gpt-oss-20b`; persists result to `book.moral`.

#### `POST /video-generation`
- **Rate limiter:** `AIVideoLimiter` · **Controller:** `VideoController.js`
- **Purpose:** Generate an AI animated video from a page illustration.
- **Request (JSON):** `bookId`, `pageId`, `pageIndex`, `image` (public `http(s)` URL), `prompt`, `aspectRatio` (optional: `16:9`, `9:16`, `1:1`; default `16:9`).
- **Success (200):** `{ message: "Successfully generated a video", video: "<fal.ai video url>" }`.
- **Errors:** `400` "All video generation fields are required."; `400` "The page image must be a public URL."; `422` (fal.ai unprocessable); `500`.
- **Notes:** fal.ai `fal-ai/wan/v2.2-a14b/image-to-video/lora`, `num_frames: 56`, `frames_per_second: 16`.

#### `PUT /save-page-video`
- **Rate limiter:** `updateLimiter` · **Controller:** `SavePageVideoController.js`
- **Purpose:** Persist a generated video to Cloudinary and the page.
- **Request (JSON):** `bookId`, `pageId`, `videoUrl`.
- **Success (200):** `{ message: "Video saved successfully.", pageVideo }`.
- **Errors:** `400` "bookId, pageId and videoUrl are required."; `404` "Book or page not found."; `500` "Failed to save the video.".
- **Notes:** Uploads to Cloudinary (`resource_type: "video"`, folder `page-videos`); deletes the asset if the page isn't found.

---

### Module 12 — Misc / Account

#### `PATCH /update-user-avatar`
- **Rate limiter:** `generalLimiter` · **Controller:** `MyAccountController.js` → `ChangeProfileController`
- **Request (JSON):** `userId`, `newProfile` (avatar value).
- **Success (200):** `{ message: "Successfully update profile.", updatedUser }` · **Errors:** `400` "Missing userId and image file."; `400` "User was not found."; `500`.

#### `GET /`
- **Rate limiter:** none · **Handler:** inline in `server.js`
- **Success (200):** plain text `Hello, World!` (health check).

---

## 7. Database Schemas

All models live in `backend/models/`. Collection names are inferred by Mongoose (lowercased, pluralized) unless overridden. Unless noted, `timestamps: true` is enabled.

> ⚠️ **Collection collision:** `Books_Model` (model `"Books"`) and `Inventory_Model` (model `"Book"`) both map to the **`books`** collection — two schemas over one collection.

### 7.1 `Books_Model.js` — model `Books` → `books`
**Purpose:** Master/catalog book document backing the reader (pages with text/image/audio/video).

| Field | Type | Required | Default | Notes |
|---|---|---|---|---|
| category | String | ✅ | — | |
| title | String | ✅ | — | |
| author | String | ❌ | `""` | |
| description | String | ❌ | `""` | |
| language | String | ❌ | `""` | |
| publication | String | ❌ | `""` | |
| publisher | String | ❌ | `""` | |
| isbn | String | ❌ | `""` | |
| copies | Number | ❌ | `1` | `min: 1` |
| callNumber | String | ❌ | `""` | |
| donatedFrom | String | ❌ | `""` | |
| receivedDate | Date | ❌ | `Date.now` | |
| illustrator | String | ❌ | `""` | Fiction-specific |
| moral | String | ❌ | `""` | Fiction-specific (AI summary target) |
| series | String | ❌ | `""` | Fiction-specific |
| field | String | ❌ | `""` | Non-fiction-specific |
| subject | String | ❌ | `""` | Non-fiction-specific |
| gradeLevel | String | ❌ | `""` | Non-fiction-specific |
| ddc | String | ❌ | `""` | Non-fiction-specific |
| pages | Array\<Object> | ❌ | `[]` | Each: `pageText`, `pageImage`, `pageAudio`, `pageVideo` (all String) |
| cover | String | ❌ | `""` | |
| edition | String | ❌ | `""` | |
| volume | String | ❌ | `""` | |
| addedById | String | ❌ | `""` | Creator reference (String) |

### 7.2 `User_Registration_Model.js` — model `User_Model` → `user_models`
**Purpose:** Library member (student/teacher/guest) account.

| Field | Type | Required | Default |
|---|---|---|---|
| id | String | ✅ | — |
| lastname / firstname / middlename | String | ✅ | — |
| extensionname | String | ❌ | `""` |
| year / month / day | String | ✅ | — |
| age | Number | ✅ | — |
| sex | String | ✅ | — |
| homeAddress / city | String | ✅ | — |
| email / contact / institution | String | ❌ | `""` |
| parentName / parentContact / parentRelationship | String | ❌ | `""` |
| role | String | ❌ | `""` |
| password | String | ✅ | — |
| isChangePassword | Boolean | ❌ | `false` |
| avatar | String | ❌ | `""` |

### 7.3 `Librarian_Model.js` — model `Librarian` → `librarians`
**Purpose:** Librarian/admin account. **Timestamps:** ❌ not enabled.

| Field | Type | Required | Default |
|---|---|---|---|
| lastname / firstname / middlename / suffix | String | ❌ | `""` |
| role | String | ❌ | `""` |
| email | String | ❌ | `""` |
| contact | String | ❌ | `""` |
| password | String | ❌ | `""` |
| isChangePassword | Boolean | ❌ | `false` |
| avatar | String | ❌ | `""` |

### 7.4 `Employee_Registration_Model.js` — model `Employee_Registration` → `employee_registrations`
**Purpose:** Employee/staff registration. Fields: `id`, `lastname`, `firstname`, `middlename`, `year`, `month`, `day`, `age` (String), `gender`, `email`, `contact`, `role`, `gradeLevel`, `branch`, `username`, `password` (all required), plus `isChangePassword` (Boolean, default `false`). Timestamps ✅.

### 7.5 `Borrow_Model.js` — model `Borrow_Model` → `borrow_models`
**Purpose:** Borrow request/transaction.

| Field | Type | Required | Default | Notes |
|---|---|---|---|---|
| userId | String | ✅ | — | References user `id` |
| name | String | ❌ | — | Borrower snapshot |
| bookId | String | ✅ | — | References book `_id` (String) |
| title | String | ❌ | — | Book title snapshot |
| borrowDate | String | ❌ | — | Stored as String |
| returnDate | String | ❌ | — | Stored as String |
| status | String | ❌ | `Pending` | enum: `Pending`, `Approved`, `Borrowed`, `Returned`, `Rejected` |
| quantity | Number | ❌ | — | `min: 1` |

### 7.6 `Deposit_Model.js` — model `IDDeposit` → `iddeposits`
**Purpose:** ID/valuable deposited by a user and its return.

| Field | Type | Required | Default | Notes |
|---|---|---|---|---|
| userId | ObjectId | ✅ | — | Only `ObjectId` field; no `ref` |
| idType / idNumber / idName | String | ✅ | — | `trim: true` |
| depositDate | Date | ❌ | `Date.now` | |
| returnedDate | Date | ❌ | `null` | |
| receivedBy | String | ✅ | — | |
| returnedBy | String | ❌ | `null` | |
| status | String | ❌ | `held` | enum: `held`, `returned` |

### 7.7 `LogBook_Model.js` — model `LogBook` → `logbooks`
**Purpose:** Visitor logbook. Fields: `name` (✅), `address` (✅), `contact` (❌), `purpose` (✅), `leaveTime` (Date, default `null`). Timestamps ✅.

### 7.8 `NotificationsModel.js` — model `NotificationsModel` → `notificationsmodels`
**Purpose:** Per-recipient notification feed (7-day TTL).

| Field | Type | Required | Default | Notes |
|---|---|---|---|---|
| recipient | String | ❌ | — | `null` = broadcast |
| type | String | ❌ | — | enum: `Book Upload`, `Pending`, `Approved`, `Borrowed`, `Removed`, `Due`, `Over Due` |
| title | String | ❌ | — | |
| message | String | ❌ | — | |
| requestId | String | ❌ | `null` | |

TTL index on `createdAt` with `expireAfterSeconds: 604800` (7 days).

### 7.9 `QuizResult_Model.js` — model `QuizResult` → `quizresults`
**Purpose:** A user's quiz attempt/score. **Timestamps:** ❌ not enabled.

| Field | Type | Required | Default |
|---|---|---|---|
| userId | String | ✅ | — |
| storyId | String | ✅ | — |
| title | String | ✅ | — |
| score | Number | ✅ | — |
| totalQuestions | Number | ❌ | `0` |
| answeredQuestions | Array\<Object> | ❌ | `[]` (each: `questionId`, `selectedChoice`, `isCorrect`) |
| completedAt | Date | ❌ | `Date.now` |

### 7.10 `MarkAsRead_Model.js` — model `MarkAsRead` → `markasreads`
**Purpose:** Records a story read. Fields: `userId` (✅ String), `storyId` (✅ String), `readAt` (Date, default `Date.now`). **Timestamps:** ❌ not enabled.

### 7.11 `Inventory_Model.js` — model `Book` → `books` (CommonJS export)
**Purpose:** Physical book inventory/stock.

| Field | Type | Required | Default | Notes |
|---|---|---|---|---|
| title / author / category | String | ✅ | — | |
| isbn / edition / volume | String | ❌ | `null` | |
| arrivalDate | Date | ✅ | `Date.now` | |
| from | String | ❌ | `null` | |
| publishedDate | Date | ❌ | `null` | |
| status | String | ❌ | `Available` | enum: `Available`, `Borrowed`, `Reserved`, `Lost`, `Damaged` |

### 7.12 `Fiction_Model.js` — model `Fiction Model` → `fiction models`
Fields: `type`, `category`, `title` (✅); `author`, `description`, `language`, `publication`, `publisher`, `isbn`, `availableAt`, `illustrator`, `moral`, `series`, `edition`, `volume` (String, default `""`); `copies` (Number, default `1`); `cover` (✅); `pages` (Array of `{pageText, pageImage, pageAudio, pageVideo}`). Timestamps ✅.

### 7.13 `NonFiction_Model.js` — model `Non-Fiction Model` → `non-fiction models`
Fields: `type`, `category`, `title`, `cover` (✅); `field`, `author`, `description`, `language`, `publication`, `publisher`, `isbn`, `subject`, `gradeLevel`, `edition`, `volume`, `ddc`, `callNumber`, `availableAt` (String, default `""`); `copies` (Number, `1`, `min: 1`); `pages` (Array as above). Timestamps ✅.

### 7.14 `ChildrensBookDetails_Model.js` — model `ChildrensBookDetails` → `childrensbookdetails`
All fields required: `title`, `author`, `description`, `gradeCategory`, `language`, `publication`, `publisher`, `isbn`, `type`, `cover`, `availability` (Boolean), `readingLevel`, `illustrator`, `moralTheme`, `storyType`. `pages` = Array of `{ pageText: String, pageImage: [String] }`. Timestamps ✅.

### 7.15 `EducationalDetails_Model.js` — model `EducationalBookDetails` → `educationalbookdetails`
All required: `title`, `author`, `description`, `gradeCategory`, `language`, `publication`, `publisher`, `isbn`, `type`, `cover`, `availability` (Boolean), `subject`, `educationalEdition`. `pages` = Array of `{ pageText, pageImage: [String] }`. Timestamps ✅.

### 7.16 `WorkBookDetails_Model.js` — model `WorkBookDetails` → `workbookdetails`
All required: `title`, `author`, `description`, `gradeCategory`, `language`, `publication`, `publisher`, `isbn`, `type`, `cover`, `availability` (Boolean), `workbookEdition`, `workbookType`, `workbookTopic`, `workbookSubject`. `pages` = Array of `{ pageText, pageImage: [String] }`. Timestamps ✅.

### 7.17 Relationships

There are **no** Mongoose `ref:`/`populate()` relationships. References are application-enforced string joins:

| Relationship | Fields | Kind |
|---|---|---|
| Borrow → User | `Borrow_Model.userId` ↔ `User_Registration_Model.id` | String join |
| Borrow → Book | `Borrow_Model.bookId` ↔ `Books_Model._id` | String join |
| Deposit → User | `Deposit_Model.userId` (ObjectId) ↔ user `_id` | Seed ObjectId, no `ref` |
| QuizResult → User / Story | `userId`, `storyId` | String join |
| MarkAsRead → User / Story | `userId`, `storyId` | String join |
| Notifications → User / Borrow | `recipient`, `requestId` | Loose String |
| Books → Creator | `addedById` | Loose String |

**Convention:** the dominant pattern is a String `userId`/`bookId`/`storyId` mapped to `User_Registration_Model.id` and `Books_Model._id`. `Deposit_Model` is the sole outlier using `ObjectId`.

---

## 8. Configuration & Middleware

### 8.1 `config/cloudinary.js`
- Named export `connectCloudinary()` → `cloudinary.config({ cloud_name, api_key, api_secret })` from `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`.
- Default export: the configured `cloudinary` instance.
- Invoked once at the top of `server.js`.

### 8.2 `config/groq.js`
- Loads `dotenv.config()`, then default-exports `new Groq({ apiKey: process.env.GROQ_API_KEY })`.
- No model configured here — chosen at call time (`openai/gpt-oss-20b`).

### 8.3 `config/multer.js`
- `multer.diskStorage` → destination `uploads/`; filename `Date.now() + "-" + random` + original extension.
- Allowed extensions: `.jpg .jpeg .png .webp .mp3 .wav .ogg .m4a` and MIME must start with `image/` or `audio/`.
- **Max file size: 200 MB.**
- Default export: configured `upload` middleware.

### 8.4 `config/multerPdf.js`
- `multer.diskStorage` → destination `uploads/pdfs`; filename `Date.now() + "-" + originalname`.
- Only `application/pdf` accepted.
- Default export: `uploadPdf`.

### 8.5 `middleware/rateLimiter.js`
See [§12 Rate Limiting](#12-rate-limiting) for the full table. All limiters use `standardHeaders: true`, `legacyHeaders: false`, and return `{ success: false, message: "<text>" }` on HTTP 429.

### 8.6 `services/emailServices.js`
- **Provider:** Resend, client initialized with `process.env.EMAIL_API`.
- **Export:** `sendEmail({ userData, subject, message })`.
- **From:** `"Naic Municipal Library <onboarding@resend.dev>"`.
- **To:** hard-coded `naicwebsitelibrary@gmail.com`.
- Body: HTML greeting `Hello, Mr./Ms. ${userData.firstname},` + the supplied message. Errors are logged and re-thrown.

### 8.7 `server.js` — startup & middleware order
1. `dotenv.config()` (before other imports).
2. `connectCloudinary()`.
3. `dns.setServers(["8.8.8.8", "1.1.1.1"])` — Google/Cloudflare resolvers (helps Atlas SRV lookups).
4. `const app = express()`.
5. `app.set("trust proxy", 1)`.
6. `cors({ origin: process.env.FRONTEND_URL, credentials: true })`.
7. `express.json()`.
8. `express.urlencoded({ extended: true })`.
9. **Lazy Mongo connect:** `connectDB()` on `MONGO_URI`, guarded by `isConnected` + `mongoose.connection.readyState === 1`.
10. Global async middleware runs `connectDB()` before every route → `500 { success:false, message:"Database connection failed" }` if unreachable.
11. All 35 routers mounted at `"/"`.
12. `GET /` → `"Hello, World!"`.
13. `app.listen(5000)` (hard-coded port), then `export default app`.

---

## 9. Frontend Documentation

- **Framework:** React 19 + Vite 8 + Tailwind CSS 4.
- **Routing:** `react-router-dom` v7 (`BrowserRouter`/`Routes`).
- **State:** `zustand` with `persist`.
- **HTTP:** `axios`, using `import.meta.env.VITE_API_URL`.
- **Rich text:** `react-quill-new` (page editor), `@tiptap/*` (installed), `dompurify` (sanitizing reader HTML).
- **Charts:** `apexcharts` + `react-apexcharts`. **OCR:** `tesseract.js`. **Icons:** `lucide-react`. **Toasts:** `react-toastify`.

### 9.1 Routing table (`src/App.jsx`)

`ProtectedRoute` guard: no `token` → redirect `/`; no `role` or role not allowed → `/unauthorized`.

| Path | Component | Required roles | Notes |
|---|---|---|---|
| `/` | `Home_Page` | public | Landing page |
| `/unauthorized` | `Unauthorized_Page` | public | 403 |
| `/login` | `LoginPage` | public | Member login |
| `/registration` | `RegistrationPage` | public | Self-registration wizard |
| `/admin-login` | `Admin_Login` | public | Librarian login |
| `/library/home` | `Library_Page` | student, teacher, guest | Member dashboard |
| `/library/catalog` | `Lib_Catalog` | student, teacher, guest | Search & catalog |
| `/library/my-account` | `Lib_MyAccount` | student, teacher, guest | Profile/password/avatar |
| `/library/borrow-status` | `Lib_Borrow` | student, teacher, guest | Member borrow requests |
| `/library/view-book/:id` | `Lib_ViewBook` | student, teacher, guest | Param `:id` = book id |
| `/library/view-story/quiz/:id` | `Lib_Quiz` | student, teacher, guest | Param `:id` = story id |
| `/change-password` | `Change_Password_Page` | student, teacher, guest | Forced first password change |
| `/admin` | `Admin_Page` | all 4 staff roles | Overview dashboard |
| `/admin/log-book` | `Admin_LogBook` | all 4 staff roles | Visitor logbook |
| `/admin/catalog` | `Admin_Catalog` | all 4 staff roles | Admin catalog |
| `/admin/book-information/:id` | `Admin_ViewMaterials_Page` | all 4 staff roles | Param `:id` = book id |
| `/admin-change-password` | `Admin_ChangePassword` | all 4 staff roles | Forced first admin password change |
| `/admin/profile/:id` | `Admin_Profile` | all 4 staff roles | Param `:id` = admin id |
| `/admin/upload-book` | `Admin_UploadBook_Page` | system admin, head librarian, it librarian | Manual upload |
| `/admin/edit` | `Admin_Edit` | system admin, head librarian, it librarian | Edit book + pages/video |
| `/admin/inventory` | `Admin_Inventory` | system admin, head librarian, it librarian | Inventory |
| `/admin/borrow-book` | `Admin_BorrowBook_Page` | system admin, head librarian | Borrow + deposits |
| `/admin/users` | `Admin_User` | system administrator | User accounts |
| `/admin/authority` | `Admin_Authority` | system administrator | Staff/roles |
| `*` | `Not_Found_Page` | public | 404 |

**Notes:** `/library/profile` is referenced by `Lib_Navigation` but not defined (real route is `/library/my-account`). `Admin_Dashboard` references `/admin/upload` (undefined) but is unused.

### 9.2 Pages inventory (`pages/`)

| File | Purpose |
|---|---|
| `Home_Page.jsx` | Public landing page: hero, features, stats, library map, footer, login slider |
| `LoginPage.jsx` | Member login → `POST /login`, stores auth, redirects |
| `Admin_Login.jsx` | Librarian login → `POST /admin-login` |
| `RegistrationPage.jsx` | 4-step self-registration wizard |
| `Library_Page.jsx` | Member home: search, filters, latest books, genre buttons, grade shelves, borrow modal |
| `Change_Password_Page.jsx` | Forced member password change (`POST /first-password`) |
| `Admin_ChangePassword.jsx` | Forced admin password change (`POST /admin-first-password`) |
| `Admin_Page.jsx` | Admin overview with stat cards + newest-book panel |
| `Admin_LogBook.jsx` | Visitor logbook management |
| `Admin_Catalog.jsx` | Admin catalog grid with advanced search + pagination |
| `Admin_ViewMaterials_Page.jsx` | Read-only book detail for `/admin/book-information/:id` |
| `Admin_UploadBook_Page.jsx` | Manual upload form |
| `Admin_Edit.jsx` | Edit book across Information / Page / Preview tabs |
| `Admin_BorrowBook_Page.jsx` | Borrow request tabs + ID deposit management |
| `Admin_User.jsx` | User account management |
| `Admin_Authority.jsx` | Librarian member/role management |
| `Admin_Profile.jsx` | Admin's own profile + avatar |
| `Unauthorized_Page.jsx` | 403 page |
| `Not_Found_Page.jsx` | 404 page |

Subfolders: `UploadPage_Components/` (`TypeOfBooks`, `BookInformation`, `FictionBookInformation`, `PreviewBook`), `BookInformation_Component/` (`Preview_BookInformation`, `Edit_BookInformation`, `Edit_BookPage`), `Borrowing_Components/` (`PendingTable`, `ApprovedTable`, `BorrowedTable`, `HistoryTable`), `BookPage_Component/` (`AdvancedSearch`). (`components/Admin_Inventory.jsx` is routed at `/admin/inventory`.)

### 9.3 Components inventory

**`components/`** — `registration/` wizard (`StepUserType`, `StepPersonalInfo`, `StepParentInfo`, `StepReview`, `StepIndicator`); `HomePageNavigation`, `Footer`, `Admin_Sidebar` (role-based nav), `Admin_Header` (profile dropdown + logout), `Admin_Inventory` (routed). Unused/legacy: `Admin_UserManagement`, `Admin_Dashboard`, `Admin_Navigation`, `Admin_Teacher`, `Admin_Stories`, `Analytics_Card`.

**`library_components/`** — `Lib_Navigation`, `Lib_Catalog`, `Lib_BookCard`, `Lib_ViewBook`, `Lib_BookLayout` (reader shell), `Lib_BasedLayoutBook` (text reader), `Lib_StoryLayoutBook` (story reader with audio/video/TTS), `Lib_Quiz`, `Lib_Borrow`, `Lib_MyAccount`, `Lib_Shelf`, `Lib_Story_Buttons`, `Lib_KindergartenBooks`/`Lib_FirstGradeBooks`/`Lib_SecondGradeBooks`/`Lib_ThirdGradeBooks`/`Lib_FourthGradeBooks`. Unused filter forms: `Lib_FilterStoryBooks`, `Lib_FilterWorkBooks`, `Lib_FilterReferenceBooks`, `Lib_FilterEducationalBooks`, `Lib_FilterChildrensBooks`; `CatalogPage_Component/` (`Catalog_TypeOfBooks`, `Catalog_BookInformation`).

**`modals/`** — In use: `BorrowModal`, `AddPage_Modal` (OCR → Quill → upload), `videoGenerationModal`, `NotificationModal`, `QuizResultModal`, `DepositModal`, `DepositsListModal`, `MembersModal`, `LogBookModal`, `LobookViewModal`, `View_Student_Modal`. Unused: `View_Employee_Modal`, `Edit_Student_Modal`, `Edit_Employee_Modal`, `RegisterEmployeeModal`, `InventoryModal`, `Edit_Question_Modal`.

**`popup/`** — `Confirmation_Popup` (generic confirm), `Account_Conformation` (one-time member credentials), `LibrarianAccount` (one-time librarian credentials).

**`charts/`** — `LineChart.jsx`, `PieChart.jsx` (ApexCharts; currently unused).

**`toasts/`** — `SuccessToast.jsx`, `InformationToast.jsx`, `ErrorToast.jsx` (empty placeholders; app uses `react-toastify` `toast` directly).

**`loadings/`** — `loadingContainer.jsx` (full-overlay spinner).

### 9.4 State management — `store/useAuthStore.js`

Zustand store wrapped in `persist` (localStorage key **`auth-storage`**).

- **Fields:** `user`, `token`, `role`.
- **Actions:** `setUser(user)`, `updateUser(updatedData)` (shallow merge), `setAuth(user, token, role)`, `logout()`.

Persistence means login survives page reloads.

### 9.5 Utils (`utils/`)

| File | Exports | Description |
|---|---|---|
| `ocr.js` | `extractTextFromImage` | Tesseract.js `recognize(file, 'fil+eng')` with `PSM.SINGLE_BLOCK`; used in `AddPage_Modal` |
| `speech.js` | `isSpeechSupported`, `speak`, `pauseSpeech`, `resumeSpeech`, `stopSpeech`, `isSpeechSpeaking`, `isSpeechPaused` | Web Speech API wrapper; used by readers and `Lib_BookLayout` |
| `readerHelpers.js` | `htmlToText`, `QUILL_STYLES`, `PROSE_STYLES` | Convert Quill HTML to speakable text; style sanitized output |
| `cloudinary.js` | `uploadToCloudinary(file, resourceType)` | Unsigned upload to Cloudinary via `VITE_CLOUDINARY_*`; used by `Admin_Profile` (others re-implement inline) |
| `typeEffect.js` | `useTypeEffect(text, speed)` | React hook that reveals text character-by-character (story summary) |

### 9.6 Key feature flows

- **Registration wizard** (`RegistrationPage` + `components/registration/`): steps User Type → Personal Info → Parent Info (only if age < 18) → Review; on submit → `POST /register-user`, shows one-time credentials popup.
- **Reading** (`Lib_ViewBook` → `Lib_BookLayout`): chooses `Lib_StoryLayoutBook` (literature: image/audio/video per page, intro audio, TTS with pause/auto-advance, captions, swipe, lightbox, typed summary) or `Lib_BasedLayoutBook` (text: progress, text-size, alignment, bold/italic, read-aloud). Reader disabled when a book has no pages.
- **Quiz** (`Lib_Quiz` + `QuizResultModal`): one question at a time, instant feedback, scored result, posts to `POST /quiz-result`.
- **Borrowing UI:** member `Lib_Borrow` (status timeline, due-date urgency, cancel); admin `Admin_BorrowBook_Page` with Pending/Approved/Borrowed/History tabs and actions (approve/decline/submit/return plus notifications and ID deposit capture).
- **Admin flows:** catalog, inventory, upload, book editing (information/pages/preview, OCR, AI summary, AI video), logbook, user management, authority/roles.
- **Notifications/Account/Deposits:** `NotificationModal` (merged global + personal, due reminders), `Lib_MyAccount` / `Admin_Profile` (info, password, avatar), `DepositModal` / `DepositsListModal`.

### 9.7 Build tooling

| File | Purpose |
|---|---|
| `vite.config.js` | Plugins `react()` + `tailwindcss()`; no custom aliases/server |
| `index.html` | Title "Naic Municipal Library", favicon, Inter font, mounts `/src/main.jsx` |
| `src/main.jsx` | React root render with `StrictMode` |
| `src/index.css` | `@import "tailwindcss";` + base styles |
| `jsconfig.json` | Empty (unused) |
| `eslint.config.js` | Flat config: JS recommended + react-hooks + react-refresh; `no-unused-vars` error (ignore `^[A-Z_]`) |
| `vercel.json` | SPA rewrite `/(.*) → /index.html` |
| `sass-embedded` + `src/scss.d.ts` | Sass available for future use; **no `.scss` files present** |
| `mockdata.js` | Static option lists: `alphabetical`, `categories`, `fields`, `subjects`, `gradeLevels`, `months`, `position` |

---

## 10. Environment Variables

> Values are intentionally **omitted**. Never commit real secrets.

### 10.1 Backend (`backend/.env`)

| Variable | Purpose |
|---|---|
| `GMAIL_EMAIL`, `GMAIL_PASS` | Gmail credentials (SMTP/contact use) |
| `LOCAL_URL` | Local backend URL |
| `FRONTEND_URL` | Allowed CORS origin |
| `CLIENT_URL` | Client URL |
| `EMAIL_API` | Resend API key (used by `emailServices.js`) |
| `MONGO_URI` | MongoDB connection string (active) |
| `OLD` | Legacy/alternate value |
| `MONGO_LOCAL_URI` | Local MongoDB URI |
| `ADMIN_USERNAME`, `ADMIN_PASSWORD` | Seed/default admin credentials |
| `JWT_SECRET` | JWT signing secret |
| `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` | Cloudinary credentials |
| `GROQ_API_KEY` | Groq API key |
| `FAL_KEY` | fal.ai API key |

### 10.2 Frontend (`frontend/.env`)

| Variable | Purpose |
|---|---|
| `VITE_API_URL` | Backend REST base URL (used throughout the app) |
| `LOCAL_API_URL` | Defined but **not referenced** in source |
| `VITE_CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name for unsigned uploads |
| `VITE_CLOUDINARY_UPLOAD_PRESET` | Cloudinary unsigned upload preset |

All client vars must be prefixed with `VITE_` to be exposed by Vite.

---

## 11. Setup & Installation

### 11.1 Prerequisites

- **Node.js 19+** (the backend uses the global `crypto.randomUUID()`).
- **npm** (or a compatible package manager).
- A **MongoDB** database (local MongoDB or a MongoDB Atlas cluster).
- A **Cloudinary** account (cloud name, API key/secret, unsigned upload preset).
- Optional: **Groq** API key, **fal.ai** API key, **Resend** API key.

### 11.2 Clone

```bash
git clone https://github.com/CollinsMatela/Library-System.git
cd Library-System
```

### 11.3 Backend

```bash
cd backend
npm install
```

Create `backend/.env` (templates below are for local development):

```env
# Server / CORS
LOCAL_URL=http://localhost:5000
FRONTEND_URL=http://localhost:5173
CLIENT_URL=http://localhost:5173

# Database
MONGO_URI=mongodb://localhost:27017/naic_library
# (or a MongoDB Atlas SRV connection string)

# Auth
JWT_SECRET=replace_with_a_long_random_string
ADMIN_USERNAME=admin
ADMIN_PASSWORD=replace_with_a_strong_password

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# AI
GROQ_API_KEY=your_groq_key
FAL_KEY=your_fal_key

# Email (Resend)
EMAIL_API=your_resend_api_key
GMAIL_EMAIL=your_email@example.com
GMAIL_PASS=your_app_password
```

Run:

```bash
npm run dev     # nodemon server.js (auto-reload)
# or
npm start       # node server.js
```

The API listens on **http://localhost:5000**.

### 11.4 Frontend

```bash
cd frontend
npm install
```

Create `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_unsigned_preset
```

Run:

```bash
npm run dev       # start Vite dev server (http://localhost:5173)
npm run build     # production build to dist/
npm run preview   # preview the production build
npm run lint      # ESLint
```

> Cloudinary: create an **unsigned** upload preset for the frontend direct-upload flow, and ensure the preset allows the image/audio/video resource types you use.

### 11.5 First run checklist

1. Start MongoDB (or verify Atlas connectivity).
2. Start the backend (`nodemon`), confirm "Server is running on port 5000".
3. Start the frontend Vite dev server.
4. Register a member (or log in as admin) — the DB connection is created lazily on the first request.

---

## 12. Rate Limiting

Defined in `backend/middleware/rateLimiter.js`. On limit exceeded: HTTP **429** with `{ success: false, message: "<custom text>" }`.

| Limiter | Window | Max requests | Block message | Applied to |
|---|---|---|---|---|
| `generalLimiter` | 10 min | 100 | Too many request attempts. Please try again later. | Most GET reads + `PATCH /update-user-avatar` |
| `loginLimiter` | 15 min | 10 | Too many login attempts. Please try again later. | `POST /login` |
| `changePassLimiter` | 15 min | 10 | Too many password change attempts. Please try again later. | All password change endpoints |
| `registrationLimiter` | 15 min | 10 | Too many registration attempts. Please try again later. | `POST /register-user` |
| `createLimiter` | 15 min | 30 | Too many create attempts. Please try again later. | `POST /request-borrow`, `POST /register-visitor`, `POST /upload-manually` |
| `deleteLimiter` | 15 min | 25 | Too many delete attempts. Please try again later. | `DELETE /delete-user-request/:id`, `/delete-book/:bookId`, `/delete-student/:id` |
| `updateLimiter` | 15 min | 30 | Too many update attempts. Please try again later. | Book/page/student/borrow updates, `set-avatar`, `save-page-video` |
| `AISummarizationLimiter` | 15 min | 5 | Too many AI summarization attempts. Please try again later. | `POST /ai-summarization` |
| `AIVideoLimiter` | 15 min | 5 | Too many AI video processing attempts. Please try again later. | `POST /video-generation` |

> Imported-but-not-applied: `NotificationRoute.js` and `DeleteBorrow_Route.js` import a limiter but never attach it — those endpoints are effectively unlimited.

---

## 13. Deployment

Both apps deploy independently to **Vercel**.

### 13.1 Backend (`backend/vercel.json`)

```json
{
  "version": 2,
  "builds": [{ "src": "server.js", "use": "@vercel/node" }],
  "routes": [{ "src": "/(.*)", "dest": "server.js" }]
}
```

- All requests are routed to the Express app.
- Set all backend env vars in the Vercel project settings, and set `FRONTEND_URL` to the deployed frontend origin (CORS allow-list).
- Because the DB connection is lazy, the function connects to MongoDB on the first request; `dns.setServers` helps Atlas SRV resolution.

### 13.2 Frontend (`frontend/vercel.json`)

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

- SPA rewrite so client-side routes resolve in production.
- Build command `npm run build`, output `dist/`.
- Set `VITE_API_URL` (deployed backend URL), `VITE_CLOUDINARY_CLOUD_NAME`, `VITE_CLOUDINARY_UPLOAD_PRESET` in Vercel.

---

## 14. Third-Party Services

| Service | Role | Key env vars | Used in |
|---|---|---|---|
| **MongoDB (Mongoose)** | Primary datastore | `MONGO_URI` | `server.js`, all models |
| **Cloudinary** | Image/audio/video hosting | `CLOUDINARY_*`, `VITE_CLOUDINARY_*` | Avatars, page media, videos; direct unsigned uploads from frontend |
| **Groq** | LLM story summarization (`openai/gpt-oss-20b`) | `GROQ_API_KEY` | `SummarizationController.js` |
| **fal.ai** | Image-to-video generation (`wan/v2.2-a14b`) | `FAL_KEY` | `VideoController.js` |
| **Resend** | Email sending | `EMAIL_API` | `emailServices.js` |
| **Vercel** | Hosting (both apps) | — | `vercel.json` × 2 |
| **Web Speech API** | In-browser TTS | — | `utils/speech.js`, readers |
| **Tesseract.js** | In-browser OCR | — | `utils/ocr.js`, `AddPage_Modal` |

---

## 15. Known Issues, Bugs & Notes

These are observations from the source code; they are documented here for transparency. Not all are necessarily bugs, but they are worth reviewing.

### Security / architecture
- **No backend authorization.** There is no auth middleware and `jwt.verify` is never called. Every API endpoint is effectively public; access control is entirely client-side (`ProtectedRoute`), which can be bypassed. All mutating endpoints (create/update/delete, AI, member management) should be protected server-side.
- **Hashed passwords returned in responses.** `/login` and `/admin-login` (and several controllers) return the full account document including the hashed `password` field.
- **Temporary passwords returned in plaintext and never emailed.** `register-user` and `add-member` return generated passwords in the response body; `emailServices.js` sends to a hard-coded library inbox rather than the user.
- **CORS** is restricted to a single `FRONTEND_URL`; rotating deployments must keep it in sync.

### Functional bugs
- **`POST /send-email` never sends a response on success** — the client request hangs/times out.
- **`POST /first-password` / `admin-first-password` double-response** on an invalid role (sends both a 400 and a 200).
- **`PUT /update-borrow` always decrements `copies`** (in both the `Borrowed` and `else` branches), so rejected/updated requests can wrongly reduce stock.
- **`ApproveBorrowController` imports `sendEmail` but never calls it** — no approval email is sent.
- **`/library/profile` navigation target is undefined** — `Lib_Navigation` navigates to a non-existent route (404). Actual route is `/library/my-account`.

### Data model
- **`books` collection shared by two schemas** (`Books_Model` and `Inventory_Model`), which can cause surprising cross-reads.
- **No `ref`/`populate` relationships** — joins rely on string ids/enforced in controllers; referential integrity isn't guaranteed by the DB.
- **Inconsistent id usage** — some flows use the custom user `id` string, others the Mongo `_id`; `Deposit_Model.userId` is `ObjectId` while others are String.
- **`Borrow_Model.borrowDate`/`returnDate` are Strings**, not Dates.
- **`Librarian_Model`, `QuizResult_Model`, `MarkAsRead_Model` lack `timestamps`.**

### Code hygiene
- **Unmounted controllers** exist with no routes: `Fetch_ChildrensBooks_Controller`, `Fetch_EducationalBooks_Controller`, `Fetch_ReferenceBooks_Controller`, `Fetch_WorkBooks_Controller`, `Fetch_All_Marked_Controller`, `Fetch_MarkAsRead_Controller`, `MarkAsRead_Controller`, `Quiz_Result_Controller`, `Fetch_QuizResults_Controller`, `Update_Question_Controller`, `Employee_Registration_Controller`, `Fetch_Employee_Controller`, `Delete_Employee_Controller`, `Edit_Employee_Controller`.
- **Imported-but-unapplied rate limiters** in `NotificationRoute.js` and `DeleteBorrow_Route.js`.
- **Unused frontend files** (see §9.3): filter forms, several modals, `charts/*`, `Analytics_Card`, `Admin_Dashboard`, `Admin_UserManagement`, `Admin_Teacher`, `Admin_Stories`, `Admin_Navigation`, toasts placeholders.
- **Duplicated Cloudinary upload helper** re-implemented inline in several components instead of importing `utils/cloudinary.js`.
- **Debug logging** (`console.log`) present in `ProtectedRoute` and other places.
- **Typo** `isSucess` in `GET /get-books` response; several inconsistent message strings.
- **`frontend/jsconfig.json` is empty**; `sass-embedded`/`scss.d.ts` present but unused; `LOCAL_API_URL` unused.
- **Root `package.json` is an empty object** (`{}`).
