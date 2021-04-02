export default function appReducer(state, action) {
  switch (action.type) {
    case "ADD_POKEMON":
      return {
        ...state,
        pokemons: [...state.pokemons, action.payload],
      };

    case "FETCH_SUCCESS":
      const updatedPokemons = action.payload;

      return {
        pokemons: updatedPokemons,
        loading: false,
        error: '',
        bodyObject: action.payload
      }

    case "FETCH_ERROR":
      return {
        pokemons: state.pokemons,
        loading: false,
        error: action.payload,
        bodyObject: {}
      }

    /*
    case "":
      const updatedEmployee = action.payload;

      const updatedEmployees = state.employees.map((employee) => {
        if (employee.id === updatedEmployee.id) {
          return updatedEmployee;
        }
        return employee;
      });

      return {
        ...state,
        employees: updatedEmployees,
      };
    */

    case "REMOVE_POKEMON":
      return {
        ...state,
        pokemons: state.pokemons.filter(
          (pokemon) => pokemon._id !== action.payload._id
        ),
      };


    default:
      return state;
  }
};
