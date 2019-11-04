import { GET_AUTH_USER } from '../graphql/user';
import { apolloClient } from '../ApolloClient';
import { query } from '.';

export const getAuthUser = async () => {
  const result = await query({
    query: GET_AUTH_USER,
  });
  return result;
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

window.apolloClient = apolloClient;
