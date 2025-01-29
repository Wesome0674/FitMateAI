import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import { API_URL } from '@/config/apiUrls'

export const useApiData = defineStore('getApiData', () => {
    const state = reactive({
        data: []
    })
    const isLoading = ref<boolean>(false)
    const error = ref<string | null>(null)

    const RAPIDAPI_HOST = import.meta.env.VITE_RAPIDAPI_HOST
    const RAPIDAPI_KEY = import.meta.env.VITE_RAPIDAPI_KEY

    const buildUrl = (urlKey: keyof typeof API_URL, params?: Record<string, string>) => {
        let url = API_URL[urlKey]

        if (params) {
            for (const key in params) {
                url = url.replace(`{${key}}`, params[key])
            }
        }

        return url
    }

    const fetchData = async (urlKey: keyof typeof API_URL, params?: Record<string, string>) => {
        const url = buildUrl(urlKey, params)

        isLoading.value = true
        error.value = null

        try {
            const response = await fetch(`https://${RAPIDAPI_HOST}/${url}`, {
                method: 'GET',
                headers: {
                    'x-rapidapi-host': RAPIDAPI_HOST,
                    'x-rapidapi-key': RAPIDAPI_KEY,
                },
            })

            if (!response.ok) {
                throw new Error('Network response was not ok')
            }

            state.data = await response.json()

        } catch (err: any) {
            error.value = err.message
        } finally {
            isLoading.value = false
        }
    }

    const getData = computed(() => state.data)
    const getLoadingStatus = computed(() => isLoading.value)
    const getError = computed(() => error.value)

    return {
        state,
        isLoading,
        error,
        fetchData,
        getData,
        getLoadingStatus,
        getError
    }
})
