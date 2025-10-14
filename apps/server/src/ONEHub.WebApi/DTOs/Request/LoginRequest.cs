using System.ComponentModel.DataAnnotations;
using ONEHub.WebApi.DTOs.Interfaces;

namespace ONEHub.WebApi.DTOs.Request;

public class LoginRequest : IRequest
{
    [Required]
    [MinLength(6)]
    public string Username { get; set; }

    [Required]
    [MinLength(6)]
    public string Password { get; set; }
}
