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
        public IEnumerable<MakeoverItem> GetItems()
        {
            return MakeoverItem.GetAllItems()
            .ToArray();
        }
    }
}
