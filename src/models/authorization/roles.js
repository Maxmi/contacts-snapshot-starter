/**
 * [keeping defined roles]
 * @type {Array}
 */
const ALL_USER_ROLES = ['admin', 'regular'];

/**
 * [mapping actions to roles]
 * @type {Object}
 */
const ACTIONS_TO_ROLES = {
  viewContacts: ['admin', 'regular'],
  createContact: ['admin'],
  deleteContact: ['admin'],
};

/**
 * [mapping urls to roles]
 * @type {Object}
 */
const URLS_TO_ROLES = {
  index: ['admin', 'regular'],
  new: ['admin'],
  show: ['admin', 'regular'],
  signup: ['regular'],
  login: ['regular'],
  logout: ['admin', 'regular'],
};

/**
 * checking if a role exists
 * @param  {[type]}  role [defined earlier]
 * @return {Boolean}      [true if exists or false if not]
 */
const isValidRole = role => ALL_USER_ROLES.includes(role);

// value can be url or action
/**
 * checking if a user can go to certain route/do certain actions
 * @param  {[type]}  role  [defined earlier]
 * @param  {[type]}  value [can be url or action]
 * @return {Boolean}       [true if role/action exists and is available for current user]
 */
const hasPermission = (role, value) => isValidRole(role) && ((URLS_TO_ROLES[value] && URLS_TO_ROLES[value].includes(role)) || (ACTIONS_TO_ROLES[value] && ACTIONS_TO_ROLES[value].includes(role)));

module.exports = { hasPermission };
