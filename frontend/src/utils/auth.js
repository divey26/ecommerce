export const isAuthenticate = () => {
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  const userEmail = localStorage.getItem('userEmail');
  const address = localStorage.getItem('userAddress'); // Fixed: Removed extra argument
  const phone = localStorage.getItem('userPhone'); // Fixed: Removed extra argument

  if (token) {
    return {
      authenticated: true,
      userDetails: {
        userId,
        email: userEmail,
        address, // Added address
        phone,   // Added phone
      },
    };
  }

  return { authenticated: false, userDetails: null };
};
