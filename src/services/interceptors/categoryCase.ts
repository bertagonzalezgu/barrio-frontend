import type { AxiosResponse, InternalAxiosRequestConfig } from 'axios'

export function categoryToBackend(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
  if (config.data?.category) {
    config.data = { ...config.data, category: config.data.category.replace(/-/g, '_') }
  }

  if (config.params?.category) {
    config.params = { ...config.params, category: config.params.category.replace(/-/g, '_') }
  }

  return config
}

export function categoryToFrontend(response: AxiosResponse): AxiosResponse {
  response.data = Array.isArray(response.data)
    ? response.data.map(withFrontendCategory)
    : withFrontendCategory(response.data)

  return response
}

function withFrontendCategory(item: unknown): unknown {
  if (!item || typeof item !== 'object') return item

  const record = item as Record<string, unknown>
  if (typeof record.category !== 'string') return item

  return { ...record, category: record.category.replace(/_/g, '-') }
}