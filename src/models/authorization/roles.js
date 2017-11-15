const ALL_USER_ROLES = ['admin', 'viewer'];

const CAPABALITY_ROLES = {
  viewContacts: ['admin', 'viewer'],
  viewContact: ['admin', 'viewer'],
  createContact: ['admin'],
  deleteContact: ['admin']
};

const userHasAccess = (user, action) => {
  const role = user.role;
  const allActions = Object.keys(CAPABALITY_ROLES)
  const isValidRole = ALL_USER_ROLES.includes(role);
  if(!isValidRole) {
    //return false; //throw exception
    throw new Error(`User ${user.username} does not have a role`)
  } else if (!allActions.includes(action)) {
    // return false; //throw exception
    throw new Error(`Tried to get permissions for an invalid action. Action: ${action}`);
  } else {
    const capabilities = CAPABALITY_ROLES[action];
    return capabilities.includes(user.role);
  }
};
//userHasAccess(user, 'viewContacts'); => true or false
