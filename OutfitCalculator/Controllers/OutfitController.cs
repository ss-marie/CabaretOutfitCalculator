using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace OutfitCalculator.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class OutfitController : ControllerBase
    {

        private readonly ILogger<OutfitController> _logger;

        public OutfitController(ILogger<OutfitController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public Outfit GetBestOutfit(
            [FromQuery(Name = "itemId")]
            int[] itemIds,
            [FromQuery(Name = "getBest")]
            bool getBest = false
            )
        {
            List<MakeoverItem> allItems = MakeoverItem.GetAllItems();
            List<MakeoverItem> selectedItems = allItems.Where(item => itemIds.Contains(item.Id)).ToList();
            Outfit outfit = new Outfit();
            foreach (MakeoverItem item in selectedItems)
            {
                switch (item.Slot)
                {
                    case Slot.HOSTESS: outfit.Hostess = item; break;
                    case Slot.DRESS: outfit.Dress = item; break;
                    case Slot.HAIRSTYLE: outfit.Hairstyle = item; break;
                    case Slot.HAIR_ACCESSORY: outfit.HairAccessory = item; break;
                    case Slot.EYEGLASSES: outfit.Eyeglasses = item; break;
                    case Slot.EARRINGS: outfit.Earrings = item; break;
                    case Slot.NECKLACE: outfit.Necklace = item; break;
                    case Slot.NAILS: outfit.Nails = item; break;
                    case Slot.RING: outfit.Ring = item; break;
                    case Slot.WATCH: outfit.Watch = item; break;
                    case Slot.BRACELET: outfit.Bracelet = item; break;
                    case Slot.PERFUME: outfit.Perfume = item; break;
                }
            }
            if (getBest)
            {
                return Calculator.CalculateBest(outfit);
            }
            else
            {
                return outfit;
            }
        }
    }
}
