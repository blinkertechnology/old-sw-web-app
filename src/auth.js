export const logout = () => {    
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
}

export const login = (token, user) => {
    localStorage.setItem('access_token', token);
    localStorage.setItem('user', JSON.stringify(user));
}