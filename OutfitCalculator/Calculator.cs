using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OutfitCalculator
{
    public class Calculator
    {
        public static Outfit CalculateBest(Outfit userOutfit)
        {
            Dictionary<int, Outfit> allOutfits = new Dictionary<int, Outfit>();
            List<MakeoverItem> allItems = MakeoverItem.GetAllItems();
            allItems.RemoveAll(i => userOutfit.AllMakeoverItems.Any(ui => 
            ui != null &&
            ui.Slot == i.Slot &&
            ui.Id != i.Id
                ));
            int count = 0;
            foreach (MakeoverItem hostess in allItems.Where(i => i.Slot == Slot.HOSTESS))
            {
                foreach (MakeoverItem dress in allItems.Where(i => i.Slot == Slot.DRESS))
                {
                    foreach (MakeoverItem hairstyle in allItems.Where(i => i.Slot == Slot.HAIRSTYLE))
                    {
                        foreach (MakeoverItem hairAccessory in allItems.Where(i => i.Slot == Slot.HAIR_ACCESSORY))
                        {
                            foreach (MakeoverItem eyeglasses in allItems.Where(i => i.Slot == Slot.EYEGLASSES))
                            {
                                foreach (MakeoverItem earrings in allItems.Where(i => i.Slot == Slot.EARRINGS))
                                {
                                    foreach (MakeoverItem necklace in allItems.Where(i => i.Slot == Slot.NECKLACE))
                                    {
                                        foreach (MakeoverItem nails in allItems.Where(i => i.Slot == Slot.NAILS))
                                        {
                                            foreach (MakeoverItem ring in allItems.Where(i => i.Slot == Slot.RING))
                                            {
                                                foreach (MakeoverItem watch in allItems.Where(i => i.Slot == Slot.WATCH))
                                                {
                                                    foreach (MakeoverItem bracelet in allItems.Where(i => i.Slot == Slot.BRACELET))
                                                    {
                                                        foreach (MakeoverItem perfume in allItems.Where(i => i.Slot == Slot.PERFUME))
                                                        {
                                                            Outfit outfit = new Outfit()
                                                            {
                                                                Hostess = userOutfit.Hostess ?? hostess,
                                                                Dress  = userOutfit.Dress ?? dress,
                                                                Hairstyle = userOutfit.Hairstyle ?? hairstyle,
                                                                HairAccessory = userOutfit.HairAccessory ?? hairAccessory,
                                                                Eyeglasses = userOutfit.Eyeglasses ?? eyeglasses,
                                                                Earrings = userOutfit.Earrings ?? earrings,
                                                                Necklace = userOutfit.Necklace ?? necklace,
                                                                Nails = userOutfit.Nails ?? nails,
                                                                Ring = userOutfit.Ring ?? ring,
                                                                Watch = userOutfit.Watch ?? watch,
                                                                Bracelet = userOutfit.Bracelet ?? bracelet,
                                                                Perfume = userOutfit.Perfume ?? perfume
                                                            };
                                                            count++;
                                                            int score = outfit.Stats.Sexy +
                                                                outfit.Stats.Beauty +
                                                                outfit.Stats.Cute +
                                                                outfit.Stats.Funny;
                                                            if (!allOutfits.ContainsKey(score))
                                                            {
                                                                if (score == 12) {
                                                                    return outfit;
                                                                };
                                                                allOutfits.Add(score, outfit);
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            System.Diagnostics.Debug.WriteLine($"Processed {count} combinations!");
            var best = allOutfits.Keys.Max();
            return allOutfits.First(o => o.Key == best).Value;
        }
    }
}
