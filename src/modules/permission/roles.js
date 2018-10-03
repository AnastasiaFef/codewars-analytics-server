const roles = {
  admin: [
    // USER
    'user.get.all',
    'user.delete.any',
    'user.update.all',

    // GROUP
    'group.create',
    'group.update.any',
    'group.delete.any',
  ],
  student: [
    // USER
    'user.get.all',
  ],
};

export default roles;
