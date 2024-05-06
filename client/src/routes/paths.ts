// ----------------------------------------------------------------------

const path = (root: string, subLink: string) => {
    return `${root}${subLink}`;
};

const ROOT_AUTH = '/account';

// ----------------------------------------------------------------------
export const PATH_AUTH = {
    SELF: ROOT_AUTH,
    SIGN_IN: path(ROOT_AUTH, '/sign-in'),
    SIGN_UP: path(ROOT_AUTH, '/sign-up'),
};
export const PATH_MAIN = {
    HOME: '/',
    TOP_USERS: '/top-users',
    APPOINTMENT: '/appointment',
    CLINIC: '/clinic',
    BLOG: '/blog',
    DOCTOR: '/doctor',
};
export const PATH_OTHER = {
    NOT_FOUND: '/404',
};

export const PATH_ACCOUNT = {
    PROFILE: '/profile',
};
