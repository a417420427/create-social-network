import { CREATE_FOLLOW, DELETE_FOLLOW } from '../graphql/follow';
import { GET_AUTH_USER } from '../graphql/user';
import { GET_POSTS } from '../graphql/post';
import { mutate } from '.';
import { getAuthInfoSync } from '../request/user';

export async function createFollow(authorId) {
  // TODO 完成关注接口
  const { id } = await getAuthInfoSync();
  return await mutate({
    mutation: CREATE_FOLLOW,
    variables: {
      input: { userId: authorId, followerId: id },
    },
    refetchQueries: [
      { query: GET_AUTH_USER },
      { query: GET_POSTS, variables: { authUserId: id } },
    ],
  });
}

export async function deleteFollow(followerId) {
  const { id } = await getAuthInfoSync();
  return await mutate({
    mutation: DELETE_FOLLOW,
    variables: {
      input: { id: followerId },
    },
    refetchQueries: [
      { query: GET_AUTH_USER },
      { query: GET_POSTS, variables: { authUserId: id } },
    ],
  });
}
