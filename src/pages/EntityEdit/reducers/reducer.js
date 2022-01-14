const initialState = {
  student: {},
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case "PUT_STUDENT":
        return {...state, student: payload}
      default: return state;
  }
}
