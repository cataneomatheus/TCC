using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TCC.Domain.consultas;
using TCC.Repository.consultas;
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
                var consultas = await Rep.GelAllConsultas();
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
                var consulta = await Rep.GetConsultaAsyncById(ConsultaId);

                var result = mapper.Map<ConsultaView>(consulta);

                return Ok(result);
            }
            catch (System.Exception)
            {

                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de dados falhou");
            }

        }

        [HttpPost]
        public async Task<IActionResult> Post(Consulta model)
        {
            try
            {
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
                var consulta = await Rep.GetConsultaAsyncById(ConsultaId);
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

                mapper.Map(model, consulta);

                Rep.Update(model);

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

        [HttpDelete("{ConsultaId}")]
        public async Task<IActionResult> Delete(int ConsultaId)
        {
            try
            {
                var consulta = await Rep.GetConsultaAsyncById(ConsultaId);
                if(consulta == null) return NotFound();

                Rep.Delete(consulta);

                if(await Rep.SaveChangesAsync()){
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