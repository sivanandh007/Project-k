// Movie.cs

using System;
using System.ComponentModel.DataAnnotations;

namespace MovieTicketBookingApp.Models
{
    public class Movie
    {
        [Key]
        public int MovieId { get; set; }

        [Required]
        [StringLength(100)]
        public string Title { get; set; }

        [Required]
        [StringLength(50)]
        public string Language { get; set; }

        public int DurationMinutes { get; set; }

        [DataType(DataType.Date)] // Use DataType.Date to store only the date
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime ReleaseDate { get; set; }

        // Other movie-related properties can be added here
    }
}
