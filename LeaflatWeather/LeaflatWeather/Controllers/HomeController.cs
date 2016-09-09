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
        private const int PageSize = 4;

        public HomeController()
        {
            _weatherRepo = new WeatherRepository();
        }
        // GET: Home
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Locations()
        {
            return View();
        }

        [HttpPost]
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
                Description = weatherData.Description,
                Time = DateTime.Now.Date.ToString()
            });

            return null;
        }
        [HttpGet]
        public JsonResult GetLocations(int currentPage = 1)
        {
            var locations = _weatherRepo.Get();

            int pages = locations.Count() / PageSize;
            int count = locations.Count() % PageSize == 0 ? pages : ++pages;
            locations = locations.Skip((currentPage - 1) * PageSize).Take(PageSize).ToList();

            return Json(new { locations = locations, allPages = count }, JsonRequestBehavior.AllowGet);
        }
    }
}