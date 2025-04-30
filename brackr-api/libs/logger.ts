export const LOGGER = (service: string, message: string) => {
    console.log(`${new Date()} - [${service}] : ${message}`)
}