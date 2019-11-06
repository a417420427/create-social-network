import { CREATE_POST, DELETE_POST, GET_FOLLOWED_POSTS } from '../graphql/post';
import { GET_USER_POSTS } from '../graphql/user';
import { mutate } from '.';
import { getAuthInfoSync } from '../request/user';
export async function deletePost({ postId }) {
  const { id } = await getAuthInfoSync();
  return await mutate({
    mutation: DELETE_POST,
    variables: {
      input: {
        id: postId,
        imagePublicId: null,
      },
    },
    refetchQueries: [
      {
        query: GET_FOLLOWED_POSTS,
        variables: {
          userId: id,
        },
      },
    ],
  });
}

export const createPost = async ({ title, image }) => {
  const { id, username } = await getAuthInfoSync();
  return await mutate({
    mutation: CREATE_POST,
    variables: {
      input: {
        title,
        image,
        authorId: id,
      },
    },
    refetchQueries: [
      {
        query: GET_FOLLOWED_POSTS,
        variables: {
          userId: id,
        },
      },
      {
        query: GET_USER_POSTS,
        variables: {
          username,
        },
      },
    ],
  });
};
