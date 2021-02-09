import { applyMiddleware } from '@reduxjs/toolkit';
import { composeWithDevTools } from 'redux-devtools-extension';

export function applyDevTools(
  middleware: ReturnType<typeof applyMiddleware>
): ReturnType<typeof applyMiddleware> {
  if (process.env.NODE_ENV === 'development') {
    return composeWithDevTools(middleware);
  }

  return middleware;
}
