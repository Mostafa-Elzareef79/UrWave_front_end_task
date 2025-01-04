using Products.Helper.Enums;

namespace Products.Helper.Shared
{
    public class Response<T>
    {

        public bool succeeded { get; set; }
        public string message { get; set; }
        public List<string> errors { get; set; } = new List<string>();
        public T data { get; set; }
        public HttpStatuses statusCode { get; set; }
        public Response()
        {
        }


        public Response(T _data, HttpStatuses _statusCode, string _message = null)
        {
            succeeded = true;
            statusCode = _statusCode;
            message = _message;
            data = _data;
        }
        public Response(HttpStatuses _statusCode, string errormessage)
        {
            succeeded = false;
            statusCode = _statusCode;
            errors = new List<string> { errormessage };
        }

    }
}
