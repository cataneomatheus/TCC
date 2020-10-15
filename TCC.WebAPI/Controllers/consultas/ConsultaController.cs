using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TCC.Domain.consultas;
using TCC.Repository.consultas;
using TCC.Repository.user;
using TCC.WebAPI.Views.Consulta;

namespace TCC.WebAPI.Controllers.consultas
{
    [Route("api/[controller]")]
    [ApiController]
    public class ConsultaController : ControllerBase
    {
        private readonly IRepConsulta Rep;
        public IMapper mapper { get; }
        
        public ConsultaController(IRepConsulta _rep,
                                  IMapper _mapper)
        {
            Rep = _rep;
            mapper = _mapper;
        }

         [HttpPost("upload")]
        public async Task<IActionResult> Upload()
        {
            try
            {
                var file = Request.Form.Files[0];
                var folderName = Path.Combine("Resources", "Images");
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);

                if (file.Length > 0)
                {
                    var filename = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName;                    
                    var fullPath = Path.Combine(pathToSave, filename.Replace("\"","").Trim());

                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }
                    return Ok();
                }
                return NoContent();
            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de Dados Falhou");
            }
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
                var consultas = await Rep.GelAllConsultas(userId);
                var result = mapper.Map<IEnumerable<ConsultaView>>(consultas);

                return Ok(result);
            }
            catch (System.Exception)
            {

                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de dados falhou");
            }

        }

        [HttpGet("{ConsultaId}")]
        public async Task<IActionResult> Get(int ConsultaId)
        {
            try
            {
                var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
                var consulta = await Rep.GetConsultaAsyncById(ConsultaId, userId);

                var result = mapper.Map<ConsultaView>(consulta);

                return Ok(result);
            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de dados falhou");
            }

        }

        [HttpGet("GetConsultaAluno/{ConsultaId}")]
        public async Task<IActionResult> GetConsultaAluno(string ConsultaId)
        {
            try
            {
                var consulta = await Rep.GetConsultaAlunoAsyncById(ConsultaId);

                if (consulta == null)
                    throw new Exception("Consulta não encontrada.");

                var result = mapper.Map<ConsultaView>(consulta);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex);
            }

        }

        [HttpPost]
        public async Task<IActionResult> Post(Consulta model)
        {
            try
            {
                var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
                model.UserId = userId;
                Rep.Add(model);

                if(await Rep.SaveChangesAsync()){
                    return Created($"/api/consulta/{model.Id}", model);
                }

            }
            catch (System.Exception)
            {

                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de dados falhou");
            }

            return BadRequest();

        }

        [HttpPut("{ConsultaId}")]
        public async Task<IActionResult> Put(int ConsultaId, Consulta model)
        {
            try
            {
                var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
                var consulta = await Rep.GetConsultaAsyncById(ConsultaId, userId);
                if(consulta == null) return NotFound();

                var idPerguntaRespostas = new List<int>();
                var idExames = new List<int>();

                if(model.Exames == null)
                {
                    model.Exames = consulta.Exames;
                }

                if (model.PerguntaRespostas == null)
                {
                    model.PerguntaRespostas = consulta.PerguntaRespostas;
                }

                model.PerguntaRespostas.ForEach(item => idPerguntaRespostas.Add(item.Id));
                model.Exames.ForEach(item => idExames.Add(item.Id));

                var perguntasRespostas = consulta.PerguntaRespostas.Where(
                    perguntaResposta => !idPerguntaRespostas.Contains(perguntaResposta.Id))
                    .ToArray();

                var exames = consulta.Exames.Where(
                    exame => !idExames.Contains(exame.Id))
                    .ToArray();

                if(perguntasRespostas.Any())  Rep.DeleteRange(perguntasRespostas);

                if(exames.Any())  Rep.DeleteRange(exames);

                if (consulta.UserId != userId)
                    throw new Exception("O usuário que editou a consulta não é o mesmo que o criou, entre em contato com o suporte");

                model.UserId = userId;

                mapper.Map(model, consulta);

                Rep.Update(model);

                if(await Rep.SaveChangesAsync()){
                    return Created($"/api/consulta/{model.Id}", model);
                }

            }
            catch (System.Exception ex)
            {

                return this.StatusCode(StatusCodes.Status500InternalServerError, ex);
            }

            return BadRequest();

        }

        [HttpPut("LiberarSimulacao/{ConsultaId}")]
        public async Task<IActionResult> LiberarSimulacao(int ConsultaId)
        {
            try
            {
                var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
                var consulta = await Rep.GetConsultaAsyncById(ConsultaId, userId);
                if (consulta == null) return NotFound();

                string hashCode = String.Format("{0:X}", GetHashCode());

                consulta.HashLib = hashCode;

                Rep.Update(consulta);

                if (await Rep.SaveChangesAsync())
                {
                    return Ok(consulta);
                }

            }
            catch (Exception ex)
            {

                return this.StatusCode(StatusCodes.Status500InternalServerError, ex);
            }

            return BadRequest();

        }

        [HttpPut("BloquearSimulacao/{ConsultaId}")]
        public async Task<IActionResult> BloquearSimulacao(int ConsultaId)
        {
            try
            {
                var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
                var consulta = await Rep.GetConsultaAsyncById(ConsultaId, userId);
                if (consulta == null) return NotFound();

                consulta.HashLib = "";

                Rep.Update(consulta);

                if (await Rep.SaveChangesAsync())
                {
                    return Ok(consulta);
                }

            }
            catch (Exception ex)
            {

                return this.StatusCode(StatusCodes.Status500InternalServerError, ex);
            }

            return BadRequest();

        }

        [HttpDelete("{ConsultaId}")]
        public async Task<IActionResult> Delete(int ConsultaId)
        {
            try
            {
                var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
                var consulta = await Rep.GetConsultaAsyncById(ConsultaId, userId);
                if(consulta == null) return NotFound();

                Rep.Delete(consulta);

                if(await Rep.SaveChangesAsync()){
                    return Ok();
                }

            }
            catch (System.Exception ex)
            {

                return this.StatusCode(StatusCodes.Status500InternalServerError, ex);
            }

            return BadRequest();

        }
    }
}