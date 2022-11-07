using API.Error;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BuggyController: BaseApiController
    {
        private readonly StoreContext _context;

        public BuggyController(StoreContext context)
        {
            _context = context;
        }

        [HttpGet("notfound")]
        public ActionResult GetNotFoundRequest(){
            //id 42 is not existed.
            var thing= _context.Products.Find(42);
            if(thing==null){
                return NotFound(new ApiResponse(404));
            }
            return Ok();
        }
         [HttpGet("serverError")]
        public ActionResult GetServerError(){
            var thing= _context.Products.Find(42);
            //thing is null. cannot make a string
            var thinToReturn = thing.ToString();
            return Ok();
        }
         [HttpGet("badRequest")]
        public ActionResult GetBadRequest(){
            return BadRequest(new ApiResponse(400));
        }
         [HttpGet("badRequest/{id}")]
        public ActionResult GetNotRoundRequest(int id){
            return Ok();
        }
        
        
    }
}