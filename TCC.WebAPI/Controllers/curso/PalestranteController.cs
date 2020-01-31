using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TCC.Domain.curso;
using TCC.Repository;

namespace TCC.WebAPI.Controllers.curso
{
    [Route("api/[controller]")]
    [ApiController]
    public class PalestranteController : ControllerBase
    {
        private readonly ITCCRepository _rep;

        public PalestranteController(ITCCRepository rep)
        {
            _rep = rep;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var result = await _rep.GetAllPalestranteAsync(true);
                
                return Ok(result);
            }
            catch (System.Exception)
            {
                
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de dados falhou");
            }
            
        }

        [HttpGet("{PalestranteId}")]
        public async Task<IActionResult> Get(int PalestranteId)
        {
            try
            {
                var result = await _rep.GetPalestrantesAsyncById(PalestranteId, true);
                
                return Ok(result);
            }
            catch (System.Exception)
            {
                
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de dados falhou");
            }
            
        }

        [HttpGet("getByName/{nome}")]
        public async Task<IActionResult> Get(string nome)
        {
            try
            {
                var result = await _rep.GetAllPalestrantesAsyncByName(nome, true);
                
                return Ok(result);
            }
            catch (System.Exception)
            {
                
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de dados falhou");
            }
            
        }

        [HttpPost]
        public async Task<IActionResult> Post(Palestrante model)
        {
            try
            {
                _rep.Add(model);

                if(await _rep.SaveChangesAsync()){
                    return Created($"/api/palestrante/{model.Id}", model);
                }
                
            }
            catch (System.Exception)
            {
                
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de dados falhou");
            }

            return BadRequest();
            
        }

        [HttpPut("{PalestranteId}")]
        public async Task<IActionResult> Put(int PalestranteId, Palestrante model)
        {
            try
            {
                var palestrante = await _rep.GetPalestrantesAsyncById(PalestranteId, false);
                if(palestrante == null) return NotFound();

                _rep.Update(model);

                if(await _rep.SaveChangesAsync()){
                    return Created($"/api/palestrante/{model.Id}", model);
                }
                
            }
            catch (System.Exception)
            {
                
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de dados falhou");
            }

            return BadRequest();
            
        }

        [HttpPut("{PalestranteId}")]
        public async Task<IActionResult> Put(int PalestranteId)
        {
            try
            {
                var palestrante = await _rep.GetPalestrantesAsyncById(PalestranteId, false);
                if(palestrante == null) return NotFound();
                
                _rep.Delete(palestrante);

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

        [HttpDelete("{PalestranteId}")]
        public async Task<IActionResult> Delete(int PalestranteId)
        {
            try
            {
                var palestrante = await _rep.GetPalestrantesAsyncById(PalestranteId, false);
                if(palestrante == null) return NotFound();
                
                _rep.Delete(palestrante);

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