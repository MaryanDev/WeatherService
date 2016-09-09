using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LFW.Entities;

namespace LFW.Repositories
{
    public class WeatherRepository : IWeatherRepository
    {
        public void Delete(Func<WeatherInfo, bool> criteria)
        {
            using(var context = new LeafletWeatherModel())
            {
                context.Set<WeatherInfo>().Remove(context.Set<WeatherInfo>().SingleOrDefault(criteria));
                context.SaveChanges();
            }
        }

        public bool Exists(Func<WeatherInfo, bool> criteria = null)
        {
            using(var context = new LeafletWeatherModel())
            {
                var result = context.Weather.Where(criteria).SingleOrDefault();
                return result == null ? false : true;
            }
        }

        public IEnumerable<WeatherInfo> Get(Func<WeatherInfo, bool> criteria = null)
        { 
            using(var context = new LeafletWeatherModel())
            {
                var result = criteria != null ? context.Weather.Where(criteria).ToList() : context.Weather.ToList();
                return result;
            }
        }

        public WeatherInfo GetSingle(Func<WeatherInfo, bool> criteria = null)
        {
            using(var context = new LeafletWeatherModel())
            {
                var result = criteria != null ? context.Weather.Where(criteria).FirstOrDefault() : context.Weather.FirstOrDefault();
                return result;
            }
        }

        public WeatherInfo Insert(WeatherInfo entity)
        {
            using(var context = new LeafletWeatherModel())
            {
                var result = context.Weather.Add(entity);
                context.SaveChanges();
                return result;
            }
        }

        public WeatherInfo Update(WeatherInfo entity)
        {
            using(var context = new LeafletWeatherModel())
            {
                var result = context.Set<WeatherInfo>().Attach(entity);
                context.Entry(entity).State = System.Data.Entity.EntityState.Modified;

                context.SaveChanges();
                return result;
            }
        }
    }
}
