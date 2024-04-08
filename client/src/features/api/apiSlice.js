import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => '/post',
      providesTags: ['Post'],
    }),
    getAuthors: builder.query({
      query: () => 'author',
      providesTags: ['Author'],
    }),
    getPost: builder.query({
      query: (postId) => `post/${postId}`,
    }),
    addPost: builder.mutation({
      query: (post) => ({
        url: '/post',
        method: 'POST',
        body: post,
      }),
      invalidatesTags: ['Post'],
    }),
    addAuthor: builder.mutation({
      query: (author) => ({
        url: '/author',
        method: 'POST',
        body: author,
      }),
      invalidatesTags: ['Author'],
    }),
  }),
})

export const {
  useGetPostsQuery,
  useGetAuthorsQuery,
  useGetPostQuery,
  useAddPostMutation,
  useAddAuthorMutation,
} = apiSlice
