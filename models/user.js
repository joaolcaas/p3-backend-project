class User{
    constructor(name,email){
        this.name = name;
        this.email=email;
        this.id = id;
    }

    get name(){
        return this.name;
    }

    get email(){
        return this.email;
    }

    get id(){
        return this.id;
    }
}


module.exports = User;