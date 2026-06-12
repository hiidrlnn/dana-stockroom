export function getUser() {
  if (typeof window === "undefined") return null;

  const user = localStorage.getItem("user");

  return user ? JSON.parse(user) : null;
}

export function hasRole(role: string) {
  const user = getUser();

  return user?.role === role;
}
