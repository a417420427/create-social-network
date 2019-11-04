import { CREATE_LIKE, DELETE_LIKE } from '../graphql/like';
import { GET_FOLLOWED_POSTS, GET_POSTS } from '../graphql/post';
import { mutate } from '.';
import { getAuthInfoSync } from '../request/user';

export async function createLike(post) {
  const { id } = await getAuthInfoSync();
  return await mutate({
    mutation: CREATE_LIKE,
    variables: {
      input: {
        postId: post.id,
        userId: id,
      },
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

export async function deleteLike(hasLike) {
  const { id } = await getAuthInfoSync();
  return await mutate({
    mutation: DELETE_LIKE,
    variables: {
      input: { id: hasLike.id },
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
