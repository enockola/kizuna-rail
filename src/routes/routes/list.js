import { getAllRoutes, getListOfRegions, getListOfSeasons } from '../../models/model.js';

export default async (req, res, next) => {
  try {
    const regions = await getListOfRegions();
    const seasons = await getListOfSeasons();
    const allRoutes = await getAllRoutes();

    // query params (empty string means "no filter")
    const region = req.query.region || '';
    const season = req.query.season || '';

    let routes = allRoutes;

    // Filter by region (only if provided)
    if (region) {
      routes = routes.filter(r => r.region === region);
    }

    // Filter by season (only if provided)
    if (season) {
      // Based on your EJS earlier: route.bestSeason
      routes = routes.filter(r => r.bestSeason === season);
    }

    res.render('routes/list', {
      title: 'Scenic Train Routes',
      regions,
      seasons,
      routes,
      query: { region, season } // so the dropdown can show selected values
    });
  } catch (err) {
    next(err);
  }
};
