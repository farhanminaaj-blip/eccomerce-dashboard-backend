import { users } from "./model.js";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
  try {
    console.log("📨 Registration request received:", req.body);
    // Accept both 'name' and 'username' fields
    const { username, name, position, email, phone_number, password } = req.body;
    const finalUsername = username || name; // Use whichever is provided
    
    if (!finalUsername || !email || !password) {
      console.log("❌ Missing required fields");
      return res.status(400).json({ 
        message: "Username/Name, email, and password are required",
        received: { username: finalUsername, email, password: password ? '***' : undefined }
      });
    }
    
    const userExist = await users.findOne({ email });

    if (userExist) {
      console.log("❌ User already exists with email:", email);
      return res.status(400).json({ message: "Email already exists" });
    }

    console.log("💾 Creating user in MongoDB...");
    const userCreated = await users.create({
      username: finalUsername,
      position: position || "Team Member",
      email,
      phone_number: phone_number || "",
      password,
    });
    
    console.log("✅ User created successfully:", {
      id: userCreated._id,
      email: userCreated.email,
      username: userCreated.username
    });
    
    res.status(201).json({ 
      message: "✅ User registered successfully",
      userCreated: {
        id: userCreated._id,
        username: userCreated.username,
        email: userCreated.email,
        position: userCreated.position
      }
    });
  } catch (error) {
    console.error("❌ Registration error:", error.message);
    res.status(500).json({ 
      message: "Internal server error during registration",
      error: error.message 
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      console.log("❌ Login: Missing email or password");
      return res.status(400).json({ message: "Email and password are required" });
    }
    
    console.log("🔐 Login attempt for email:", email);
    const userExist = await users.findOne({ email });
    
    if (!userExist) {
      console.log("❌ User not found:", email);
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    
    const isPasswordValid = await bcrypt.compare(password, userExist.password);
    
    if (isPasswordValid) {
      console.log("✅ Login successful for:", email);
      res.status(200).json({
        message: "Login successful",
        token: userExist.generateToken(),
        userId: userExist._id.toString(),
        isAdmin: userExist.isAdmin,
      });
    } else {
      console.log("❌ Invalid password for:", email);
      res.status(401).json({
        message: "Invalid Email or Password",
      });
    }
  } catch (error) {
    console.error("❌ Login error:", error);
    res.status(500).json({ message: "internal server error" });
  }
};

// Admin functions
export const listUsers = async (req, res) => {
  const all = await users.find({}, "-password");
  res.json({ users: all });
};

export const getUser = async (req, res) => {
  const u = await users.findById(req.params.id, "-password");
  if (!u) return res.status(404).json({ message: "User not found" });
  res.json(u);
};

export const updateUser = async (req, res) => {
  const u = await users.findById(req.params.id);
  if (!u) return res.status(404).json({ message: "User not found" });
  const { isAdmin, position, username, phone_number } = req.body;
  if (isAdmin !== undefined) u.isAdmin = isAdmin;
  if (position) u.position = position;
  if (username) u.username = username;
  if (phone_number) u.phone_number = phone_number;
  await u.save();
  const safeUser = await users.findById(u._id, "-password");
  res.json({ message: "Updated", user: safeUser });
};

export const deleteUser = async (req, res) => {
  await users.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};

export const stats = async (req, res) => {
  const totalUsers = await users.countDocuments();
  const admins = await users.countDocuments({ isAdmin: true });
  res.json({ totalUsers, admins });
};
