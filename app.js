async function central(id) {
    // Simulating central database lookup with a delay
    await delay(100);
    const databases = {
        1: 'db1',
        2: 'db2',
        3: 'db3',
        4: 'db2',
        5: 'db3',
        6: 'db1',
        7: 'db1',
        8: 'db3',
        9: 'db2',
        10: 'db1'
    };
    return databases[id] || 'notfound';
}

async function db1(id) {
    // Simulating database 1 fetch with a delay
    await delay(100);
    const data = {
        id: id,
        username: 'user1',
        website: 'www.user1.com',
        company: {
            name: 'Company 1',
            catchPhrase: 'Catchphrase 1',
            bs: 'BS 1'
        }
    };
    return data;
}

async function db2(id) {
    // Simulating database 2 fetch with a delay
    await delay(100);
    const data = {
        id: id,
        username: 'user2',
        website: 'www.user2.com',
        company: {
            name: 'Company 2',
            catchPhrase: 'Catchphrase 2',
            bs: 'BS 2'
        }
    };
    return data;
}

async function db3(id) {
    // Simulating database 3 fetch with a delay
    await delay(100);
    const data = {
        id: id,
        username: 'user3',
        website: 'www.user3.com',
        company: {
            name: 'Company 3',
            catchPhrase: 'Catchphrase 3',
            bs: 'BS 3'
        }
    };
    return data;
}

async function vault(id) {
    // Simulating vault database fetch with a delay
    await delay(100);
    const data = {
        id: id,
        name: 'John Doe',
        email: 'john.doe@example.com',
        address: {
            street: '123 Main St',
            suite: 'Apt 101',
            city: 'Anytown',
            zipcode: '12345',
            geo: {
                lat: '40.7128',
                lng: '-74.0060'
            }
        },
        phone: '555-123-4567',
    };
    return data;
}

// Helper function to simulate delay
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}






async function getUserData(id) {
    try {
        // Fetch the value from the central database to determine which database to access
        const dbName = await central(id);

        if (dbName === 'notfound') {
            throw new Error('User not found');
        }

        // Fetch data from the three databases concurrently using Promise.all
        const [userData, db1Data, db2Data, db3Data, vaultData] = await Promise.all([
            dbs[dbName](id), // Fetch data from determined database
            db1(id),
            db2(id),
            db3(id),
            vault(id)
        ]);

        // Merge all data into a single object
        const fullData = {
            id: id,
            name: vaultData.name,
            username: userData.username,
            email: vaultData.email,
            address: vaultData.address,
            phone: vaultData.phone,
            website: userData.website,
            company: userData.company
        };

        return fullData;
    } catch (error) {
        return Promise.reject(error.message);
    }
}


// Example usage and testing
getUserData(1)
    .then(data => console.log('User Data:', data))
    .catch(error => console.error('Error:', error));

