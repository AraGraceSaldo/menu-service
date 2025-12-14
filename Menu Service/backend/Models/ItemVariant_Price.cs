using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Menu_Service.backend.Models
{
    public class ItemVariant_Price
    {
        [Key]
        public int Item_Variant_Id { get; set; }

        [Required]
        public int Menu_Item_Id { get; set; }

        [Required]
        public int Variant_Type_Id { get; set; }

        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal Price { get; set; }

        // Navigation properties
        [ForeignKey("Menu_Item_Id")]
        public MenuItem MenuItem { get; set; } = null!;

        [ForeignKey("Variant_Type_Id")]
        public VariantType VariantType { get; set; } = null!;
    }
}
