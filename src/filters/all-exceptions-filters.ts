import { ArgumentsHost, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";

export class AllExceptionsFilter implements ExceptionFilter{

    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();

        const status = 
            exception instanceof HttpException
            ? exception.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR;

            const message =
            exception instanceof HttpException
            ? exception.getResponse()
            : ' Erro interno do servidor';

            response.status(status).json({
                statusCode: status,
                timestamp: new Date().toISOString(),
                mensagem: typeof message === 'string' ? message : message['message'],
                path: request.url,
                method: request.method,
                error: exception.message,
                errorCode: exception.code,
                errorName: exception.name,
                errorStatus: exception.status,
                errorResponse: exception.response,
                errorStatusCode: exception.statusCode,
                errorStatusText: exception.statusText,
                errorStatusMessage: exception.statusMessage,
                errorStatusDescription: exception.statusDescription,
                errorStatusError: exception.statusError,
                errorStatusErrorCode: exception.statusErrorCode,
                errorStatusErrorName: exception.statusErrorName,
            });
    }
}