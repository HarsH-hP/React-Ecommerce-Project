export function fetchAllProductsAPI() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8000/products");
    const data = await response.json();
    resolve({ data });
  });
}


export function fetchProductByIdAPI(id){
    return new Promise(async (resolve) => {
        const response = await fetch(`http://localhost:8000/products/${id}`);
        const data = await response.json();
        resolve({ data });
    })
}

export function createProductAPI(product){
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8000/products", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(product),
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchFilteredProductsAPI(filter, sort, pagination) {
  // filter = {"category":["smartphone","laptops"]}
  // sort = {_sort:"price",_order="desc"}
  // pagination = {_start:1,_end=10}
  let urlString = "";
  console.log("api filter sort:", filter, sort, pagination);

  for (let key in filter) {
    const categoryValues = filter[key];
    if (categoryValues.length >= 1) {
      categoryValues.map((c) => {
        urlString += `${key}=${c}&`;
      });
    }
  }

  if(sort._order === 'asc' || sort._order === 'desc') {
    const value = sort._order === 'asc' ? sort._sort : '-'+(sort._sort)
    urlString += `_sort=${value}&`;
  }
  let pageString = "";
  for (let key in pagination) {
    pageString += `${key}=${pagination[key]}&`;
  }

  console.log("api url: ", urlString);
  return new Promise(async (resolve) => {
    let response = await fetch(`http://localhost:8000/products?` + urlString);
    let data = await response.json();
    const totalItems = data.length;
    
    response = await fetch(`http://localhost:8000/products?` + urlString + pageString);
    data = await response.json();

    resolve({data: {
        products:data, 
        totalItems:totalItems},
        });
  });
}
