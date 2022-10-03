const feedbackSchema = require( '../schemas/feedback.schema' );
module.exports = class FeedBack {
    id
    #body
    #unsent
    _uid

    constructor(id,body,unsent,_uid){
        this.id = id;
        this.#body = body,
        this.#unsent = unsent,
        this._uid = _uid
    }
    
    create = () => new Promise(async(resolve,reject) =>{
        try {
            const newItem = new feedbackSchema({
                body:this.#body,
                unsent:this.#unsent,
                _uid:this._uid
            });

            // ** save
            await newItem.save();
        } catch (error) {
            reject(error);
        }
    })

}