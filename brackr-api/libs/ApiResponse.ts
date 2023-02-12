export default function ApiResponse<T>(error: boolean, message: string, response: T) {
    return {
        error, message, response
    }
}