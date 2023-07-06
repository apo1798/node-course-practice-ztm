import { getAllPlanets } from '../../models/planets.model';

export async function httpGetAllPlanets(req, res) {
  return res.status(200).json(await getAllPlanets());
}
