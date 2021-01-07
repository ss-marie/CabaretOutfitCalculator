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
        public static List<MakeoverItem> GetAllItems()
        {
            using (var reader = new StreamReader("items.csv"))
            using (var csv = new CsvReader(reader, CultureInfo.InvariantCulture))
            {
                return csv.GetRecords<MakeoverItem>().ToList();
            }
        }
    }
}
