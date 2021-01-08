using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OutfitCalculator.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ItemsController : ControllerBase
    {
        [HttpGet]
        public IEnumerable<MakeoverItem> GetItems(
            [FromQuery]
            UnlockRank rank = UnlockRank.E,
            [FromQuery(Name = "unlock")]
            UnlockRank[] unlocks = default,
            [FromQuery]
            int hostessId = 0
            )
        {
            return MakeoverItem.GetAllItems(rank, unlocks, hostessId)
            .ToArray();
        }
    }
}
