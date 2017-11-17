const ALL_USER_ROLES = ['admin', 'regular'];

const ACTIONS_TO_ROLES = {
  viewContacts: ['admin', 'regular'],
  createContact: ['admin'],
  deleteContact: ['admin'],
};

const URLS_TO_ROLES = {
  index: ['admin', 'regular'],
  new: ['admin'],
  show: ['admin', 'regular'],
  signup: ['regular'],
  login: ['regular'],
  logout: ['admin', 'regular'],
};

const isValidRole = role => ALL_USER_ROLES.includes(role);

// value can be url or action
const hasPermission = (role, value) => isValidRole(role) && ((URLS_TO_ROLES[value] && URLS_TO_ROLES[value].includes(role)) || (ACTIONS_TO_ROLES[value] && ACTIONS_TO_ROLES[value].includes(role)));

module.exports = { hasPermission };
