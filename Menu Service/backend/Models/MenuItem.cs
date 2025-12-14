namespace Menu_Service.backend.Models
{
    public class MenuItem
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public bool IsAvailable { get; set; }

    }

}
