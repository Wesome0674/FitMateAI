import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useApiData = defineStore('getApiData', () => {

    const data = ref<any[]>([])
    const isLoading = ref<boolean>(false)
    const error = ref<string | null>(null)

    const RAPIDAPI_HOST = import.meta.env.VITE_RAPIDAPI_HOST
    const RAPIDAPI_KEY = import.meta.env.VITE_RAPIDAPI_KEY

    const fetchData = async (url: string) => {
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

            const jsonData = await response.json()
            data.value = jsonData
        } catch (err: any) {
            error.value = err.message
        } finally {
            isLoading.value = false
        }
    }

    const getData = computed(() => data.value)
    const getLoadingStatus = computed(() => isLoading.value)
    const getError = computed(() => error.value)

    return {

        data,
        isLoading,
        error,

        fetchData,

        getData,
        getLoadingStatus,
        getError
    }
})
