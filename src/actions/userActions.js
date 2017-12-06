import theNeukApi from 'theNeukApi';

export const setUser = (user) => {
  return {
    type: "SET_USER",
    payload: user
  };
};

export const updateUser = (user, token) => {
  return (dispatch) => {
    return theNeukApi.updateUser(user, token).then(response => {
      dispatch(setUser(response))
    })
    .catch(error => {
      throw(error);
    });
  }
}
