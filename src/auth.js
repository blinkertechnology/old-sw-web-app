export const logout = () => {
    console.log('logout');
    
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
}