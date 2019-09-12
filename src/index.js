// in src/dataProvider
import {
  GET_LIST,
  GET_ONE,
  GET_MANY,
  GET_MANY_REFERENCE,
  CREATE,
  UPDATE,
  DELETE,
  fetchUtils,
} from 'react-admin';
import inflection from 'inflection';
import { stringify } from 'query-string';

const API_EXTENSION = 'json';




export default (API_URL, API_KEY) => {

  /**
   * @param {string} type Request type, e.g GET_LIST
   * @param {string} resource Resource name, e.g. "posts"
   * @param {Object} payload Request parameters. Depends on the request type
   * @returns {Promise} the Promise for response
   */
  return (type, resource, params) => new Promise((resolve, reject) => {
    let url;
    let resourceSingular = inflection.singularize(resource);
    switch (type) {


      case DELETE:

        break;


      case GET_ONE:

        url = `${API_URL}/${resource}/${params.id}.json`;
        break;

      case CREATE:

        break;


      case UPDATE:

        break;

      case GET_LIST:
      case GET_MANY:
      case GET_MANY_REFERENCE:

        url = `${API_URL}/${resource}.json`;

        break;



      default:

        break;
    }

    return fetch(url)
      .then(res => res.json())
      // .then(response => console.log(response));
      .then(response => {


        if (type === GET_ONE) {
          if (resourceSingular in response) {
            resolve({
              data: response[resourceSingular]
            });
          }
        } else {
          if (resource in response) {
            resolve({
              data: response[resource],
              total: response.total_count
            })

          }
        }
      });
  })
}

