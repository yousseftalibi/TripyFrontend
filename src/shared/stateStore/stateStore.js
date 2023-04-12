import { create } from 'zustand'
/*export const useLoggedIn = create(set => ({
    loggedIn: false,
    setLoggedIn: (value) => set(state => ({ loggedIn: value }))
}))*/

export const useLoggedIn = create(set => ({
    loggedIn: true,
    setLoggedIn: (value) => set(state => ({ loggedIn: true }))
}))


export const navbarClicked = create(set => ({
    clickedNavBar: '',
    setClickedNavBar: (value) => set(state => ({ clickedNavBar: value }))
}))

export const nextClicked = create( set => ( {
    nextClicked : '',
    setNextClicked : (value) => set(state => ({nextClicked: value}))
}))