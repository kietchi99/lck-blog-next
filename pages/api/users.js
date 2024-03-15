import axios from "axios";

export async function createUser(email, name, avatar) {
  try {
    const data = await axios.post(
      "http://localhost:9000/api/v1/users",
      {
        email,
        name,
        avatar,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return data.data.data.user;
  } catch (err) {
    console.log(err);
  }
}

// Get a user
export async function getUser(email) {
  try {
    const data = await axios.get(`http://localhost:9000/api/v1/users/${email}`);
    return data.data.data.user;
  } catch (err) {
    console.log(err);
  }
}

// Bookmark
export async function bookmark({ userID, articleID }) {
  try {
    const data = await axios.patch(
      `http://localhost:9000/api/v1/users/${userID}`,
      {
        type: "bookmark",
        articleID,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return data.data.data.user;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}

// Get user's saved articles
export async function getSavedArticles({ userID, pageParam = 1 }) {
  try {
    const data = await axios.get(
      `http://localhost:9000/api/v1/users/${userID}/articles?page=${pageParam}`
    );
    return data.data.data.articles;
  } catch (err) {
    console.log(err);
  }
}
