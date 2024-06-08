const { db } = require("../../models/firestore");

const getUserProfile = async (req, res) => {
    try {
        const userId = req.userId;
        if (!userId) {
            return res.status(400).json({
                status: "error",
                message: "Bad request",
                code: 400
            });
        }

        const userRef = db.collection('users').doc(userId.toString());  //ADA ERROR PADA LINE INI BANGG
        const doc = await userRef.get();

        if (!doc.exists) {
            return res.status(404).json({
                status: "error",
                message: "User not found",
                code: 404
            });
        }

        const user = doc.data();
        const mappedRes = mapUserToResponse(user);

        return res.status(200).json({
            status: "success",
            message: "User profile",
            data: mappedRes
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: error.message,
            code: 500
        });
    }
};

// Helper function to map user data to response
const mapUserToResponse = (user) => {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        // Add other necessary fields
    };
};

module.exports = getUserProfile;
