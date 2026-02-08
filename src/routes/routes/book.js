import { createConfirmation, getScheduleById, getTicketOptionsForRoute } from '../../models/model.js';
import { yenToUsd } from '../../includes/helpers.js';


const bookingPage = async (req, res, next) => {
  try {
    const { scheduleId } = req.params;

    const schedule = await getScheduleById(scheduleId);
    if (!schedule) {
      const err = new Error(`Schedule '${scheduleId}' not found`);
      err.status = 404;
      return next(err);
    }

    const ticketOptions = await getTicketOptionsForRoute(schedule.routeId, scheduleId);

    // Convert each ticket option price (stored in Yen) to USD for display
    const ticketOptionsUsd = (ticketOptions || []).map(t => {
      const usd = yenToUsd(Number(t.price));
      return {
        ...t,
        priceUsd: usd,
        priceUsdFormatted: `$${usd.toFixed(2)}`
      };
    });

    const scheduleUsd = yenToUsd(Number(schedule.price));
    const priceUsdFormatted = `$${scheduleUsd.toFixed(2)}`;

    res.render('routes/book', {
      title: 'Book Trip',
      schedule,
      ticketOptions: ticketOptionsUsd,
      priceUsdFormatted
    });
  } catch (err) {
    next(err);
  }
};


const processBookingRequest = async (req, res) => {
    const data = req.body;

    const confirmationNum = await createConfirmation(data);

    res.redirect(`/routes/confirmation/${confirmationNum}`);
};

export { bookingPage, processBookingRequest };