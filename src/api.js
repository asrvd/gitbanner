export async function get_user(username) {
    return fetch("https://api.github.com/users/" + username)
    .then(res => res.json())
    .then(data => {
        return data;
    })
}