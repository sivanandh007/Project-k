using System.ComponentModel.DataAnnotations;

namespace AngularAPI.Models
{
    public class City
    {
        [Key]
        public int CityID { get; set; }

        [Required]
        public string CityName { get; set; }

        public ICollection<Movie> Movies { get; set; }
    }
}
