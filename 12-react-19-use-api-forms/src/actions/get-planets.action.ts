import type { Planet } from "../interfaces/planet.interface";
import { planetsApi } from "../api/planetsApi";

export const getPlanets = async (): Promise<Planet[]> => {
  const res = await planetsApi.get<Planet[]>('/');

  return res.data;
};