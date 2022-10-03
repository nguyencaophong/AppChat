const messageSchema = require( '../schemas/message.schema' );
module.exports = class Message {
    id
    #body
    #unsent
    _uid
    _cid

    constructor(id,body,unsent,_uid,_cid){
        this.id = id;
        this.#body = body;
        this.#unsent = unsent;
        this._uid = _uid;
        this._cid = _cid;
    }

    create = () =>new Promise((resolve,reject) =>{
        const message = new messageSchema({
            body :this.#body,
            unsent:this.#unsent,
            _uid:this._uid,
            _cid:this._cid
        });
        message
            .save()
            .then(message => resolve(message))
            .catch(err => reject(err))
    })

    update = () => new Promise((resolve,reject) => {
        messageSchema.findByIdAndUpdate(
            {_id:this.id},
            {$set:{
                body:this.#body,
                unsent:this.#unsent,
                _uid:this._uid,
                _cid:this._cid
            }}
            )
        .then(chat => resolve(chat))
        .catch(err => reject(err))
    })

}