namespace API.Error
{
    public class ApiValidationErrorResponse : ApiResponse
    {
        public ApiValidationErrorResponse() : base(400)
        {

        }
        public IEnumerable<String> Errors {get; set;}
    }
}