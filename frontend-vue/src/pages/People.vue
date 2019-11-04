<template>
  <div class="page-people">
    <ul class="user-card-list">
      <li is="UserCard" :user="user" v-for="user in getUsers.users" :key="user.id"></li>
    </ul>
  </div>
</template>
<script>
import { GET_USERS } from '../graphql/user';
import { USER_SUGGESTIONS } from '../graphql/user';
import UserCard from '../components/UserCard';

export default {
  data() {
    return {
      limit: 10,
      skip: 0,
      getUsers: {
        users: [],
        count: '0',
      },
    };
  },
  apollo: {
    getUsers: {
      query: GET_USERS,
      variables() {
        return {
          limit: this.limit,
          skip: this.skip,
          userId: this.authorId,
        };
      },
    },
  },
  components: {
    UserCard,
  },
  mounted() {
    setTimeout(() => {
      console.log(this.getUsers, this.getSuggestions);
    }, 400);
  },
};
</script>

<style lang="scss" scoped>
.user-card-list {
  width: 100%;
  margin-top: 30px;
  padding: 0 20px;
  box-sizing: border-box;
}
</style>