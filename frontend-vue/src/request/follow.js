import { CREATE_FOLLOW, DELETE_FOLLOW } from '../graphql/follow';
import { GET_AUTH_USER, GET_USER } from '../graphql/user';
import { GET_POSTS } from '../graphql/post';
import { mutate } from '.';
import { getAuthInfoSync } from '../request/user';

export async function createFollow(userId, username) {
  const { id } = await getAuthInfoSync();
  return await mutate({
    mutation: CREATE_FOLLOW,
    variables: {
      input: { userId, followerId: id },
    },
    refetchQueries: [
      { query: GET_AUTH_USER },
      { query: GET_POSTS, variables: { authUserId: id } },
      { query: GET_USER, variables: { username } },
    ],
  });
}

export async function deleteFollow(followerId, username) {
  const { id } = await getAuthInfoSync();
  return await mutate({
    mutation: DELETE_FOLLOW,
    variables: {
      input: { id: followerId },
    },
    refetchQueries: [
      { query: GET_AUTH_USER },
      { query: GET_POSTS, variables: { authUserId: id } },
      { query: GET_USER, variables: { username } },
    ],
  });
}
