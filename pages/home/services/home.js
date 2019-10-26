import request from "../../../utils/request";

export function getData(params) {
  return request(`/api/ftts/client/queryClientByKey`, {
    method: 'GET',
    data: params,
  })
}
