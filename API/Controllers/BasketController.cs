using API.Dtos;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BasketController : BaseApiController
    {
        private readonly IBasketRepository _basketRepo;
        private readonly IMapper _mapper;

        public BasketController(IBasketRepository basketRepo, IMapper mapper)
        {
            _mapper = mapper;
            _basketRepo = basketRepo;
        }
        [HttpGet]
        public async Task<ActionResult<CustomerBasket>> GetBasketById(string id)
        {
            var data = await _basketRepo.GetBasketAsync(id);
            return Ok(data ?? new CustomerBasket(id));
        }

        [HttpPost]
        public async Task<ActionResult<CustomerBasket>> UpdateBasket(CustomerBasketDto basket)
        {
            var customerBasket = _mapper.Map<CustomerBasketDto, CustomerBasket>(basket);
            var data = await _basketRepo.UpdateBasketAsync(customerBasket);
            return Ok(data);
        }
        [HttpDelete]
        public async Task DeleteBasket(string id)
        {
            await _basketRepo.DeleteBasketAsync(id);

        }
    }
}