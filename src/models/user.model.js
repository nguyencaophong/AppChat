const userSchema = require( '../schemas/user.schema' );
module.exports = class User {
    id
    #username
    #password

    constructor(id,username,password){
        this.id = id;
        this.#username = username,
        this.#password = password
    }

    create = () => new Promise(async(resolve,reject) =>{
        try {
            const newItem = new userSchema({
                username:this.#username,
                password:this.#password,
            });
            // ** save
            await newItem.save();
            resolve(newItem);
        } catch (err) {
            reject(err);
        }
    } )

    read = () => new Promise(async(resolve,reject) =>{
        await userSchema.findOne({username:this.#username})
            .then(user => resolve(user))
            .catch(err => reject(err))
    } )

}