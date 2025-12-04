/** @format */

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
dotenv.config();
const mongoose = require("mongoose");

const authRoutes = require("./routes/authRoute");
const lectureRoutes = require("./routes/lectureRoutes");
const communityRoutes = require("./routes/communityRoutes");
const auditRoutes = require("./routes/auditRoutes");
const complianceRoutes = require("./routes/complianceRoutes");
const architectureRoutes = require("./routes/architectureRoutes");

const app = express();

app.use(
	cors({
		origin: process.env.COOKIE_DOMAIN || "http://localhost:5173",
		credentials: true,
	})
);
app.use(express.json());
app.use(cookieParser());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/lectures", lectureRoutes);
app.use("/api/v1/community", communityRoutes);
app.use("/api/v1/audit", auditRoutes);
app.use("/api/v1/compliance", complianceRoutes);
app.use("/api/v1/architecture", architectureRoutes);

mongoose
	.connect(process.env.MONGO_URI)
	.then(() => console.log("MongoDB connected"))
	.catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
