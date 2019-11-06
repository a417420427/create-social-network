import {
  GET_AUTH_USER,
  SIGN_IN,
  SIGN_UP,
  UPLOAD_PHOTO,
  GET_USER_POSTS,
} from '../graphql/user';
import { apolloClient } from '../ApolloClient';
import { query, mutate } from '.';
import { GET_FOLLOWED_POSTS } from '../graphql/post';

export const getAuthUser = async () => {
  return await query({
    query: GET_AUTH_USER,
  });
};

const getAuthInfo = reload => {
  let authInfo;
  return async () => {
    if (authInfo && !reload) {
      return authInfo;
    }
    const result = await getAuthUser();
    if (result && result.data.getAuthUser) {
      const { id, username, following } = result.data.getAuthUser;
      authInfo = { id, username, following };
      return authInfo;
    }
  };
};

export const getAuthInfoSync = getAuthInfo();

export const signIn = async ({ emailOrUsername, password }) => {
  return await mutate({
    mutation: SIGN_IN,
    variables: {
      input: { emailOrUsername, password },
    },
  });
};

export const signUp = async ({ fullName, email, password, username }) => {
  return await mutate({
    mutation: SIGN_UP,
    variables: {
      input: { fullName, email, password, username },
    },
  });
};

export const uploadPhoto = async ({ image, imagePublicId, isCover }) => {
  const { id } = await getAuthInfoSync();
  return await mutate({
    mutation: UPLOAD_PHOTO,
    variables: {
      input: { image, imagePublicId, id, isCover },
    },
    refetchQueries: [
      { query: GET_FOLLOWED_POSTS, variables: { userId: id } },
      { query: GET_AUTH_USER },
    ],
  });
};

window.apolloClient = apolloClient;
