import {create} from 'zustand';
import {getTableList} from "@/service/dataView.js";

export const useDataViewStore = create(() => ({
  dataList: []
}));

export const queryTableList = async (params) => {
  const res = await getTableList(params);
  console.log(res)
  if (res?.status === 200) {
    const {data = []} = res;
    useDataViewStore.setState(state => ({dataList: data}))
  } else {
    useDataViewStore.setState(state => ({dataList: []}))
  }
};