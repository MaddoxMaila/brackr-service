import {openDatabase, SQLiteDatabase, ResultSet, enablePromise} from 'react-native-sqlite-storage'

enablePromise(true)

export class LiteDb{
    sqlite!: SQLiteDatabase;
    selectStatement: any = ""
    insertStatement: any = ""
    deleteStatement: any = ""

    
    static db: LiteDb
    
    static  getInstance(): LiteDb{
        if(!this.db){
            this.db = new LiteDb()
            this.db.connect()
        }
        return this.db
    }

    constructor(){}
    
    async connect(){
        this.sqlite = await openDatabase({name: 'app.db', location: 'default'});
    }


    async getdb(){
        return this.sqlite
    }

    async createTable(tableName: String, columns: Array<String>){
        const self = LiteDb.getInstance()
        const query = `CREATE TABLE IF NOT EXISTS ${tableName}(${columns.toString()});`
        return await this.sqlite?.executeSql(query)
    }

    select(tableName: String){
        const self = LiteDb.getInstance()
        this.selectStatement = `SELECT * FROM ${tableName}`
        return this
    }

    where(condition: String){
        const self = LiteDb.getInstance() 
        this.selectStatement = `${this.selectStatement} WHERE ${condition}`
        return this
    }

    limit(limit: number){
        const self = LiteDb.getInstance() 
        this.selectStatement = `${this.selectStatement} LIMIT ${limit}`
        return this
    }

    ascending(){
        const self = LiteDb.getInstance() 
        this.selectStatement = `${this.selectStatement} ASC`
        return this
    }

    descending(){
        const self = LiteDb.getInstance() 
        this.selectStatement = `${this.selectStatement} DESC`
        return this
    }

    insert(tableName: String){
        const self = LiteDb.getInstance() 
        self.insertStatement = `INSERT INTO ${tableName}`
        return self
    }

    async get(): Promise<ResultSet[]>{
        const self = LiteDb.getInstance()
        self.selectStatement = `${self.selectStatement};`

        return self.sqlite.executeSql(self.selectStatement)
    }


    async add(columns: Object): Promise<ResultSet[]>{
        const self = LiteDb.getInstance()
        this.insertStatement = `${this.insertStatement}(${Object.keys(columns).toString()}) VALUES(${Object.values(columns).toString()})`

        return this.sqlite.executeSql(this.insertStatement)
    }

}

export class LiteORM {
    tableName: String = ""
    columns: Array<String> = []
    primaryKey: String = ""
    db!: LiteDb
    query: String = ""

    constructor(){
        this.db = LiteDb.getInstance()
    }

    getTableName(){
        return this.tableName
    }

    getColumns(){
        return this.columns
    }
    
    async create(values: Object){
        return await LiteDb.getInstance()
                                        .insert(this.tableName)
                                        .add(values)
    }

    find(){
        this.query = `SELECT * FROM ${this.tableName}`
        return this
    }

    where(where: String){
        this.query = `${this.query} ${where}`
        return this
    }

    async get(){
        this.db.insertStatement = this.query
        return await this.db.get()
    }

}

export const connectToDb = async () => {
    try{
        await LiteDb.getInstance().connect()
    }catch(e: any){
        console.log("SQLite Connection Error")
    }
}

export const createTables = async (tableModels: Array<any>) => {
    try{
        tableModels.forEach(async (model) => {
            await LiteDb.getInstance().createTable(model?.getTableName(), model?.getColumns())
        })
    }catch(e){
        console.log(`Table creation failed: ${e}`)
    }
}