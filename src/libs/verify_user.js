import localforage from 'localforage'

export async function verifyUser() {
    const user = await localforage.getItem('user')
    if (!user) {
        window.location.href = '/'
    } else {
        return user
    }

}