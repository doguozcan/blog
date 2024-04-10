import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => '/post',
      providesTags: (result = [], error, arg) => [
        { type: 'Post', id: 'LIST' },
        ...result.map((post) => ({ type: 'Post', id: post._id })),
      ],
    }),
    getPost: builder.query({
      query: (postId) => `post/${postId}`,
      providesTags: (result, error, arg) => [{ type: 'Post', id: arg }],
    }),
    getAuthors: builder.query({
      query: () => '/author',
      providesTags: (result = [], error, arg) => [
        { type: 'Author', id: 'LIST' },
        ...result.map((author) => ({ type: 'Author', id: author._id })),
      ],
    }),
    getAuthor: builder.query({
      query: (authorId) => `author/${authorId}`,
      providesTags: (result, error, arg) => {
        const tags = []

        if (result) {
          tags.push({ type: 'Author', id: result.author._id })

          if (result.posts.length !== 0) {
            tags.push(
              ...result.posts.map((post) => ({ type: 'Post', id: post._id }))
            )
          }
        }

        return tags
      },
    }),
    addPost: builder.mutation({
      query: (post) => ({
        url: '/post',
        method: 'POST',
        body: post,
      }),
      invalidatesTags: [{ type: 'Post', id: 'LIST' }],
    }),
    editPost: builder.mutation({
      query: (post) => ({
        url: `/post/${post._id}`,
        method: 'PATCH',
        body: post,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Post', id: result.updatedPost._id },
      ],
    }),
    deletePost: builder.mutation({
      query: (postId) => ({
        url: `/post/${postId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Post', id: result.postId },
      ],
    }),
    addAuthor: builder.mutation({
      query: (author) => ({
        url: '/author',
        method: 'POST',
        body: author,
      }),
      invalidatesTags: [{ type: 'Author', id: 'LIST' }],
    }),
    editAuthor: builder.mutation({
      query: (author) => ({
        url: `/author/${author._id}`,
        method: 'PATCH',
        body: author,
      }),
      invalidatesTags: (result, error, arg) => [
        ...result.authorsPostsIds.map((postId) => ({
          type: 'Post',
          id: postId,
        })),
        { type: 'Author', id: result.authorId },
      ],
    }),
    deleteAuthor: builder.mutation({
      query: (authorId) => ({
        url: `/author/${authorId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, arg) => {
        console.log(result)
        return [
          ...result.authorsPostsIds.map((postId) => ({
            type: 'Post',
            id: postId,
          })),
          { type: 'Author', id: result.authorId },
        ]
      },
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
