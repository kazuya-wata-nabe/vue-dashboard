import { inject, provide } from "vue"

export const isAuthenticated = () => !!localStorage.getItem("auth")

// export const provideAuth = () => {
//   const context = createContext();
//   provide(key, context);

//   return context;
// }

// const key = Symbol();
// export const useAuth = () => {
//   return inject(key);
// }
