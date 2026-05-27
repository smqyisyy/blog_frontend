import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAdminStore = defineStore('admin', () => {
    const token = ref(localStorage.getItem('admin_token') || '')

    function setToken(t) {
        token.value = t
        localStorage.setItem('admin_token', t)
    }

    function logout() {
        token.value = ''
        localStorage.removeItem('admin_token')
    }

    function isLoggedIn() {
        return !!token.value
    }

    return { token, setToken, logout, isLoggedIn }
})