import { Context } from "koa";
import DataQueryService from "../service/dataQueryService";

const dataQueryService = new DataQueryService();
const dataQuery = async (query) => {
  const { datasetId, select_d, select_m } = query;
  const result = await dataQueryService.dataQuery(
    datasetId,
    select_d,
    select_m
  );
  return result;
};

export default dataQuery;
