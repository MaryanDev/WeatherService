using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LFW.Entities;

namespace LFW.Repositories
{
    public interface IWeatherRepository
    {
        IEnumerable<WeatherInfo> Get(Func<WeatherInfo, bool> criteria = null);
        WeatherInfo GetSingle(Func<WeatherInfo, bool> criteria = null);
        WeatherInfo Insert(WeatherInfo entity);
        void Delete(Func<WeatherInfo, bool> criteria);
        bool Exists(Func<WeatherInfo, bool> criteria = null);
        WeatherInfo Update(WeatherInfo entity);
    }
}
