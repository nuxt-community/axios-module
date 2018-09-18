import { AxiosInstance, AxiosRequestConfig } from 'axios'
import Vue from 'vue'

interface NuxtAxiosInstance extends AxiosInstance {
  $request<T = any>(config: AxiosRequestConfig): Promise<T>
  $get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>
  $delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>
  $head<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>
  $options<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>
  $post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>
  $put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>
  $patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>
}

declare module 'vue/types/vue' {
  interface Vue {
    $axios: NuxtAxiosInstance
  }
}
