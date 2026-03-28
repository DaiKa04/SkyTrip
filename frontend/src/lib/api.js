// frontend/src/lib/api.js

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// Helper: lấy token từ localStorage
const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

// Helper: thêm header Authorization nếu có token
const authHeader = () => {
  const token = getToken();
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

// ==================== AUTH ====================
export async function register(userData) {
  const res = await fetch(`${API_URL}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Registration failed');
  return data; // { token, user }
}

export async function login(credentials) {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Login failed');
  return data; // { token, user }
}

export async function getCurrentUser() {
  const res = await fetch(`${API_URL}/api/auth/me`, {
    headers: {
      'Content-Type': 'application/json',
      ...authHeader()
    }
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to fetch user');
  return data; // { user }
}

export async function updateProfile(userData) {
  const res = await fetch(`${API_URL}/api/auth/me`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...authHeader()
    },
    body: JSON.stringify(userData)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Update failed');
  return data; // { user }
}

export async function changePassword(passwordData) {
  const res = await fetch(`${API_URL}/api/auth/change-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...authHeader()
    },
    body: JSON.stringify(passwordData)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Change password failed');
  return data; // { message }
}

// ==================== ADMIN ====================
export async function getAllUsers() {
  const res = await fetch(`${API_URL}/api/admin/users`, {
    headers: {
      'Content-Type': 'application/json',
      ...authHeader()
    }
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to fetch users');
  return data; // { users }
}

export async function updateUserRole(userId, role) {
  const res = await fetch(`${API_URL}/api/admin/users/${userId}/role`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...authHeader()
    },
    body: JSON.stringify({ role })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to update role');
  return data; // { user }
}

export async function toggleUserActive(userId) {
  const res = await fetch(`${API_URL}/api/admin/users/${userId}/toggle-active`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...authHeader()
    }
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to toggle user active');
  return data; // { user }
}

// ==================== PLACES (tạm thời) ====================
export async function getPlaces() {
  const res = await fetch(`${API_URL}/api/places`);
  if (!res.ok) throw new Error('Failed to fetch places');
  return res.json();
}

export async function getPlaceById(id) {
  const res = await fetch(`${API_URL}/api/places/${id}`);
  if (!res.ok) throw new Error('Failed to fetch place');
  return res.json();
}

export const addFavorite = async (placeId) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Not authenticated');
  const res = await fetch(`${API_URL}/api/favorites`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ placeId })
  });
  if (!res.ok) throw new Error('Failed to add favorite');
  return res.json();
};

export const removeFavorite = async (placeId) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Not authenticated');
  const res = await fetch(`${API_URL}/api/favorites/${placeId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  if (!res.ok) throw new Error('Failed to remove favorite');
  return res.json();
};
// ==================== REVIEWS (tạm thời) ====================
export async function getRecentReviews(limit = 3) {
  try {
    const res = await fetch(`${API_URL}/api/reviews/recent?limit=${limit}`);
    if (!res.ok) {
      console.warn('API /reviews/recent chưa sẵn sàng, trả về mảng rỗng');
      return [];
    }
    return await res.json();
  } catch (error) {
    console.error('Error fetching recent reviews:', error);
    return [];
  }
}