const initialState = {
  students: [],
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
      case "PUT_STUDENTS":
          return {...state, students: payload}
      default: return state;
  }
}
