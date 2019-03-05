import { NuxtAxiosInstance } from '.'

declare module 'vuex' {
  interface Store<S> {
    $axios: NuxtAxiosInstance,
  }
}
