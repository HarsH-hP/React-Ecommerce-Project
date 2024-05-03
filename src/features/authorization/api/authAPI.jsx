export function createUserAPI(userData){
    return new Promise(async (resolve) => {
        const response = await fetch('http://localhost:8000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData),
        });
        const data = await response.json();
        resolve({ data });
    });
}


export function checkUserAPI(loginInfo){
    const email = loginInfo.email;
    const password = loginInfo.password;
    return new Promise(async (resolve, reject) => {
        const response = await fetch('http://localhost:8000/users?email='+email);
        const data = await response.json();
        console.log({data})
        if(data.length){
            if(password === data[0].password){
            resolve({data:data[0]});
            } else{
                console.log("inside reject promise:")
                reject({message:'user not found'});
            }
        }
        else{
            console.log("inside reject promise:")
            reject({message: 'user not found'});    
        }
    });
}

export function checkRegisteredUserAPI(emailID){
    return new Promise(async(resolve, reject) => {
        const response = await fetch('http://localhost:8000/users?email='+emailID);
        const data = await response.json();
        console.log({data})
        if(data.length){
            resolve({data:data[0]});
        }
        else{
            reject({message: 'user not found'});
        }
    })
}

export function signOutAPI(userID){
    return new Promise(async (resolve) => {
        resolve({data:'success'});
    })
}
