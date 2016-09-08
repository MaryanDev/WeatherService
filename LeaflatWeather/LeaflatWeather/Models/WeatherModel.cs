using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LeaflatWeather.Models
{
    public class WeatherModel
    {
        public string Country { get; set; }
        public double Lattitude { get; set; }
        public double Longitude { get; set; }
        public string Description { get; set; }
        public int Humidity { get; set; }
        public int Pressure { get; set; }
        public double Temperature { get; set; }
        public int WindSpeed { get; set; }
    }
}