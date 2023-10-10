// Theater.cs

using System.ComponentModel.DataAnnotations;

namespace MovieTicketBookingApp.Models
{
    public class Theater
    {
        [Key]
        public int TheaterId { get; set; }

        [Required]
        [StringLength(100)]
        public string TheaterName { get; set; }

        [Required]
        [StringLength(100)]
        public string Location { get; set; }

        public int NumberOfScreens { get; set; }

        // Other theater-related properties can be added here
    }
}
