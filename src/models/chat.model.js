const chatSchema = require( './../schemas/chat.schema' );

module.exports = class Chat {
    id
    #message
    #unsent
    _uid
    _mids

    constructor(id,message,unsent,_uid,_mids){
        this.id = id,
        this.#message = message,
        this.#unsent = unsent,
        this._uid = _uid,
        this._mids = _mids
    }
    
    create = () => new Promise(async(resolve,reject) =>{
        try {
            const chatDetail = await chatSchema.findOne({_uid:this._uid})
            if(chatDetail) {
                await chatDetail.update({$push:{_mids:this._mids}})
            }
            else{
                const newChat = await new chatSchema({
                    message:this.#message,
                    unsent:this.#unsent,
                    _uid:this._uid,
                }).save();
                await newChat.update({$push:{_mids:this._mids}})
                resolve(newChat);
            }
            resolve(chatDetail)
        } catch (err) {
            reject(err)
        }
    })

    update = () => new Promise((resolve,reject) => {
        chatSchema.findByIdAndUpdate(
            {_id:this.id},
            {$set:{
                message:this.#message,
                unsent:this.#unsent,
                _uid:this._uid
            }}
            )
        .then(chat => resolve(chat))
        .catch(err => reject(err))
    })

    read = () => new Promise(async(resolve,reject) =>{
        try {
            const chatDetail = await chatSchema.findById(this.id);

            // ** check get data;
            if(!chatDetail){
                reject({code:404,message:'Message not found!!!'});
            }
            else{
                return chatDetail;
            }
        } catch (error) {
            reject(error);
        }
    })

    update = () => new Promise( async(resolve,reject) =>{
        try {
            // ** udpate 
            await chatSchema.findByIdAndUpdate(this.id,{
                $set: {
                  message:this.#message,
                  unsent:this.#unsent,          
                  _mids:this._mids,    
                }
              },
              {
                new: true
              })
        } catch (error) {
            reject(error);
        }
    })

    delete = () => new Promise(async(resolve,reject) =>{
        try {
            await chatSchema.deleteOne({_id:this.id});
        } catch (error) {
            reject(error);
        }
    })
}