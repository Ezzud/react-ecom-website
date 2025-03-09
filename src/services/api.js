import User from '../models/User';
const ROOT_URL = 'http://localhost:3333';


/**
 * Fetch all prescriptions
 * 
 * @returns {Promise<Array>} prescriptions
 */
export const fetchPrescriptions = async () => {
  try {
    const response = await fetch(`${ROOT_URL}/prescriptions/all`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch prescriptions');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching prescriptions:', error);
    return [];
  }
};

/**
 * Delete a prescription by ID
 * 
 * @param {string} prescriptionId
 * @returns {Promise<void>}
 */
export const deletePrescription = async (prescriptionId) => {
  try {
    const response = await fetch(`${ROOT_URL}/prescriptions/${prescriptionId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete prescription');
    }
  } catch (error) {
    console.error('Error deleting prescription:', error);
  }
};

/**
 * Update a prescription
 * 
 * @param {Object} prescription
 * @returns {Promise<void>}
 */
export const updatePrescription = async (prescription) => {
  try {
    const response = await fetch(`${ROOT_URL}/prescriptions/${prescription.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(prescription),
    });

    if (!response.ok) {
      throw new Error('Failed to update prescription');
    }
  } catch (error) {
    console.error('Error updating prescription:', error);
  }
};
/**
 * Fetch all orders
 * 
 * @returns {Promise<Array>} orders
 */
export const fetchOrders = async () => {
    try {
      const response = await fetch(`${ROOT_URL}/orders/all`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error fetching orders:', error);
      return [];
    }
  };
  
  /**
   * Delete an order by ID
   * 
   * @param {string} orderId
   * @returns {Promise<void>}
   */
  export const deleteOrder = async (orderId) => {
    try {
      const response = await fetch(`${ROOT_URL}/orders/${orderId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete order');
      }
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };
  
  /**
   * Update an order
   * 
   * @param {Object} order
   * @returns {Promise<void>}
   */
  export const updateOrder = async (order) => {
    try {
      const response = await fetch(`${ROOT_URL}/orders/${order.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update order');
      }
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

/**
 * Delete an item by ID
 * 
 * @param {string} itemId
 * @returns {Promise<void>}
 */
export const deleteItem = async (itemId) => {
    try {
      const response = await fetch(`${ROOT_URL}/items/${itemId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete item');
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };
  
  /**
   * Update an item
   * 
   * @param {Object} item
   * @returns {Promise<void>}
   */
  export const updateItem = async (item) => {
    try {
      const response = await fetch(`${ROOT_URL}/items/${item.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update item');
      }
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };
/**
 * Fetch all users
 * 
 * @returns {Promise<Array>} users
 */
export const getUsers = async () => {
    try {
      const response = await fetch(`${ROOT_URL}/users/all`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  };
  
  /**
   * Delete a user by ID
   * 
   * @param {string} userId
   * @returns {Promise<void>}
   */
  export const deleteUser = async (userId) => {
    try {
      const response = await fetch(`${ROOT_URL}/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };
  
  /**
   * Update a user
   * 
   * @param {Object} user
   * @returns {Promise<void>}
   */
  export const updateUser = async (user) => {
    // This function will be implemented later
  };

/**
 * Fetch all items
 * 
 * @returns {Promise<Array|null>} items
 */
export const fetchItems = async () => {
    try {
        const response = await fetch(`${ROOT_URL}/items/all`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch items');
        }

        const data = await response.json();

        return data.map(item => ({
            ...item,
            description: item.description.substring(0, 100),
            avatarURL: item.avatarURL,
            price: item.price
        }));
    } catch (error) {
        console.error('Error fetching items:', error);
        return null;
    }
};

/**
 * Get a session token for the user using email and password
 * 
 * @param {string} email
 * @param {string} password
 * 
 * @returns {Promise<string|null>} sessionToken
 */
export const authenticateUser = async (email, password) => {
    try {
        const response = await fetch(`${ROOT_URL}/auth/session`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                email: email,
                password: password,
            }),
        });
        if (!response.ok) {
            throw new Error('Failed to get session token');
        }

        const data = await response.json();

        if (data.error === "IncorrectCredentials") {
            return null;
        }

        return data.sessionToken;
    } catch (error) {
        console.error('Error getting session token:', error);
        return null;
    }
};

export const registerUser = async ({ firstName, lastName, email, password }) => {
    try {
        const response = await fetch(`${ROOT_URL}/users/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            if (errorData.error === "EmailAlreadyUsed") {
                throw new Error('EmailAlreadyUsed');
            }
            throw new Error('Failed to register user');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
};

/**
 * Verify a session token
 * 
 * @returns {Promise<User|null>} user
 */
export const verifySessionToken = async () => {
    try {
        const sessionToken = getCookie('sessionToken');

        if (!sessionToken) {
            return null;
        }

        const response = await fetch(`${ROOT_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain',
            },
            body: sessionToken,
        });

        if (!response.ok) {
            throw new Error('Failed to verify session token');
        }

        const data = await response.json();

        if (data.error === "InvalidOrExpired" || data.error === "NotFound") {
            return null;
        }

        return User.fromJSON(data);
    } catch (error) {
        console.error('Error verifying session token:', error);
        return null;
    }
};

export const isAuthenticated = async () => {
    try {
        const user = await verifySessionToken();
        return user !== null;
    } catch (error) {
        console.error('Error verifying session token:', error);
        return false;
    }
}

export const logout = () => {
    document.cookie = 'sessionToken=; Max-Age=0; path=/';
    window.location.reload();
};

const getCookie = (name) => {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
};

/**
 * Get user basket items
 * 
 * @param {string} userId
 * @param {number} limit
 * 
 * @returns {Promise<Array|null>} basketItems
 */
export const getUserBasketItems = async (userId, limit = 0) => {
    try {
        const response = await fetch(`${ROOT_URL}/basket/${userId}/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${getCookie('sessionToken')}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch basket items');
        }

        const data = await response.json();

        if (data.error) {
            if (data.error === 'BasketNotFound') {
                console.error('Basket not found');
                return [];
            } else if (data.error === 'UserNotFound') {
                window.location.href = '/login';
                return [];
            } else {
                throw new Error(data.error);
            }
        }

        const items = Array.isArray(data.items) ? data.items.reduce((acc, item) => {
            const existingItem = acc.find(i => i.id === item.id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                acc.push({ ...item, quantity: 1 });
            }
            return acc;
        }, []) : [];

        if (limit > 0) {
            return items.slice(0, limit);
        }

        return items;
    } catch (error) {
        console.error('Error fetching basket items:', error);
        return null;
    }
};

/**
 * Add an item to the user's basket
 * 
 * @param {string} userId
 * @param {string} itemId
 * @param {number} quantity
 * 
 * @returns {Promise<Object|null>} addedItem
 */
export const addItemToBasket = async (userId, itemId, quantity) => {
    try {
        const response = await fetch(`${ROOT_URL}/basket/${userId}/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `${getCookie('sessionToken')}`,
            },
            body: new URLSearchParams({
                id: itemId,
                quantity: quantity,
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to add item to basket');
        }

        const data = await response.json();

        if (data.error) {
            if (data.error === 'Unauthorized' || data.error === 'UserNotFound') {
                logout();
                window.location.href = '/';
                return null;
            } else if (data.error === 'ItemNotFound') {
                return null;
            } else {
                throw new Error(data.error);
            }
        }

        return data.item;
    } catch (error) {
        console.error('Error adding item to basket:', error);
        return null;
    }
};

/**
 * Remove an item from the user's basket
 * 
 * @param {string} userId
 * @param {string} itemId
 * @param {number} quantity
 * 
 * @returns {Promise<Object>} result
 */
export const removeItemFromBasket = async (userId, itemId, quantity) => {
  try {
      const response = await fetch(`${ROOT_URL}/basket/${userId}/remove`, {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': `${getCookie('sessionToken')}`,
          },
          body: new URLSearchParams({
              id: itemId,
              quantity: quantity,
          }),
      });

      if (!response.ok) {
          throw new Error('Failed to remove item from basket');
      }

      const data = await response.json();

      if (data.error) {
          if (data.error === 'Unauthorized' || data.error === 'UserNotFound') {
              logout();
              window.location.href = '/';
              return { success: false, error: data.error };
          } else if (data.error === 'ItemNotFound') {
              return { success: false, error: data.error };
          } else {
              throw new Error(data.error);
          }
      }

      return { success: true };
  } catch (error) {
      console.error('Error removing item from basket:', error);
      return { success: false, error: error.message };
  }
};