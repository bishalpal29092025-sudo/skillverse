# 🚀 SkillVerse

SkillVerse is a full-stack skill exchange platform where people can connect, discover each other's skills, and exchange knowledge through structured skill swap requests.

Users can create profiles, showcase what they can teach, specify what they want to learn, discover other users, send swap requests, and manage incoming and outgoing requests.

---

## ✨ Features

### 🔐 Authentication

- User Sign Up
- User Sign In
- Secure password hashing using bcrypt
- JWT-based sessions using NextAuth
- Protected routes
- Logout functionality

---

### 👤 Profile Management

Users can create and update their profiles with:

- Name
- Headline
- Bio
- Location
- Skills Offered
- Skills Wanted

Example:

```txt
Headline:
Frontend Developer

Bio:
I love building full-stack applications.

Location:
India

Skills Offered:
Next.js, React, TypeScript

Skills Wanted:
Rust, Solana
```

---

### 🔍 Skills Discovery

Browse other users on the platform.

View:

- User Name
- Headline
- Location
- Skills Offered
- Skills Wanted

This allows users to find people whose skills match their learning goals.

---

### 🤝 Skill Swap Requests

Users can send swap requests to other users.

Each request contains:

- Skill Offered
- Skill Requested
- Personal Message

Example:

```txt
I can help you with React if you teach me Rust.
```

---

### 📥 Incoming Requests Dashboard

Users can view all requests they have received.

Information shown:

- Sender Name
- Offered Skill
- Requested Skill
- Personal Message
- Current Status

---

### 📤 Outgoing Requests Dashboard

Users can view requests they have sent.

Information shown:

- Receiver Name
- Offered Skill
- Requested Skill
- Personal Message
- Current Status

---

### ✅ Accept / Reject Requests

Receivers can:

- Accept requests
- Reject requests

Statuses:

```txt
pending
accepted
rejected
```

Senders automatically see updated statuses.

---

## 🏗️ Current Workflow

```txt
User Creates Profile
↓
User Adds Skills
↓
User Discovers People
↓
User Sends Swap Request
↓
Receiver Views Request
↓
Receiver Accepts / Rejects
↓
Sender Sees Updated Status
```

---

## 🛠️ Tech Stack

### Frontend

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS

### Backend

- Next.js Server Actions
- NextAuth
- JWT Sessions

### Database

- MongoDB Atlas
- Mongoose

### Validation

- Zod
- React Hook Form

### Authentication

- Credentials Provider
- bcryptjs

---

## 📂 Project Structure

```txt
skillverse
├── app
│   ├── (auth)
│   ├── dashboard
│   ├── profile
│   ├── skills
│   ├── swaps
│   └── api/auth
│
├── actions
│   ├── auth
│   ├── profile
│   ├── skills
│   └── swaps
│
├── components
│   └── ui
│
├── features
│   ├── auth
│   ├── profile
│   ├── skills
│   └── swaps
│
├── lib
├── models
├── providers
├── validators
└── types
```

---

## 🗄️ Database Models

### User

```ts
name: string
email: string
password: string
image?: string

headline?: string
bio?: string
location?: string

skillsOffered: string[]
skillsWanted: string[]
```

---

### SwapRequest

```ts
sender: ObjectId
receiver: ObjectId

offeredSkill: string
requestedSkill: string

message: string

status:
  | "pending"
  | "accepted"
  | "rejected"
  | "completed"
```

---

## 🌐 Routes

### Public Routes

```txt
/
/sign-in
/sign-up
/forgot-password
/verify-email
```

### Protected Routes

```txt
/dashboard
/profile
/skills
/swaps
/swaps/create/[id]
```

---

## 🚀 Getting Started

### Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/skillverse.git
cd skillverse
```

---

### Install Dependencies

```bash
npm install
```

---

### Environment Variables

Create a `.env` file:

```env
DATABASE_URL=your_mongodb_connection_string

AUTH_SECRET=your_auth_secret

NEXTAUTH_URL=http://localhost:3000
```

---

### Run Development Server

```bash
npm run dev
```

Open:

```txt
http://localhost:3000
```

---

### Production Build

```bash
npm run build
npm start
```

Current production build status:

```txt
✓ Compiled successfully
✓ Finished TypeScript
✓ Production build successful
```

---

## 📌 Completed Milestones

### Phase 1

- Authentication System

### Phase 2

- Profile Management

### Phase 3

- Skills Discovery

### Phase 4

- Skill Swap Engine
- Send Requests
- Incoming Dashboard
- Outgoing Dashboard
- Accept Requests
- Reject Requests

---

## 🔮 Upcoming Features

### Phase 5

- Real-Time Chat

### Phase 6

- Reviews and Ratings

### Phase 7

- Notifications

### Phase 8

- Search and Filters

### Phase 9

- Admin Dashboard

### Phase 10

- Deployment

---

## 📸 Screenshots

Screenshots and demo GIFs will be added soon.

---

## 🤝 Contributing

Contributions, suggestions, and feedback are welcome.

Feel free to fork the repository and open a pull request.

---

## 👨‍💻 Author

**Bishal Pal**

Frontend & Full-Stack Developer

- React
- Next.js
- TypeScript
- Rust (Learning)
- Solana (Learning)

---

## ⭐ Support

If you found this project useful, consider giving it a star on GitHub.

It motivates me to continue building and improving SkillVerse.

---

Built with ❤️ using Next.js, MongoDB, and TypeScript.