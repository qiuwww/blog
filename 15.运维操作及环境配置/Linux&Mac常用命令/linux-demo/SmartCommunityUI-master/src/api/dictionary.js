
import {getRequest, postRequest, putRequest, deleteRequest, importRequest, getRequestWithNoToken,baseurl as base } from '@/libs/axios';

export const getAllDictionary = async data => {
  return getRequest(`/dictDetail/loadByType`, data)
}
