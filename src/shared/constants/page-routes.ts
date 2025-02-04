export const pageRoutes = {
  home: "/",
  posts: "/posts",
  about: "/about",
} as const;

export const navigationRoutes = [
  { text: "Home", path: pageRoutes.home },
  { text: "About", path: pageRoutes.about },
];
