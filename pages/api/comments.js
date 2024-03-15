// Axios
import axios from "axios";

// Get comments with pagnations
export async function getCommentsOnPage({ articlesID, pageParam = 1 }) {
  try {
    const data = await axios.get(
      `http://localhost:9000/api/v1/comments/articles/${articlesID}?page=${pageParam}`
    );
    return data.data.data.topComments;
  } catch (err) {
    console.log(err);
  }
}

// Get all comments
export async function getAllComments({ articleID }) {
  try {
    const data = await axios.get(
      `http://localhost:9000/api/v1/comments/articles/${articleID}`
    );
    return data.data.data;
  } catch (err) {
    console.log(err);
  }
}

// Create a comment
export async function createComment(payload) {
  try {
    const data = await axios.post(
      `http://localhost:9000/api/v1/comments`,
      payload,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const comment = data?.data?.data?.comment;
    return comment;
  } catch (err) {
    console.log(err);
  }
}

// Delete comment
export async function deleteComment(id) {
  try {
    const data = await axios.delete(
      `http://localhost:9000/api/v1/comments/${id}`,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return;
  } catch (err) {
    console.log(err);
  }
}
