const httpStatus = require("http-status");

const validate = (schema)=> {
    return (req, res, next) => {
        const resultado =  schema.validate(req.body);
        if(resultado.error){
            return res.status(httpStatus.BAD_REQUEST).json({status:"400",message:"Data not valid"});
        }

        next();
    }
}

module.exports = validate;