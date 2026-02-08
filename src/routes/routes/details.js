import { getRouteById, getSchedulesByRoute } from '../../models/model.js';
import { monthsToAbbrev } from '../../includes/helpers.js';

export default async (req, res, next) => {
  try {
    const { routeId } = req.params;
    const details = await getRouteById(routeId);

    if (!details) {
      const err = new Error(`Route '${routeId}' not found`);
      err.status = 404;
      return next(err);
    }

    details.schedules = await getSchedulesByRoute(routeId);

    const operatingMonthLabels = monthsToAbbrev(details.operatingMonths);
    res.render('routes/details', {
    title: 'Route Details',
    details,
    operatingMonthLabels
    });
  } catch (err) {
    next(err);
  }
};
