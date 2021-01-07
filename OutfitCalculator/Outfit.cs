using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OutfitCalculator
{
    public class Outfit
    {
        public MakeoverItem Hostess { get; set; }
        public MakeoverItem Dress { get; set; }
        public MakeoverItem Hairstyle { get; set; }
        public MakeoverItem HairAccessory { get; set; }
        public MakeoverItem Eyeglasses { get; set; }
        public MakeoverItem Earrings { get; set; }
        public MakeoverItem Necklace { get; set; }
        public MakeoverItem Nails { get; set; }
        public MakeoverItem Ring { get; set; }
        public MakeoverItem Watch { get; set; }
        public MakeoverItem Bracelet { get; set; }
        public MakeoverItem Perfume { get; set; }
        public List<MakeoverItem> AllMakeoverItems { get {
                return new List<MakeoverItem>()
            {
                Hostess,
                Dress,
                Hairstyle,
                HairAccessory,
                Eyeglasses,
                Earrings,
                Necklace,
                Nails,
                Ring,
                Watch,
                Bracelet,
                Perfume
            };
            } }
        public Stats Stats
        {
            get
            {
                int sexy = AllMakeoverItems.Sum(i => i != null ? i.Stats.Sexy : 0);
                int beauty = AllMakeoverItems.Sum(i => i != null ? i.Stats.Beauty : 0);
                int cute = AllMakeoverItems.Sum(i => i != null ? i.Stats.Cute : 0);
                int funny = AllMakeoverItems.Sum(i => i != null ? i.Stats.Funny : 0);

                return new Stats()
                {
                    Sexy = Validate(sexy),
                    Beauty = Validate(beauty),
                    Cute = Validate(cute),
                    Funny = Validate(funny)
                };
            }
        }
        private int Validate(int value) =>
            value < 0 ? 0 :
            value > 3 ? 3 :
            value;
    }
}
