import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ITask } from "../../components/Todo/Todo";

type TRequestParams = {
  name: string;
  isDone: boolean;
};

export const taskApi = createApi({
  reducerPath: "taskApi",
  tagTypes: ["Tasks"],
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/task/v1`,
  }),

  endpoints: (builder) => ({
    createTask: builder.mutation({
      query: (params: TRequestParams) => {
        return {
          url: "/create",
          method: "POST",
          body: params,
        };
      },
      invalidatesTags: [{ type: "Tasks", id: "LIST" }],
    }),

    changeTask: builder.mutation<
      ITask,
      { id: number; params: Partial<TRequestParams> }
    >({
      query: ({ id, params }) => {
        return {
          url: `/change/${id}`,
          method: "PUT",
          body: params,
        };
      },
      invalidatesTags: [{ type: "Tasks", id: "LIST" }],
    }),

    deleteTask: builder.mutation({
      query: (id: number) => {
        return {
          url: `/delete/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [{ type: "Tasks", id: "LIST" }],
    }),

    getAllTasks: builder.query<ITask[], void>({
      query: () => "/all",
      providesTags: [{ type: "Tasks", id: "LIST" }],
    }),

    getOneTask: builder.query<ITask, { id: string }>({
      query: ({ id }) => ({
        url: `/${id}`,
      }),
    }),
  }),
});

export const {
  useCreateTaskMutation,
  useChangeTaskMutation,
  useDeleteTaskMutation,
  useGetAllTasksQuery,
  useLazyGetOneTaskQuery,
} = taskApi;
