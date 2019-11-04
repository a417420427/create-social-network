import { apolloClient } from '../ApolloClient';

export const mutate = async options => {
  try {
    const result = await apolloClient.mutate(options);
    return result;
  } catch (_) {
    // TODO 错误处理
    console.log(options, _);
  }
};

export const query = async options => {
  try {
    const result = await apolloClient.query(options);
    return result;
  } catch (_) {
    console.log(options, _);
  }
};
