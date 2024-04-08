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
      providesTags: ['Post'],
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
    editPost: builder.mutation({
      query: (post) => ({
        url: `post/${post._id}`,
        method: 'PATCH',
        body: post,
      }),
      invalidatesTags: ['Post'],
    }),
    deletePost: builder.mutation({
      query: (postId) => ({
        url: `post/${postId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Post'],
    }),
    deleteAuthor: builder.mutation({
      query: (authorId) => ({
        url: `author/${authorId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Post', 'Author'],
    }),
  }),
})

export const {
  useGetPostsQuery,
  useGetAuthorsQuery,
  useGetPostQuery,
  useAddPostMutation,
  useAddAuthorMutation,
  useEditPostMutation,
  useDeletePostMutation,
  useDeleteAuthorMutation,
} = apiSlice
