namespace TCC.WebAPI.Dtos
{
    public class UserLoginDto
    {
        public string UserName { get; set; }
        public string Password { get; set; }
        public bool Adm { get; set; }
    }
}