// Authentication

export const getUser = () => {
    const userStr = sessionStorage.getItem('user');
    if (userStr)
        return JSON.parse(userStr);
    else
        return null;
}

// remove user from session storage
export const removeUserSession = () => {
    sessionStorage.removeItem('user');
}

// set the user in session storage
export const setUserSession = (user) => {
    sessionStorage.setItem('user', JSON.stringify(user));
}