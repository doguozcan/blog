import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => '/post',
      providesTags: (result = [], error, arg) => [
        { type: 'Post', id: 'LIST' },
        ...result.map(({ _id }) => ({ type: 'Post', id: _id })),
      ],
    }),
    getAuthors: builder.query({
      query: () => 'author',
      providesTags: (result = [], error, arg) => [
        { type: 'Author', id: 'LIST' },
        ...result.map(({ _id }) => ({ type: 'Author', id: _id })),
      ],
    }),
    getPost: builder.query({
      query: (postId) => `post/${postId}`,
      providesTags: (result, error, arg) => [{ type: 'Post', id: result._id }],
    }),
    addPost: builder.mutation({
      query: (post) => ({
        url: '/post',
        method: 'POST',
        body: post,
      }),
      invalidatesTags: { type: 'Post', id: 'LIST' },
    }),
    addAuthor: builder.mutation({
      query: (author) => ({
        url: '/author',
        method: 'POST',
        body: author,
      }),
      invalidatesTags: { type: 'Author', id: 'LIST' },
    }),
    editPost: builder.mutation({
      query: (post) => ({
        url: `post/${post._id}`,
        method: 'PATCH',
        body: post,
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Post', id: arg._id }],
    }),
    deletePost: builder.mutation({
      query: (postId) => ({
        url: `post/${postId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Post', id: arg }],
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
