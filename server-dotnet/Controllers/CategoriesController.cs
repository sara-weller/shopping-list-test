using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShoppingApi.Data;

namespace ShoppingApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CategoriesController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetCategoriesWithProducts()
        {
            var categories = await _context.Categories
                .Include(c => c.Products)
                .ToListAsync();

            return Ok(categories);
        }
    }
}
