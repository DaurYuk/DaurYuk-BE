const { usersDb } = require("../../models/firestore");
const ResponseError = require("../../utils/errors/ResponseError");
const { sendError, sendSuccess } = require("../../utils/server/send");

const GetUserProfileController = async (req, res) => {
  try {
    const userId = req.token.id;

    const doc = await usersDb.doc(userId).get();

    if (!doc.exists) {
      throw new ResponseError(404, "User not found");
    }

    const user = doc.data();
    const mappedRes = mapUserToResponse(user);

    return sendSuccess(res, 200, {
      data: mappedRes
    })
  } catch (e) {
    if (e instanceof ResponseError) {
      return sendError(res, e.statusCode, e.message);
    } else {
      console.log(e);
      return sendError(res, 500, "There is a problem with the server. Please try again later");
    }
  }
};

// Helper function to map user data to response
const mapUserToResponse = (user) => {
  return {
    id: user.id,
    profile: user.profile,
    email: user.email,
  };
};

module.exports = GetUserProfileController;
