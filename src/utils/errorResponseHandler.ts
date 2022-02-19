export const errorResponseHandler = (
  status: number,
  dispatch: ({ type, payload }: { type: string; payload: string }) => void,
  type: string,
  errorText403: string,
  otherErrorText: string
) => {
  if (status === 429) {
    return dispatch({
      type,
      payload: 'Превышен лимит на запросы',
    });
  } else if (status === 403) {
    return dispatch({
      type,
      payload: `${errorText403}`,
    });
  } else {
    dispatch({
      type,
      payload: `${otherErrorText}`,
    });
  }
};
