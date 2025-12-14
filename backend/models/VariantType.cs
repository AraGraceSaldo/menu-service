using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public static class VariantNames
    {
        public const string M = "M";
        public const string L = "L";
        public const string SOLO = "SOLO";
        public const string PCS3 = "3PCS";
        public const string PCS6 = "6PCS";
        public const string REGULAR = "REGULAR";

        public static readonly IReadOnlyList<string> All = new[] { M, L, SOLO, PCS3, PCS6, REGULAR };

        public static bool IsValid(string value) => !string.IsNullOrEmpty(value) && All.Contains(value);
    }

    public class VariantType
    {
        [Key]
        public int Variant_Type_Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string Name { get; set; } = VariantNames.M;

        public ICollection<ItemVariant_Price> ItemVariantPrices { get; set; }
    }
}

