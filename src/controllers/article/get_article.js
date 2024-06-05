const { articleDb } = require("../../models/firestore");
const ResponseError = require("../../utils/errors/ResponseError");
const { sendSuccess, sendError } = require("../../utils/server/send");

async function GetArticlesListController(req, res) {
  const articles = await articleDb.get();

  const result = [];
  articles.forEach((doc) => {
    const { id, title, postedAt, thumbnail_url, short_description } = doc.data();
    result.push({
      id: id,
      title: title,
      postedAt: postedAt,
      thumbnail_image_url: thumbnail_url,
      short_description: short_description
    });
  })

  return sendSuccess(res, 200, {
    length: result.length,
    articles: result,
  })
};

async function GetArticleController(req, res) {
  try {
    const { id } = req.params;
    const article = await articleDb.doc(id).get();
    if (!article.exists) {
      throw new ResponseError(404, "Article not found.");
    };

    return sendSuccess(res, 200, {
      "article": article.data(),
    })
  } catch (e) {
    if (e instanceof ResponseError) {
      return sendError(res, e.statusCode, e.message);
    }
    return sendError(res, 503, "There is a problem with the server. Please try again later.");
  }  

}

module.exports = {
  GetArticlesListController,
  GetArticleController
};