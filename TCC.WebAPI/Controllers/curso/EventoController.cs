using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TCC.Domain.curso;
using TCC.Repository;

namespace TCC.WebAPI.Controllers.curso
{
    [Route("api/[controller]")]
    public class EventoController : ControllerBase
    {
        private readonly ITCCRepository _rep;
        public EventoController(ITCCRepository rep)
        {
            _rep = rep;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var result = await _rep.GetAllEventoAsync(true);
                
                return Ok(result);
            }
            catch (System.Exception)
            {
                
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de dados falhou");
            }
            
        }

        [HttpGet("{EventoId}")]
        public async Task<IActionResult> Get(int EventoId)
        {
            try
            {
                var result = await _rep.GetEventoAsyncById(EventoId, true);
                
                return Ok(result);
            }
            catch (System.Exception)
            {
                
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de dados falhou");
            }
            
        }

        [HttpGet("getByTema/{tema}")]
        public async Task<IActionResult> Get(string tema)
        {
            try
            {
                var result = await _rep.GetAllEventoAsyncByTema(tema, true);
                
                return Ok(result);
            }
            catch (System.Exception)
            {
                
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de dados falhou");
            }
            
        }

        [HttpPost]
        public async Task<IActionResult> Post(Evento model)
        {
            try
            {
                _rep.Add(model);

                if(await _rep.SaveChangesAsync()){
                    return Created($"/api/evento/{model.Id}", model);
                }
                
            }
            catch (System.Exception)
            {
                
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de dados falhou");
            }

            return BadRequest();
            
        }

        [HttpPut]
        public async Task<IActionResult> Put(int EventoId, Evento model)
        {
            try
            {
                var evento = await _rep.GetEventoAsyncById(EventoId, false);
                if(evento == null) return NotFound();

                _rep.Update(model);

                if(await _rep.SaveChangesAsync()){
                    return Created($"/api/evento/{model.Id}", model);
                }
                
            }
            catch (System.Exception)
            {
                
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de dados falhou");
            }

            return BadRequest();
            
        }

        [HttpPut]
        public async Task<IActionResult> Put(int EventoId)
        {
            try
            {
                var evento = await _rep.GetEventoAsyncById(EventoId, false);
                if(evento == null) return NotFound();
                
                _rep.Delete(evento);

                if(await _rep.SaveChangesAsync()){
                    return Ok();
                }
                
            }
            catch (System.Exception)
            {
                
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de dados falhou");
            }

            return BadRequest();
            
        }
    }
}