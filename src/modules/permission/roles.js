const roles = {
  admin: [
    // USER
    'user.get.all',
    'user.delete.any',
    'user.update.all',

    // GROUP
    'group.get.all',
    'group.create',
    'group.update.any',
    'group.delete.any',
  ],
  student: [
    // USER
    'user.get.all',

    // GROUP
    'group.get.all',
  ],
};

export default roles;
