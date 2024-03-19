import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
const URL_BACKEND = import.meta.env.VITE_BACKEND_URL

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: `${URL_BACKEND}`,
        prepareHeaders: (headers, {getState})=>{
            const token = getState().auth.token
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers
        }
    }),
    endpoints: (builder)=>({
        login: builder.mutation({
            query: (credentials) => ({
              url: 'auth/login',
              method: 'POST',
              body: credentials,
            }),
          }),
        verifyToken: builder.mutation({
            query: () => ({
              url: 'auth/verify-token',
              method: 'GET'
            }),
          }),
        getConversations: builder.query({
        query: (id) => `conversaciones/${id}`,
        }),
        getAsistentes: builder.query({
        query: (id) => `asistentes/${id}`,
        }),
        getThread: builder.query({
          query: (id) => `asistentes/thread/${id}`,
          }),
        getConversacion: builder.mutation({
          query: (id) => ({
            url: `asistentes/conversacion/${id}`,
            method: 'GET'
          })
        }),
        createConversacion: builder.mutation({
          query: (body) => ({
            url: 'asistentes/crear-conversacion',
            method: 'POST',
            body
          }),
        }),
        continueConversacion: builder.mutation({
          query: ({threadId, currentConversacion}) => ({
            url: `asistentes/continuar-conversacion/${threadId}`,
            method: 'POST',
            body: currentConversacion
          }),
        }),
        logout: builder.mutation({
            query: () => ({
              url: 'auth/logout',
              method: 'GET'
            }),
          })
    })
})

export const {useLoginMutation, useVerifyTokenMutation, useGetConversationsQuery, useLogoutMutation, useGetAsistentesQuery, useGetThreadQuery, useGetConversacionMutation, useCreateConversacionMutation, useContinueConversacionMutation} = apiSlice
export default apiSlice