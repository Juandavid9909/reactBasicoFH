import { Planet } from "../interfaces/planet.interface";
import { planetsApi } from "../api/planetsApi";

export const updatePlanetAction = async(planet: Planet) => {
    try {
        const response = await planetsApi.patch<Planet>(`/${ planet.id }`, planet);

        console.log("Planeta actualizado");

        return response.data;
    } catch (error) {
        console.log("Error actualizando", error);

        throw new Error("Error actualizando el planeta!!");
    }
};