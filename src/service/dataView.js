import instance from "@/util/apiCreator.js";

export const getTableList = (params) => {
  return instance.get('/dataAdminApi/dataViewQueryList', {params});
}