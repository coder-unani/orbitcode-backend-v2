// ----------------------------------------------------------------------

const ROOTS = {
  AUTH: '/auth',
  DASHBOARD: '/dashboard',
  CONTENT: '/content',
  USER: '/user',
};

// ----------------------------------------------------------------------

export const paths = {
  minimalUI: 'https://mui.com/store/items/minimal-dashboard/',
  // AUTH
  auth: {
    jwt: {
      login: `${ROOTS.AUTH}/jwt/login`,
      register: `${ROOTS.AUTH}/jwt/register`,
    },
  },
  // DASHBOARD
  dashboard: {
    root: ROOTS.DASHBOARD,
    one: `${ROOTS.DASHBOARD}/one`,
    two: `${ROOTS.DASHBOARD}/two`,
    three: `${ROOTS.DASHBOARD}/three`,
    group: {
      root: `${ROOTS.DASHBOARD}/group`,
      five: `${ROOTS.DASHBOARD}/group/five`,
      six: `${ROOTS.DASHBOARD}/group/six`,
    },
  },
  // CONTENT
  content: {
    root: ROOTS.CONTENT,
    video: {
      root: `${ROOTS.CONTENT}/video`,
      new: `${ROOTS.CONTENT}/video/new`,
      list: `${ROOTS.CONTENT}/video/list`,
      details: (id: string) => `${ROOTS.CONTENT}/video/${id}`,
      edit: (id: string) => `${ROOTS.CONTENT}/video/${id}/edit`,
      ranking: `${ROOTS.CONTENT}/video/ranking`,
    },
  },
};
