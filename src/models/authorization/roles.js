const ALL_USER_ROLES = ['admin', 'regular'];

// const ACTIONS_TO_ROLES = {
  // viewContacts: ['admin', 'regular'],
  // createContact: ['admin'],
  // deleteContact: ['admin']
// };

//make something like above for urls and actions that users can navigate to
const URLS_TO_ROLES = {
  'index': ['admin', 'regular'],
  'new': ['admin'],
  'show': ['admin', 'regular'],
  'signup': ['regular'],
  'login': ['regular'],
  'logout': ['admin','regular']
}

const hasPermission = (role, url) => {
  // const allRoutes = Object.keys(URLS_TO_ROLES);
  // const isValidRole = ACTIONS_TO_ROLES.includes(role);
  // if(!isValidRole) {
  //   throw new Error(`Role "${role}" does not exis`)
  // } else if (!allActions.includes(action)) {
  //   throw new Error(`Action: "${action}" does not exist`);
  // } else {
  //   return ACTIONS_TO_ROLES[action].includes(role);
  // }
  return URLS_TO_ROLES[url].includes(role);
};

module.exports = {hasPermission};
