import { AxiosError, AxiosRequestConfig, AxiosResponse, AxiosStatic } from 'axios'
import Vue from 'vue'
import './vuex'

interface NuxtAxiosInstance extends AxiosStatic {
  $request<T = any>(config: AxiosRequestConfig): Promise<T>
  $get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>
  $delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>
  $head<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>
  $options<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>
  $post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>
  $put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>
  $patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>

  setBaseURL(baseURL: string): void
  setHeader(name: string, value?: string | false, scopes?: string | string[]): void
  setToken(token: string | false, type?: string, scopes?: string | string[]): void

  onRequest(callback: (config: AxiosRequestConfig) => void): void
  onResponse<T = any>(callback: (response: AxiosResponse<T>) => void): void
  onError(callback: (error: AxiosError) => void): void
  onRequestError(callback: (error: AxiosError) => void): void
  onResponseError(callback: (error: AxiosError) => void): void
}

interface AxiosOptions {
  baseURL?: string,
  browserBaseURL?: string,
  credentials?: boolean,
  debug?: boolean,
  progress?: boolean,
  proxyHeaders?: boolean,
  proxyHeadersIgnore?: string[],
  proxy?: boolean,
  retry?: boolean,
  https?: boolean,
  headers?: {
    common?: Record<string, string>,
    delete?: Record<string, string>,
    get?: Record<string, string>,
    head?: Record<string, string>,
    post?: Record<string, string>,
    put?: Record<string, string>,
    patch?: Record<string, string>,
  },
}

declare module '@nuxt/vue-app' {
  interface Context {
    $axios: NuxtAxiosInstance
  }
  interface NuxtAppOptions {
    $axios: NuxtAxiosInstance
  }
}

// Nuxt 2.9+
declare module '@nuxt/types' {
  interface Context {
    $axios: NuxtAxiosInstance
  }

  interface NuxtAppOptions {
    $axios: NuxtAxiosInstance
  }

  interface Configuration {
    axios?: AxiosOptions
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $axios: NuxtAxiosInstance
  }
}
