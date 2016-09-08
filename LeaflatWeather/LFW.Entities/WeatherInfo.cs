using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LFW.Entities
{ 
    public class WeatherInfo
    {
        [Key]
        public int Id { get; set; }

        public string Country { get; set; }

        public double Lattitude { get; set; }

        public double Longitude { get; set; }

        public string Description { get; set; }

        public int Humidity { get; set; }

        public int Pressure { get; set; }

        public double Temperature { get; set; }

        public double WindSpeed { get; set; }

    }
}
