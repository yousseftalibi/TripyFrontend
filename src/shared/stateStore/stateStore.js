import { create } from 'zustand'
export const useLoggedIn = create(set => ({
    loggedIn: false,
    setLoggedIn: (value) => set(state => ({ loggedIn: value }))
}))

export const navbarClicked = create(set => ({
    clickedNavBar: '',
    setClickedNavBar: (value) => set(state => ({ clickedNavBar: value }))
}))
