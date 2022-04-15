const permissons = {
  user: [],
  administrator: ['general:test'],
};

const roles = Object.keys(permissons);
const rolePermissions = new Map(Object.entries(permissons));

module.exports = {
  roles,
  rolePermissions,
};
