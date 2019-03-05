import { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import Vue from 'vue'
import './vuex'

interface NuxtAxiosInstance extends AxiosInstance {
  $request<T = any>(config: AxiosRequestConfig): Promise<T>
  $get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>
  $delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>
  $head<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>
  $options<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>
  $post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>
  $put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>
  $patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>

  setHeader(name: string, value?: string | false, scopes?: string | string[]): void
  setToken(token: string | false, type?: string, scopes?: string | string[]): void

  onRequest(callback: (config: AxiosRequestConfig) => void): void
  onResponse<T = any>(callback: (response: AxiosResponse<T>) => void): void
  onError(callback: (error: AxiosError) => void): void
  onRequestError(callback: (error: AxiosError) => void): void
  onResponseError(callback: (error: AxiosError) => void): void
}

declare module '@nuxt/vue-app' {
  interface Context {
    $axios: NuxtAxiosInstance
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $axios: NuxtAxiosInstance
  }
}
