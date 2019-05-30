import { NuxtAxiosInstance } from '.'

declare module 'vuex/types/index' {
  interface Store<S> {
    $axios: NuxtAxiosInstance,
  }
}
