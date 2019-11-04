import * as userSql from '../../graphql/user';
import { apolloClient } from '../../graphql/ApolloClient';
import { query } from '.';

export const getAuthUser = async () => {
  const result = await query({
    query: userSql.GET_AUTH_USER,
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
    if (result) {
      const { id, username, following } = result.data.getAuthUser;
      authInfo = { id, username, following };
      return authInfo;
    }
  };
};

export const getAuthInfoSync = getAuthInfo();

window.apolloClient = apolloClient;
