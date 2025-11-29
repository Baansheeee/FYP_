const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
dotenv.config();
const mongoose = require('mongoose');

const authRoutes = require('./routes/authRoute');
const lectureRoutes = require('./routes/lectureRoutes');
const communityRoutes = require('./routes/communityRoutes');

const app = express();

// Middleware
app.use(cors({ origin: process.env.COOKIE_DOMAIN, credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Serve uploaded files as static
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/lectures", lectureRoutes);
app.use("/api/v1/community", communityRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
