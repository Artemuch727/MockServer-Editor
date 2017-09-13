const SERVER_API = 'http://localhost:3000/';

export const startFetchingData = () => ({
  type: 'START_DATA_FETCHING'
})

export const stopFetchingData = () => ({
  type: 'STOP_DATA_FETCHING'
})

export const reciveResourceData = (data) => ({
  type: 'RECIEVE_DATA',
  data
})

export const selectItemForEdit = (item) => ({
  type: 'SELECT_ITEM',
  item
})


export function fetchResources(){
    return (dispatch) => {
      const options = {method: 'GET', credentials: 'include', mode: 'cors'};
      const departmentsRequest = fetch(SERVER_API + 'departments', options);
      const employeesRequest = fetch(SERVER_API + 'employees', options);

      dispatch(startFetchingData);

      Promise.all([departmentsRequest, employeesRequest])
      .then(responses =>
          Promise.all(responses.map(res => res.json())
      ))
      .then(jsons => {
          console.log(jsons);
          dispatch(reciveResourceData({'departments': jsons[0], 'employees': jsons[1]}))
          dispatch(stopFetchingData);

      })
      .catch((err) => console.log(err))
    }
}

export function deleteSelectedItem(type, id){
  return(dispatch) => {
    dispatch(startFetchingData);
    const options = {method: 'DELETE', credentials: 'include', mode: 'cors'};

    return fetch(`${SERVER_API}${type}/${id}`, options)
      .then((response) => {
        if (response.status == 200){
          dispatch(fetchResources())
        }
      })
      .catch((err)=> {console.log(err)})

    dispatch(stopFetchingData);

  }
}

export function addNewItem(type, item){
  return(dispatch) => {
    dispatch(startFetchingData);
    const options = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST', credentials: 'include', mode: 'cors', body: JSON.stringify(item)};

    return fetch(`${SERVER_API}${type}`, options)
      .then((response) => {
        if (response.status == 201){
          dispatch(fetchResources());
          dispatch(stopFetchingData);
        }
      })
      .catch((err)=> {console.log(err)})
  }
}

export function saveChanges(type, item){
  return(dispatch) => {
    dispatch(startFetchingData);
    const options = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'PUT', credentials: 'include', mode: 'cors',
      body: JSON.stringify(item)
    };

  return fetch(`${SERVER_API}${type}/${item.id}`, options)
    .then((response) => {
      if (response.status == 200){
        dispatch(fetchResources());
        dispatch(stopFetchingData);
      }
    })
    .catch((err)=> {console.log(err)})
  }
}
