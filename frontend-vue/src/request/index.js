import { apolloClient } from '../ApolloClient';

export const mutate = async options => {
  try {
    return await apolloClient.mutate(options);
  } catch (_) {
    // TODO 错误处理
    console.log(options, _);
  }
};

export const query = async options => {
  try {
    return await apolloClient.query(options);
  } catch (_) {
    console.log(options, _);
  }
};

// export const generateVariables = async ({key}) => {
//   const {id} = await
//   switch (key) {
//     case 'GET_FOLLOWED_POSTS':
//       return {userId: options.}
//   }
// }
