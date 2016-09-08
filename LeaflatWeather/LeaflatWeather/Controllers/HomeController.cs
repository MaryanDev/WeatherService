using LeaflatWeather.Models;
using LFW.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace LeaflatWeather.Controllers
{
    public class HomeController : Controller
    {
        private IWeatherRepository _weatherRepo;

        public HomeController()
        {
            _weatherRepo = new WeatherRepository();
        }
        // GET: Home
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult SaveWeatherData(WeatherModel weatherData)
        {
            _weatherRepo.Insert(new LFW.Entities.WeatherInfo
            {
                Country = weatherData.Country,
                Longitude = weatherData.Longitude,
                Lattitude = weatherData.Lattitude,
                WindSpeed = weatherData.WindSpeed,
                Humidity = weatherData.Humidity,
                Pressure = weatherData.Pressure,
                Temperature = weatherData.Temperature,
                Description = weatherData.Description
            });

            return null;
        }
    }
}