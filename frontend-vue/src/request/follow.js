import { CREATE_FOLLOW, DELETE_FOLLOW } from '../graphql/follow';
import { mutate } from '.';
import { getAuthInfoSync } from '../request/user';

export async function createFollow(followerId) {
  const { id } = await getAuthInfoSync();
  return await mutate({
    mutation: CREATE_FOLLOW,
    variables: {
      input: { userId: id, followerId: followerId },
    },
  });
}

export async function deleteFollow(followerId) {
  return await mutate({
    mutation: DELETE_FOLLOW,
    variables: {
      input: { id: followerId },
    },
  });
}
