import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCredentials, logOut } from '../../features/Auth/authSlice';

const baseQuery = fetchBaseQuery(
    {
        baseUrl: 'http://localhost:500',
        credentials: 'include',
        prepareHeaders: (Headers, { getState }) => {
            const token = getState().auth.token;
            if (token) {
                Headers.set('authorization', `Bearer ${token}`);
            }
            return token;
        }
    }
)