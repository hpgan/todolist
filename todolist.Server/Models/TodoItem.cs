using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace todolist.Server.Models
{
    public class TodoItem
    {
        [Key]
        public int Id { get; set; }
        [Required(AllowEmptyStrings = false,ErrorMessage ="The Title field is required")]
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }
}
