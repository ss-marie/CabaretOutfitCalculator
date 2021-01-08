using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OutfitCalculator
{
    public class Calculator
    {
        public static Outfit CalculateBest(Outfit userOutfit, UnlockRank rank, UnlockRank[] unlocks)
        {
            Dictionary<int, Outfit> allOutfits = new Dictionary<int, Outfit>();
            List<MakeoverItem> allItems = MakeoverItem.GetAllItems(rank, unlocks, userOutfit.Hostess.Id);

            // Remove extra items from slots that the user already filled
            allItems.RemoveAll(i => userOutfit.AllMakeoverItems.Any(ui => 
            ui != null &&
            ui.Slot == i.Slot &&
            ui.Id != i.Id
                ));

            // Sort for higher-weighted items first to save time
            allItems = allItems.OrderByDescending(i =>
            i.Stats.Sexy + 
            i.Stats.Beauty + 
            i.Stats.Cute + 
            i.Stats.Funny
            ).ToList();

            int count = 0;
            System.Diagnostics.Stopwatch stopwatch = new System.Diagnostics.Stopwatch();
            stopwatch.Start();
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
                                                                Hostess = hostess,
                                                                Dress  = dress,
                                                                Hairstyle = hairstyle,
                                                                HairAccessory = hairAccessory,
                                                                Eyeglasses = eyeglasses,
                                                                Earrings = earrings,
                                                                Necklace = necklace,
                                                                Nails = nails,
                                                                Ring = ring,
                                                                Watch = watch,
                                                                Bracelet = bracelet,
                                                                Perfume = perfume
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
                                                                System.Diagnostics.Debug.WriteLine($"Found an outfit with score of {score}");
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
            stopwatch.Stop();
            System.Diagnostics.Debug.WriteLine($"Processed {count} combinations in {stopwatch.Elapsed}!");
            var best = allOutfits.Keys.Max();
            return allOutfits.First(o => o.Key == best).Value;
        }
    }
}
