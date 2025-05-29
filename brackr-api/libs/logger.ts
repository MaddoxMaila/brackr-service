export const LOGGER = (service: string, message: string | Object) => {
    console.log(`${new Date()} - [${service}] : `, message)
}