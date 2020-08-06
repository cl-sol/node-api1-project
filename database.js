let users = [
    {id: 1, name: "Peter Doe", bio: "Definitely not Kropotkin"},
    {id: 2, name: "Karl Doe", bio: "Not a German philosophist"},
    {id: 3, name: "Lucy Doe", bio: "Allegedly a labor organizer"}
];

function getUsers() {
    return users;
};

function getUserById(id) {
    return users.find((user) => user.id === id);
};

function createUser(data) {
    const payload = {
        id: String(users.length + 1),
        ...data
    };

    users.push(payload);
    return payload;
};

function deleteUser(id) {
    users = users.filter(user => user.id != id);
};

function updateUser(id, data) {
    const index = users.findIndex(user => user.id === id)
    users[index] = {
        ...users[index],
        ...data,
    }

    return users[index];
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    deleteUser,
    updateUser
}