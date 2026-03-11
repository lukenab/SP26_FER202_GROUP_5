import { useNavigate } from 'react-router-dom';

export default function UserPage() {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div style={{ padding: '40px' }}>
      <h1>Welcome to OBSM Books</h1>

      {user && (
        <p>
          Hello <b>{user.name}</b> 
        </p>
      )}
      <button onClick={() => navigate('/profile')}>Go to Profile</button>

      <p>
        You are logged in as <b>{user?.role}</b>
      </p>

      <button onClick={logout}>Logout</button>
    </div>
  );
}
