// Hardcoded dummy admin credentials
const adminUser = {
    username: "admin",
    password: "admin123"
  };
  
  export const login = ({ username, password }) => {
    if (username === adminUser.username && password === adminUser.password) {
      localStorage.setItem("isAdmin", "true");
      return true;
    }
    return false;
  };
  
  export const logout = () => {
    localStorage.removeItem("isAdmin");
  };
  
  export const isAuthenticated = () => {
    return localStorage.getItem("isAdmin") === "true";
  };
  