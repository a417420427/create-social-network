db.createUser({
  user: 'root',
  pwd: '123456',
  roles: [{ role: 'userAdminAnyDatabase', db: 'admin' }],
});
