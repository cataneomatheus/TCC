using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using TCC.Aplication.resultados;
using TCC.Aplication.resultados.dto;
using TCC.Aplication.resultados.Dto;
using TCC.Aplication.resultados.View;

namespace TCC.WebAPI.Controllers.resultados
{
    [Route("api/[controller]")]
    [ApiController]
    public class ResultadoController : ControllerBase
    {
        private readonly IAplicResultado _aplicResultado;
        private IMapper _mapper { get; }

        public ResultadoController(IAplicResultado aplicResultado, 
                                   IMapper mapper)
        {
            _aplicResultado = aplicResultado;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));                
                var ret = await _aplicResultado.GetResultados(userId);                

                return Ok(ret);
            }
            catch (System.Exception)
            {

                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de dados falhou");
            }

        }

        [HttpGet("{ResultadoId}")]
        public async Task<IActionResult> Get(int resultadoId)
        {
            try
            {
                var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
                var ret = _aplicResultado.GetResultado(resultadoId, userId);
                

                return Ok(ret.Result);
            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de dados falhou");
            }

        }

        [HttpPost]
        public async Task<IActionResult> Post(IniciaResultadoDto dto)
        {
            try
            {
                var ret = _aplicResultado.IniciaResultado(dto);
                var retorno = _mapper.Map<ResultadoView>(ret.Result);
                return Ok(retorno);

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex);
            }            
        }

        [HttpPut("SetaPerguntaFeita")]
        public async Task<IActionResult> SetaPerguntaFeita(SetaPerguntaFeitaDto dto)
        {
            try
            {
                var ret = _aplicResultado.SetaPerguntaFeita(dto);
                return Ok(ret.Result);

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Banco de dados falhou: " + ex.Message);
            }
        }

        [HttpPut("SetaExameVisto")]
        public async Task<IActionResult> SetaExameVisto(SetaExameVistoDto dto)
        {
            try
            {
                var ret = _aplicResultado.SetaExameVisto(dto);
                return Ok(ret.Result);

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Banco de dados falhou: " + ex.Message);
            }
        }

        [HttpPut("{id}/Finalizar")]
        public async Task<IActionResult> Finalizar(int id)
        {
            try
            {
                _aplicResultado.Finalizar(id);
                return Ok();

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Banco de dados falhou: " + ex.Message);
            }
        }
    }
}
