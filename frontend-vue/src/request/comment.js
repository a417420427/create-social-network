import { GET_FOLLOWED_POSTS, GET_POSTS } from '../../graphql/post';
import { CREATE_COMMENT, DELETE_COMMENT } from '../../graphql/comment';
import { getAuthInfoSync } from '../request/user';
import { mutate } from '.';

export async function createComment({ comment, postId }) {
  const { id } = await getAuthInfoSync();
  return await mutate({
    mutation: CREATE_COMMENT,
    variables: {
      input: { comment, author: id, postId },
    },
    refetchQueries: [
      {
        query: GET_FOLLOWED_POSTS,
        variables: { userId: id },
      },
      {
        query: GET_POSTS,
        variables: { authUserId: id },
      },
    ],
  });
}

export async function deleteComment(commentId) {
  const { id } = await getAuthInfoSync();
  await mutate({
    mutation: DELETE_COMMENT,
    variables: {
      input: { id: commentId },
    },
    refetchQueries: [
      {
        query: GET_FOLLOWED_POSTS,
        variables: { userId: id },
      },
      {
        query: GET_POSTS,
        variables: { authUserId: id },
      },
    ],
  });
}
