namespace LFW.Entities
{
    using System;
    using System.Data.Entity;
    using System.Linq;

    public class LeafletWeatherModel : DbContext
    {
        // Your context has been configured to use a 'LeafletWeatherModel' connection string from your application's 
        // configuration file (App.config or Web.config). By default, this connection string targets the 
        // 'LFW.Entities.LeafletWeatherModel' database on your LocalDb instance. 
        // 
        // If you wish to target a different database and/or database provider, modify the 'LeafletWeatherModel' 
        // connection string in the application configuration file.
        public LeafletWeatherModel()
            : base("LeafletWeatherDB")
        {
            Database.SetInitializer(new DropCreateDatabaseIfModelChanges<LeafletWeatherModel>());
        }

        // Add a DbSet for each entity type that you want to include in your model. For more information 
        // on configuring and using a Code First model, see http://go.microsoft.com/fwlink/?LinkId=390109.

        public virtual DbSet<WeatherInfo> Weather { get; set; }
        // public virtual DbSet<MyEntity> MyEntities { get; set; }
    }

    //public class MyEntity
    //{
    //    public int Id { get; set; }
    //    public string Name { get; set; }
    //}
}