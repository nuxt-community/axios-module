import { AxiosInstance, AxiosRequestConfig, AxiosPromise } from 'axios'
import Vue from 'vue'

interface NuxtAxiosInstance extends AxiosInstance {
  $request<T = any>(config: AxiosRequestConfig): AxiosPromise<T>
  $get<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  $delete<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  $head<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  $options<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  $post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
  $put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
  $patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
}

declare module 'vue/types/vue' {
  interface Vue {
    $axios: NuxtAxiosInstance
  }
}
