using CsvHelper;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;

namespace OutfitCalculator
{
    public class MakeoverItem
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public Slot Slot { get; set; }
        public UnlockRank UnlockRank { get; set; }
        public Stats Stats { get; set; }
        public static List<MakeoverItem> GetAllItems(UnlockRank rank, UnlockRank[] unlocks, int hostessId)
        {
            List<MakeoverItem> allItems = new List<MakeoverItem>();
            using (var reader = new StreamReader("items.csv"))
            using (var csv = new CsvReader(reader, CultureInfo.InvariantCulture))
            {
                allItems = csv.GetRecords<MakeoverItem>().ToList();
            }

            // Remove items that the user has not unlocked via rank
            allItems.RemoveAll(i => i.UnlockRank > rank && i.UnlockRank < UnlockRank.YUKI);

            // Remove items that the user has not unlocked via takeovers
            allItems.RemoveAll(i => i.UnlockRank >= UnlockRank.YUKI && !unlocks.Contains(i.UnlockRank));

            // Remove incompatible dresses (Yuki can't wear Yuki's Dress etc)
            string hostessName = allItems.Where(i => i.Id == hostessId).FirstOrDefault()?.Name;
            allItems.RemoveAll(i => hostessName?.ToUpper() == i.UnlockRank.ToString());

            return allItems;
        }
    }
}
