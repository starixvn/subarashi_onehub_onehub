using System.ComponentModel.DataAnnotations;
using ONEHub.WebApi.DTOs.Interfaces;

namespace ONEHub.WebApi.DTOs.Request;

public class RefreshTokenRequest : IRequest
{
    [Required]
    public string RefreshToken { get; set; }

    [Required]
    public int UserId { get; set; }
}
