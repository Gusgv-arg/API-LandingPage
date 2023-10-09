import Lead from "../models/leadsModel.js";


export const leadsController = async function(req, res){

    try {
        const newLead = new Lead({
            name: req.body.name,
            phone: req.body.phone,
            email: req.body.email,
            message: req.body.message,
        });
        const lead = await newLead.save();
        res.status(200).send({message: "!Gracias, te responderemos a la brevedad!"})
    } catch (error) {
        res.status(400).send({message: `"Ocurrió un error:" ${error.message}`})
    }
}