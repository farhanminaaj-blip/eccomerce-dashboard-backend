import {contact} from "./contact-model.js";
import { users } from "./model.js";

const contactFrom = async(req,res)=>{
    try{
        console.log("=".repeat(50));
        console.log("📨 POST /api/from REQUEST RECEIVED");
        console.log("=".repeat(50));
        console.log("📦 Request body:", JSON.stringify(req.body, null, 2));
        
        const { name, position, email, phone_number, password } = req.body;
        
        // Validation
        if (!name || !email) {
            console.log("❌ Validation failed: Missing required fields");
            return res.status(400).json({ 
                message: "Name and email are required",
                received: { name, email, position, phone_number }
            });
        }
        
        // Create document
        const dataToSave = {
            name,
            position,
            email,
            phone_number,
            password,
            message: "Team Member Added",
            createdAt: new Date()
        };
        
        console.log("💾 Saving to MongoDB:", dataToSave);
        const savedData = await contact.create(dataToSave);
        
        console.log("✅ SUCCESS! Data saved:");
        console.log("🔑 Document ID:", savedData._id);
        console.log("=".repeat(50));
        
        return res.status(201).json({ 
            message: "✅ Team member added successfully!",
            data: savedData,
            success: true
        });
        
    }catch (error){
        console.error("=".repeat(50));
        console.error("❌ ERROR IN CONTACT CONTROLLER");
        console.error("Error message:", error.message);
        console.error("Error stack:", error.stack);
        console.error("=".repeat(50));
        
        return res.status(500).json({
            message: "❌ Failed to add team member",
            error: error.message,
            success: false
        })
    }
};

// Get all team members from MongoDB contact collection
const getAllTeamMembers = async (req, res) => {
    try {
        console.log("=".repeat(50));
        console.log("📨 GET /api/from REQUEST RECEIVED");
        console.log("=".repeat(50));
        
        const teamMembers = await contact.find({}).sort({ createdAt: -1 });
        
        console.log("✅ Team members fetched:", teamMembers.length);
        console.log("=".repeat(50));
        
        return res.status(200).json({
            message: "✅ Team members retrieved successfully",
            data: teamMembers,
            count: teamMembers.length,
            success: true
        });
        
    } catch (error) {
        console.error("=".repeat(50));
        console.error("❌ ERROR FETCHING TEAM MEMBERS");
        console.error("Error message:", error.message);
        console.error("Error stack:", error.stack);
        console.error("=".repeat(50));
        
        return res.status(500).json({
            message: "❌ Failed to fetch team members",
            error: error.message,
            success: false
        });
    }
};

// Get all users from MongoDB users collection (public endpoint)
const getAllUsers = async (req, res) => {
    try {
        console.log("=".repeat(50));
        console.log("📨 GET /api/from/users REQUEST RECEIVED");
        console.log("=".repeat(50));
        
        const allUsers = await users.find({}, "-password").sort({ createdAt: -1 });
        
        console.log("✅ Users fetched from database:", allUsers.length);
        console.log("=".repeat(50));
        
        return res.status(200).json({
            message: "✅ Users retrieved successfully",
            users: allUsers,
            count: allUsers.length,
            success: true
        });
        
    } catch (error) {
        console.error("=".repeat(50));
        console.error("❌ ERROR FETCHING USERS");
        console.error("Error message:", error.message);
        console.error("Error stack:", error.stack);
        console.error("=".repeat(50));
        
        return res.status(500).json({
            message: "❌ Failed to fetch users",
            error: error.message,
            success: false
        });
    }
};

export default contactFrom;
export { getAllTeamMembers, getAllUsers };
