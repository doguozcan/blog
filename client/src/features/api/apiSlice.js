import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => '/post',
      providesTags: ['Post', 'Author'],
    }),
    getPost: builder.query({
      query: (postId) => `post/${postId}`,
      providesTags: ['Post', 'Author'],
    }),
    addPost: builder.mutation({
      query: (post) => ({
        url: '/post',
        method: 'POST',
        body: post,
      }),
      invalidatesTags: ['Post', 'Author'],
    }),
    editPost: builder.mutation({
      query: (post) => ({
        url: `/post/${post._id}`,
        method: 'PATCH',
        body: post,
      }),
      invalidatesTags: ['Post', 'Author'],
    }),
    deletePost: builder.mutation({
      query: (postId) => ({
        url: `/post/${postId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Post', 'Author'],
    }),
    getAuthors: builder.query({
      query: () => '/author',
      providesTags: ['Post', 'Author'],
    }),
    getAuthor: builder.query({
      query: (authorId) => `author/${authorId}`,
      providesTags: ['Post', 'Author'],
    }),
    addAuthor: builder.mutation({
      query: (author) => ({
        url: '/author',
        method: 'POST',
        body: author,
      }),
      invalidatesTags: ['Post', 'Author'],
    }),
    editAuthor: builder.mutation({
      query: (author) => ({
        url: `/author/${author._id}`,
        method: 'PATCH',
        body: author,
      }),
      invalidatesTags: ['Post', 'Author'],
    }),
    deleteAuthor: builder.mutation({
      query: (authorId) => ({
        url: `/author/${authorId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Post', 'Author'],
    }),
  }),
})

export const {
  useGetPostsQuery,
  useGetPostQuery,
  useAddPostMutation,
  useEditPostMutation,
  useDeletePostMutation,
  useGetAuthorsQuery,
  useGetAuthorQuery,
  useAddAuthorMutation,
  useEditAuthorMutation,
  useDeleteAuthorMutation,
} = apiSlice
