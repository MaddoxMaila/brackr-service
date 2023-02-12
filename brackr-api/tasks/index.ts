const celery = require('celery-node');

export default class CelerySingleton{

    static client = null

    constructor(){

        CelerySingleton.client = celery.createClient(
            "amqp://",
            "amqp://"
          );

    }

    static getCelery(){
        try {
            if(!CelerySingleton.client)
                new CelerySingleton()
            return CelerySingleton.client
        } catch (e: any) {
            console.log(e)
        }
    }
}