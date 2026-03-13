export const validate=(schema)=>async(req,res,next)=>{
    try{
        const parseBody=await schema.parseAsync(req.body);
        req.body=parseBody;
        next();
    }
    catch(err){
        const status = 422;
        const message = "Fill the input properly";
        const extraDetails = (err && err.errors && Array.isArray(err.errors) && err.errors[0] && err.errors[0].message)
            ? err.errors[0].message
            : (err && err.message) ? err.message : JSON.stringify(err);

        const error = { status, message, extraDetails };
        console.error(error);
        next(error);
    }
};