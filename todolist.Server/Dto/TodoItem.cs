﻿namespace todolist.Server.Dto
{
    public class TodoItemDto
    {
        public uint Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

    }
}
