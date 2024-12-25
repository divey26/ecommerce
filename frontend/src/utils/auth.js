export const isAuthenticate = () => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const userEmail = localStorage.getItem('userEmail');
  
    if (token) {
      return {
        authenticated: true,
        userDetails: {
          userId,
          email: userEmail,
        },
      };
    }
  
    return { authenticated: false, userDetails: null };
  };
  