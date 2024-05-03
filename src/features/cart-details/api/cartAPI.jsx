export function addToCartAPI(item) {
  return new Promise(async (resolve) => {
    console.log("addToCartAPI item:", item);
    const response = await fetch("http://localhost:8000/cart", {
      method: "POST",
      body: JSON.stringify(item),
      headers: { "content-type": "application/json" },
    });

    const data = await response.json();

    resolve({ data });
  });
}

export function fetchUserCartItemsAPI(user_id) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      `http://localhost:8000/cart?user_id=${user_id}`
    );
    const data = await response.json();
    resolve({ data });
  });
}

export function updateCartItemsAPI(update) {
  return new Promise(async (resolve) => {
    console.log(update);
    const response = await fetch(`http://localhost:8000/cart/${update.id}`, {
      method: "PUT",
      body: JSON.stringify(update),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function deleteCartItemsAPI(deleteID){
    return new Promise(async (resolve) => {
        const response = await fetch('http://localhost:8000/cart/' + deleteID , {
          method: "DELETE",
          headers: { "content-type": "application/json" },
        });
        const data = await response.json();
        resolve({ data: {id: deleteID} });
      });
}


export async function resetCartAPI(userId) {
  try {
    const response = await fetchUserCartItemsAPI(userId);
    const userCartItems = response.data;
    const deletePromises = userCartItems.map(item => deleteCartItemsAPI(item.id));
    await Promise.all(deletePromises);
    return { status: 'success' };
  } catch (error) {
    console.error('Error resetting cart:', error);
    throw error;
  }
}
