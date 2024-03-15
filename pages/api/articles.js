//algolia search
import { algoliaClient } from "../../lib/algolia/index";

// Axios
import axios from "axios";

// Get articles with pagination
export async function getArticleOnPage({ sortBy, pageParam = 1 }) {
  try {
    const data = await axios.get(
      `http://localhost:9000/api/v1/articles?page=${pageParam}${
        sortBy === "top" ? "&&sortBy=numLikes&&asc=-1" : ""
      }`
    );
    return data.data.data.articles;
  } catch (err) {
    console.log(err);
  }
}

// Get all articles
export async function getAllArticles() {
  try {
    const data = await axios.get(`http://localhost:9000/api/v1/articles`);

    const articles = data.data.data.articles;

    return articles;
  } catch (err) {
    console.log(err);
  }
}

// Heart a article
export async function heart({ articleID, email }) {
  try {
    const data = await axios.patch(
      `http://localhost:9000/api/v1/articles/${articleID}`,
      {
        type: "heart",
        email,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return data.data.data.articles;
  } catch (err) {
    console.log(err);
  }
}

// Create a article
export async function createArticle(articleData) {
  try {
    const data = await axios.post(
      `http://localhost:9000/api/v1/articles`,
      articleData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const article = data?.data?.data?.article;
    console.log("article: ", article);

    // Create index for algolia search
    if (article) {
      const { _id, slug, title } = article;

      //init index
      const articlesIndex = algoliaClient.initIndex("articles");
      articlesIndex
        .saveObject({
          objectID: _id,
          type: "article",
          slug,
          title,
        })
        .then(() => {
          console.log("✔ SUCCESS");
        })
        .catch((err) => {
          console.log("💥 ERROR");
          console.error(err);
        });
    }
    return article;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}

// Get a article
export async function getArticle(id) {
  try {
    const data = await axios.get(`http://localhost:9000/api/v1/articles/${id}`);
    const article = data.data.data.article;
    return article;
  } catch (err) {
    console.log(err);
  }
}

// Update a article
export async function updateArticle(articleData) {
  try {
    const data = await axios.patch(
      `http://localhost:9000/api/v1/articles/${articleData.id}`,
      articleData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const article = data?.data?.data?.article;

    return article;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}
